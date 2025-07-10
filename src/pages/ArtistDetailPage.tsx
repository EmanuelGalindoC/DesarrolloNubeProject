import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSongsByArtist } from '../repositories/songRepository';
import { Song } from '../models/Song';
import { getArtists } from '../repositories/artistRepository';

export default function ArtistDetailPage() {
  const { id: artistId } = useParams();
  const [songs, setSongs] = useState<Song[]>([]);
  const [artistName, setArtistName] = useState('');

  useEffect(() => {
    if (!artistId) return;
    getSongsByArtist(artistId).then(setSongs);
    getArtists().then((list) => {
      const found = list.find((a) => a.id === artistId);
      if (found) setArtistName(found.name);
    });
  }, [artistId]);

  return (
    <div>
      <h2>Canciones de {artistName}</h2>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            <strong>{song.title}</strong>
            <br />
            <audio controls src={song.audioUrl} />
          </li>
        ))}
      </ul>
    </div>
  );
}
