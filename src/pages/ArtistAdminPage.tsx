import { useEffect, useState } from 'react';
import { getGenres } from '../repositories/genreRepository';
import { Genre } from '../models/Genre';
import { Artist } from '../models/Artist';
import {
  createArtist,
  deleteArtist,
  getArtists,
  updateArtist,
} from '../repositories/artistRepository';

export default function ArtistAdminPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  const [name, setName] = useState('');
  const [genreId, setGenreId] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editing, setEditing] = useState<Artist | null>(null);

  const loadData = async () => {
    const [a, g] = await Promise.all([getArtists(), getGenres()]);
    setArtists(a);
    setGenres(g);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !genreId || (!imageFile && !editing)) return;

    if (editing) {
      await updateArtist(editing.id, name, genreId, imageFile ?? undefined);
      setEditing(null);
    } else {
      await createArtist(name, genreId, imageFile!);
    }

    setName('');
    setGenreId('');
    setImageFile(null);
    await loadData();
  };

  const handleEdit = (artist: Artist) => {
    setEditing(artist);
    setName(artist.name);
    setGenreId(artist.genreId);
    setImageFile(null);
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    await deleteArtist(id, imageUrl);
    await loadData();
  };

  return (
    <div>
      <h2>Artistas</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre del artista" value={name} onChange={(e) => setName(e.target.value)} required />
        <select value={genreId} onChange={(e) => setGenreId(e.target.value)} required>
          <option value="">Seleccionar género</option>
          {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
        </select>
        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
        <button type="submit">{editing ? 'Actualizar' : 'Crear'}</button>
        {editing && <button type="button" onClick={() => { setEditing(null); setName(''); setGenreId(''); setImageFile(null); }}>Cancelar</button>}
      </form>

      <ul>
        {artists.map(artist => (
          <li key={artist.id}>
            <img src={artist.imageUrl} alt={artist.name} width={60} />
            <span>{artist.name}</span> — <em>{genres.find(g => g.id === artist.genreId)?.name}</em>
            <button onClick={() => handleEdit(artist)}>Editar</button>
            <button onClick={() => handleDelete(artist.id, artist.imageUrl)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
