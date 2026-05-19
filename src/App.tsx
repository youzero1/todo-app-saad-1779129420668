import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoPage from '@/pages/TodoPage';
import ItemsPage from '@/pages/ItemsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/items" element={<ItemsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
