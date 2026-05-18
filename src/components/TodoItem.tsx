import { useState } from 'react';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import clsx from 'clsx';
import { Todo } from '@/types';
import styles from './TodoItem.module.css';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  function handleEditSave(): void {
    if (editText.trim()) {
      onEdit(todo.id, editText);
    } else {
      setEditText(todo.text);
    }
    setEditing(false);
  }

  function handleEditKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') handleEditSave();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setEditing(false);
    }
  }

  const priorityDot = clsx(styles.priorityDot, styles[todo.priority]);

  return (
    <li className={clsx(styles.item, { [styles.completed]: todo.completed })}>
      <button
        className={clsx(styles.checkbox, { [styles.checked]: todo.completed })}
        onClick={() => onToggle(todo.id)}
        aria-label="Toggle complete"
      >
        {todo.completed && <Check size={13} strokeWidth={3} color="#fff" />}
      </button>

      <span className={priorityDot} title={`${todo.priority} priority`} />

      {editing ? (
        <input
          className={styles.editInput}
          value={editText}
          autoFocus
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
          onBlur={handleEditSave}
          onKeyDown={handleEditKeyDown}
        />
      ) : (
        <span className={styles.text}>{todo.text}</span>
      )}

      <div className={styles.actions}>
        {editing ? (
          <>
            <button className={clsx(styles.actionBtn, styles.saveBtn)} onClick={handleEditSave} aria-label="Save">
              <Check size={15} strokeWidth={2.5} />
            </button>
            <button
              className={clsx(styles.actionBtn, styles.cancelBtn)}
              onClick={() => { setEditText(todo.text); setEditing(false); }}
              aria-label="Cancel"
            >
              <X size={15} strokeWidth={2.5} />
            </button>
          </>
        ) : (
          <>
            <button
              className={clsx(styles.actionBtn, styles.editBtn)}
              onClick={() => setEditing(true)}
              aria-label="Edit"
            >
              <Pencil size={14} strokeWidth={2} />
            </button>
            <button
              className={clsx(styles.actionBtn, styles.deleteBtn)}
              onClick={() => onDelete(todo.id)}
              aria-label="Delete"
            >
              <Trash2 size={14} strokeWidth={2} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
