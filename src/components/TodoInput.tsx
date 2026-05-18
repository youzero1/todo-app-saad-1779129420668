import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Priority } from '@/types';
import styles from './TodoInput.module.css';
import clsx from 'clsx';

type TodoInputProps = {
  onAdd: (text: string, priority: Priority) => void;
};

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text, priority);
      setText('');
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputRow}>
        <input
          className={styles.input}
          type="text"
          placeholder="Add a new task..."
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          autoFocus
        />
        <button
          type="submit"
          className={styles.addBtn}
          disabled={!text.trim()}
          aria-label="Add todo"
        >
          <Plus size={20} strokeWidth={2.5} />
        </button>
      </div>
      <div className={styles.priorityRow}>
        <span className={styles.priorityLabel}>Priority:</span>
        {(['low', 'medium', 'high'] as Priority[]).map((p) => (
          <button
            key={p}
            type="button"
            className={clsx(styles.priorityBtn, styles[p], { [styles.selected]: priority === p })}
            onClick={() => setPriority(p)}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>
    </form>
  );
}
