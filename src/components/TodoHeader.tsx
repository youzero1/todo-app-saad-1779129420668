import { CheckSquare } from 'lucide-react';
import styles from './TodoHeader.module.css';

export default function TodoHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.iconWrap}>
        <CheckSquare size={32} color="#ffffff" strokeWidth={2.5} />
      </div>
      <h1 className={styles.title}>My Todos</h1>
      <p className={styles.subtitle}>Stay organised, get things done.</p>
    </div>
  );
}
