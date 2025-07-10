import { db, storage } from '../firebase/firebaseConfig';
import {
  addDoc, collection, deleteDoc, doc, getDocs, updateDoc,
} from 'firebase/firestore';
import { Genre } from '../models/Genre';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const genresCollection = collection(db, 'genres');

export const getGenres = async (): Promise<Genre[]> => {
  const snapshot = await getDocs(genresCollection);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  } as Genre));
};

export const createGenre = async (name: string, imageFile: File) => {
  const imageRef = ref(storage, `genres/${imageFile.name}`);
  await uploadBytes(imageRef, imageFile);
  const imageUrl = await getDownloadURL(imageRef);

  await addDoc(genresCollection, { name, imageUrl });
};

export const updateGenre = async (id: string, name: string, newImageFile?: File) => {
  const docRef = doc(db, 'genres', id);
  let updatedData: any = { name };

  if (newImageFile) {
    const imageRef = ref(storage, `genres/${newImageFile.name}`);
    await uploadBytes(imageRef, newImageFile);
    const imageUrl = await getDownloadURL(imageRef);
    updatedData.imageUrl = imageUrl;
  }

  await updateDoc(docRef, updatedData);
};

export const deleteGenre = async (id: string, imageUrl: string) => {
  await deleteDoc(doc(db, 'genres', id));

  // eliminar imagen del storage
  const fileRef = ref(storage, imageUrl);
  try {
    await deleteObject(fileRef);
  } catch (e) {
    console.warn("No se pudo eliminar imagen: ", e);
  }
};
