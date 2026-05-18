import styles from './TodoFooter.module.css';

type TodoFooterProps = {
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
};

export default function TodoFooter({ activeCount, completedCount, onClearCompleted }: TodoFooterProps) {
  return (
    <div className={styles.footer}>
      <span className={styles.summary}>
        <strong>{activeCount}</strong> task{activeCount !== 1 ? 's' : ''} remaining
      </span>
      {completedCount > 0 && (
        <button className={styles.clearBtn} onClick={onClearCompleted}>
          Clear completed ({completedCount})
        </button>
      )}
    </div>
  );
}
