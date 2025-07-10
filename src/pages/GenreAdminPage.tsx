import { useEffect, useState } from 'react';
import { createGenre, deleteGenre, getGenres, updateGenre } from '../repositories/genreRepository';
import { Genre } from '../models/Genre';

export default function GenreAdminPage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editing, setEditing] = useState<Genre | null>(null);

  const loadGenres = async () => {
    const data = await getGenres();
    setGenres(data);
  };

  useEffect(() => {
    loadGenres();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !imageFile && !editing) return;

    if (editing) {
      await updateGenre(editing.id, name, imageFile ?? undefined);
      setEditing(null);
    } else {
      await createGenre(name, imageFile!);
    }

    setName('');
    setImageFile(null);
    await loadGenres();
  };

  const handleEdit = (genre: Genre) => {
    setEditing(genre);
    setName(genre.name);
    setImageFile(null);
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    await deleteGenre(id, imageUrl);
    await loadGenres();
  };

  return (
    <div>
      <h2>Géneros musicales</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre del género" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
        <button type="submit">{editing ? 'Actualizar' : 'Crear'}</button>
        {editing && <button type="button" onClick={() => { setEditing(null); setName(''); setImageFile(null); }}>Cancelar</button>}
      </form>

      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>
            <img src={genre.imageUrl} alt={genre.name} width={60} />
            <span>{genre.name}</span>
            <button onClick={() => handleEdit(genre)}>Editar</button>
            <button onClick={() => handleDelete(genre.id, genre.imageUrl)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
