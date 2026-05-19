import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Item, ItemStatus } from '@/types';

export function useItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    if (!supabase) {
      setError('Supabase is not configured.');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('items')
      .select('*')
      .order('created_at', { ascending: false });
    if (err) {
      setError(err.message);
    } else {
      setItems((data as Item[]) ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const addItem = useCallback(async (name: string, status: ItemStatus) => {
    if (!supabase) return;
    const { data, error: err } = await supabase
      .from('items')
      .insert([{ name, status }])
      .select()
      .single();
    if (err) {
      setError(err.message);
    } else if (data) {
      setItems((prev) => [data as Item, ...prev]);
    }
  }, []);

  const updateItem = useCallback(
    async (id: string, updates: Partial<Pick<Item, 'name' | 'status'>>) => {
      if (!supabase) return;
      const { data, error: err } = await supabase
        .from('items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (err) {
        setError(err.message);
      } else if (data) {
        setItems((prev) =>
          prev.map((item) => (item.id === id ? (data as Item) : item))
        );
      }
    },
    []
  );

  const deleteItem = useCallback(async (id: string) => {
    if (!supabase) return;
    const { error: err } = await supabase.from('items').delete().eq('id', id);
    if (err) {
      setError(err.message);
    } else {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  }, []);

  return { items, loading, error, addItem, updateItem, deleteItem };
}
