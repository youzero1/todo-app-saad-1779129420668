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
  } = useTodos();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <TodoHeader />
        <div className={styles.card}>
          <TodoInput onAdd={addTodo} />
          <TodoFilters
            filter={filter}
            setFilter={setFilter}
            activeCount={activeCount}
            completedCount={completedCount}
            totalCount={todos.length + (filter === 'all' ? 0 : 0)}
          />
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
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
