import { useState } from 'react';
import { useItems } from '@/hooks/useItems';
import type { ItemStatus } from '@/types';
import styles from './ItemsPage.module.css';
import { Trash2, Pencil, Check, X, Plus } from 'lucide-react';

const STATUS_OPTIONS: ItemStatus[] = ['active', 'inactive', 'pending'];

export default function ItemsPage() {
  const { items, loading, error, addItem, updateItem, deleteItem } = useItems();

  const [newName, setNewName] = useState('');
  const [newStatus, setNewStatus] = useState<ItemStatus>('active');
  const [adding, setAdding] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editStatus, setEditStatus] = useState<ItemStatus>('active');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newName.trim();
    if (!trimmed) return;
    setAdding(true);
    await addItem(trimmed, newStatus);
    setNewName('');
    setNewStatus('active');
    setAdding(false);
  };

  const startEdit = (id: string, name: string, status: ItemStatus) => {
    setEditingId(id);
    setEditName(name);
    setEditStatus(status);
  };

  const handleUpdate = async (id: string) => {
    const trimmed = editName.trim();
    if (!trimmed) return;
    await updateItem(id, { name: trimmed, status: editStatus });
    setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Items</h1>
          <p className={styles.subtitle}>Manage your items list</p>
        </header>

        {error && (
          <div className={styles.error}>
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className={styles.card}>
          {/* Add Form */}
          <form className={styles.addForm} onSubmit={handleAdd}>
            <input
              className={styles.input}
              type="text"
              placeholder="Item name…"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              disabled={adding}
            />
            <select
              className={styles.select}
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as ItemStatus)}
              disabled={adding}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
            <button
              className={styles.addBtn}
              type="submit"
              disabled={adding || !newName.trim()}
            >
              <Plus size={18} />
              Add Item
            </button>
          </form>

          {/* List */}
          {loading ? (
            <div className={styles.loading}>Loading items…</div>
          ) : items.length === 0 ? (
            <div className={styles.empty}>No items yet. Add one above!</div>
          ) : (
            <ul className={styles.list}>
              {items.map((item) => (
                <li key={item.id} className={styles.item}>
                  {editingId === item.id ? (
                    <div className={styles.editRow}>
                      <input
                        className={styles.input}
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        autoFocus
                      />
                      <select
                        className={styles.select}
                        value={editStatus}
                        onChange={(e) =>
                          setEditStatus(e.target.value as ItemStatus)
                        }
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </option>
                        ))}
                      </select>
                      <button
                        className={styles.iconBtn}
                        onClick={() => handleUpdate(item.id)}
                        title="Save"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        className={`${styles.iconBtn} ${styles.cancelBtn}`}
                        onClick={cancelEdit}
                        title="Cancel"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className={styles.viewRow}>
                      <span className={styles.itemName}>{item.name}</span>
                      <span
                        className={`${styles.badge} ${styles[item.status]}`}
                      >
                        {item.status}
                      </span>
                      <div className={styles.actions}>
                        <button
                          className={styles.iconBtn}
                          onClick={() =>
                            startEdit(item.id, item.name, item.status)
                          }
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          className={`${styles.iconBtn} ${styles.deleteBtn}`}
                          onClick={() => deleteItem(item.id)}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
