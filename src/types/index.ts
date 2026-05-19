export type Priority = 'low' | 'medium' | 'high';

export type FilterType = 'all' | 'active' | 'completed';

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  createdAt: number;
};

export type ItemStatus = 'active' | 'inactive' | 'pending';

export type Item = {
  id: string;
  name: string;
  status: ItemStatus;
  created_at: string;
};
