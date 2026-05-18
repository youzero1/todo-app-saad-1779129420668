import clsx from 'clsx';
import { FilterType } from '@/types';
import styles from './TodoFilters.module.css';

type TodoFiltersProps = {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  activeCount: number;
  completedCount: number;
  totalCount: number;
};

export default function TodoFilters({
  filter,
  setFilter,
  activeCount,
  completedCount,
}: TodoFiltersProps) {
  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: activeCount + completedCount },
    { key: 'active', label: 'Active', count: activeCount },
    { key: 'completed', label: 'Done', count: completedCount },
  ];

  return (
    <div className={styles.filters}>
      {filters.map((f) => (
        <button
          key={f.key}
          className={clsx(styles.filterBtn, { [styles.active]: filter === f.key })}
          onClick={() => setFilter(f.key)}
        >
          {f.label}
          <span className={clsx(styles.badge, { [styles.activeBadge]: filter === f.key })}>
            {f.count}
          </span>
        </button>
      ))}
    </div>
  );
}
