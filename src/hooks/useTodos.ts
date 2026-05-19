import { useState, useEffect, useCallback } from 'react';
import { Todo, FilterType } from '@/types';
import { supabase } from '@/lib/supabase';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all todos from Supabase
  const fetchTodos = useCallback(async () => {
    if (!supabase) {
      setError('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
    } else if (data) {
      setTodos(
        data.map((row) => ({
          id: row.id,
          text: row.text,
          completed: row.completed,
          createdAt: new Date(row.created_at).getTime(),
        }))
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  async function addTodo(text: string): Promise<void> {
    if (!text.trim() || !supabase) return;
    const { data, error: insertError } = await supabase
      .from('todos')
      .insert({ text: text.trim(), completed: false })
      .select()
      .single();

    if (insertError) {
      setError(insertError.message);
    } else if (data) {
      setTodos((prev) => [
        {
          id: data.id,
          text: data.text,
          completed: data.completed,
          createdAt: new Date(data.created_at).getTime(),
        },
        ...prev,
      ]);
    }
  }

  async function toggleTodo(id: string): Promise<void> {
    if (!supabase) return;
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    const { error: updateError } = await supabase
      .from('todos')
      .update({ completed: !todo.completed })
      .eq('id', id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    }
  }

  async function deleteTodo(id: string): Promise<void> {
    if (!supabase) return;
    const { error: deleteError } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);

    if (deleteError) {
      setError(deleteError.message);
    } else {
      setTodos((prev) => prev.filter((t) => t.id !== id));
    }
  }

  async function editTodo(id: string, text: string): Promise<void> {
    if (!text.trim() || !supabase) return;
    const { error: updateError } = await supabase
      .from('todos')
      .update({ text: text.trim() })
      .eq('id', id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, text: text.trim() } : t))
      );
    }
  }

  async function clearCompleted(): Promise<void> {
    if (!supabase) return;
    const completedIds = todos.filter((t) => t.completed).map((t) => t.id);
    if (completedIds.length === 0) return;
    const { error: deleteError } = await supabase
      .from('todos')
      .delete()
      .in('id', completedIds);

    if (deleteError) {
      setError(deleteError.message);
    } else {
      setTodos((prev) => prev.filter((t) => !t.completed));
    }
  }

  const filteredTodos = todos.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return {
    todos: filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
    loading,
    error,
  };
}
