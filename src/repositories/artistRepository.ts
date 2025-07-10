import { db, storage } from '../firebase/firebaseConfig';
import {
  addDoc, collection, deleteDoc, doc, getDocs, updateDoc, query, where,
} from 'firebase/firestore';
import { Artist } from '../models/Artist';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const artistCollection = collection(db, 'artists');

export const getArtists = async (): Promise<Artist[]> => {
  const snapshot = await getDocs(artistCollection);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  } as Artist));
};

export const getArtistsByGenre = async (genreId: string): Promise<Artist[]> => {
  const q = query(artistCollection, where('genreId', '==', genreId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  } as Artist));
};

export const createArtist = async (name: string, genreId: string, imageFile: File) => {
  const imageRef = ref(storage, `artists/${imageFile.name}`);
  await uploadBytes(imageRef, imageFile);
  const imageUrl = await getDownloadURL(imageRef);

  await addDoc(artistCollection, { name, genreId, imageUrl });
};

export const updateArtist = async (id: string, name: string, genreId: string, newImageFile?: File) => {
  const docRef = doc(db, 'artists', id);
  let updatedData: any = { name, genreId };

  if (newImageFile) {
    const imageRef = ref(storage, `artists/${newImageFile.name}`);
    await uploadBytes(imageRef, newImageFile);
    const imageUrl = await getDownloadURL(imageRef);
    updatedData.imageUrl = imageUrl;
  }

  await updateDoc(docRef, updatedData);
};

export const deleteArtist = async (id: string, imageUrl: string) => {
  await deleteDoc(doc(db, 'artists', id));
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (e) {
    console.warn("No se pudo eliminar imagen de artista:", e);
  }
};
