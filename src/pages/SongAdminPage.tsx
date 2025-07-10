import { useEffect, useState } from 'react';
import { Song } from '../models/Song';
import { Artist } from '../models/Artist';
import { Genre } from '../models/Genre';
import { createSong, deleteSong, getSongs, updateSong } from '../repositories/songRepository';
import { getArtists } from '../repositories/artistRepository';
import { getGenres } from '../repositories/genreRepository';

export default function SongAdminPage() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  const [title, setTitle] = useState('');
  const [artistId, setArtistId] = useState('');
  const [genreId, setGenreId] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [editing, setEditing] = useState<Song | null>(null);

  const loadData = async () => {
    const [s, a, g] = await Promise.all([getSongs(), getArtists(), getGenres()]);
    setSongs(s);
    setArtists(a);
    setGenres(g);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !artistId || !genreId || (!audioFile && !editing)) return;

    if (editing) {
      await updateSong(editing.id, title, artistId, genreId, audioFile ?? undefined);
      setEditing(null);
    } else {
      await createSong(title, artistId, genreId, audioFile!);
    }

    setTitle('');
    setArtistId('');
    setGenreId('');
    setAudioFile(null);
    await loadData();
  };

  const handleEdit = (song: Song) => {
    setEditing(song);
    setTitle(song.title);
    setArtistId(song.artistId);
    setGenreId(song.genreId);
    setAudioFile(null);
  };

  const handleDelete = async (id: string, audioUrl: string) => {
    await deleteSong(id, audioUrl);
    await loadData();
  };

  return (
    <div>
      <h2>Canciones</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <select value={artistId} onChange={(e) => setArtistId(e.target.value)} required>
          <option value="">Seleccionar artista</option>
          {artists.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select>
        <select value={genreId} onChange={(e) => setGenreId(e.target.value)} required>
          <option value="">Seleccionar género</option>
          {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
        </select>
        <input type="file" accept="audio/*" onChange={(e) => setAudioFile(e.target.files?.[0] || null)} />
        <button type="submit">{editing ? 'Actualizar' : 'Crear'}</button>
        {editing && <button type="button" onClick={() => { setEditing(null); setTitle(''); setArtistId(''); setGenreId(''); setAudioFile(null); }}>Cancelar</button>}
      </form>

      <ul>
        {songs.map(song => (
          <li key={song.id}>
            <strong>{song.title}</strong> – <em>{artists.find(a => a.id === song.artistId)?.name}</em>
            <br />
            <audio src={song.audioUrl} controls />
            <br />
            <button onClick={() => handleEdit(song)}>Editar</button>
            <button onClick={() => handleDelete(song.id, song.audioUrl)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
