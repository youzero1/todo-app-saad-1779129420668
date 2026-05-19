import { useTodos } from '@/hooks/useTodos';
import TodoHeader from '@/components/TodoHeader';
import TodoInput from '@/components/TodoInput';
import TodoFilters from '@/components/TodoFilters';
import TodoList from '@/components/TodoList';
import TodoFooter from '@/components/TodoFooter';
import styles from './TodoPage.module.css';

export default function TodoPage() {
  const {
    todos,
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
  } = useTodos();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <TodoHeader />
        {error && (
          <div className={styles.error}>
            <strong>Error:</strong> {error}
          </div>
        )}
        <div className={styles.card}>
          <TodoInput onAdd={addTodo} />
          <TodoFilters
            filter={filter}
            setFilter={setFilter}
            activeCount={activeCount}
            completedCount={completedCount}
            totalCount={todos.length}
          />
          {loading ? (
            <div className={styles.loading}>Loading todos…</div>
          ) : (
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          )}
          <TodoFooter
            activeCount={activeCount}
            completedCount={completedCount}
            onClearCompleted={clearCompleted}
          />
        </div>
      </div>
    </div>
  );
}
