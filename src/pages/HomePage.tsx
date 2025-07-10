import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Genre } from '../models/Genre';
import { getGenres } from '../repositories/genreRepository';

export default function HomePage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const { currentUser } = useAuth();

const navigate = useNavigate();

useEffect(() => {
    getGenres().then(setGenres);
  }, []);

const handleLogout = async () => {
  await signOut(auth);
  navigate('/login');
};
  return (
    <div>
      <h1>Bienvenido, {currentUser?.displayName}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <h2>Géneros Musicales</h2>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {genres.map((genre) => (
            <div
              key={genre.id}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/genre/${genre.id}`)}
            >
              <img src={genre.imageUrl} alt={genre.name} width={100} />
              <p>{genre.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
