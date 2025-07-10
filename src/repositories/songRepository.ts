import { db, storage } from '../firebase/firebaseConfig';
import {
  addDoc, collection, deleteDoc, doc, getDocs, updateDoc, query, where
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { Song } from '../models/Song';

const songCollection = collection(db, 'songs');

export const getSongs = async (): Promise<Song[]> => {
  const snapshot = await getDocs(songCollection);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  } as Song));
};

export const getSongsByArtist = async (artistId: string): Promise<Song[]> => {
  const q = query(songCollection, where('artistId', '==', artistId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  } as Song));
};

export const createSong = async (title: string, artistId: string, genreId: string, audioFile: File) => {
  const audioRef = ref(storage, `songs/${audioFile.name}`);
  await uploadBytes(audioRef, audioFile);
  const audioUrl = await getDownloadURL(audioRef);

  await addDoc(songCollection, { title, artistId, genreId, audioUrl });
};

export const updateSong = async (id: string, title: string, artistId: string, genreId: string, newAudioFile?: File) => {
  const docRef = doc(db, 'songs', id);
  let updatedData: any = { title, artistId, genreId };

  if (newAudioFile) {
    const audioRef = ref(storage, `songs/${newAudioFile.name}`);
    await uploadBytes(audioRef, newAudioFile);
    const audioUrl = await getDownloadURL(audioRef);
    updatedData.audioUrl = audioUrl;
  }

  await updateDoc(docRef, updatedData);
};

export const deleteSong = async (id: string, audioUrl: string) => {
  await deleteDoc(doc(db, 'songs', id));
  try {
    const audioRef = ref(storage, audioUrl);
    await deleteObject(audioRef);
  } catch (e) {
    console.warn("No se pudo eliminar audio:", e);
  }
};
