import { getAnalytics, isSupported } from 'firebase/analytics';
import { app } from './firebaseConfig';

export const initAnalytics = async () => {
  if (typeof window !== 'undefined') {
    const supported = await isSupported();
    if (supported) {
      const analytics = getAnalytics(app);
      console.log('Firebase Analytics enabled');
      return analytics;
    } 
  }
  return null;
};
