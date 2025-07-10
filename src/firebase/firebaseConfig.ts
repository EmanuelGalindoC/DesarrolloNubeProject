import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA-9796hKVGI-XZfvx_7yHnxMkFtdPP30Q",
  authDomain: "spotifyclone-185a1.firebaseapp.com",
  projectId: "spotifyclone-185a1",
  storageBucket: "spotifyclone-185a1.appspot.com",
  messagingSenderId: "128713640098",
  appId: "1:128713640098:web:f66e7f5843ad1531deaffb",
  measurementId: "G-XBVTFFG3SZ"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };

