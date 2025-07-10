import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';
import { initAnalytics } from './firebase/analytics';

function App() {
  const { currentUser } = useAuth();

if (typeof window !== 'undefined') {
  initAnalytics();
}

  return (
    <>
      {currentUser && <Navbar />}
      <AppRoutes />
    </>
  );
}

export default App;
