import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Artist } from '../models/Artist';
import { getArtistsByGenre } from '../repositories/artistRepository';
import { getGenres } from '../repositories/genreRepository';

export default function GenreDetailPage() {
  const { id: genreId } = useParams();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [genreName, setGenreName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!genreId) return;
    getArtistsByGenre(genreId).then(setArtists);
    getGenres().then((list) => {
      const found = list.find((g) => g.id === genreId);
      if (found) setGenreName(found.name);
    });
  }, [genreId]);

  return (
    <div>
      <h2>Artistas de {genreName}</h2>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {artists.map((artist) => (
          <div
            key={artist.id}
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/artist/${artist.id}`)}
          >
            <img src={artist.imageUrl} alt={artist.name} width={100} />
            <p>{artist.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
