import { useAuth } from '../context/AuthContext';

export default function AdminPage() {
  const { currentUser } = useAuth();

  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Logged in as: {currentUser?.email}</p>
    </div>
  );
}
