import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

export default function Navbar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#eee' }}>
      <div>
        <Link to="/home">Inicio</Link>
        {' | '}
        {currentUser?.role === 'admin' && (
          <>
            <Link to="/admin/dashboard">Admin</Link>{' | '}
            <Link to="/admin/genres">Géneros</Link>{' | '}
            <Link to="/admin/artists">Artistas</Link>{' | '}
            <Link to="/admin/songs">Canciones</Link>
          </>
        )}
      </div>
      <div>
        <span>{currentUser?.displayName || currentUser?.email}</span>
        {' | '}
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </nav>
  );
}
