import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import AdminPage from '../pages/AdminPage';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import GenreAdminPage from '../pages/GenreAdminPage';
import ArtistAdminPage from '../pages/ArtistAdminPage';
import SongAdminPage from '../pages/SongAdminPage';
import GenreDetailPage from '../pages/GenreDetailPage';
import ArtistDetailPage from '../pages/ArtistDetailPage';
import AdminDashboardPage from '../pages/AdminDashboardPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/home" element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      } />

      <Route path="/admin" element={
        <AdminRoute>
          <AdminPage />
        </AdminRoute>
      } />

      <Route path="*" element={<Navigate to="/home" />} />
      <Route path="/admin/genres" element={
        <AdminRoute>
            <GenreAdminPage />
        </AdminRoute>
        } />
      <Route path="/admin/artists" element={
        <AdminRoute>
            <ArtistAdminPage />
        </AdminRoute>
        } />
      <Route path="/admin/songs" element={
        <AdminRoute>
            <SongAdminPage />
        </AdminRoute>
        } />
      <Route path="/genre/:id" element={
        <ProtectedRoute>
          <GenreDetailPage />
        </ProtectedRoute>
      } />
      <Route path="/artist/:id" element={
        <ProtectedRoute>
          <ArtistDetailPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/dashboard" element={
      <AdminRoute>
        <AdminDashboardPage />
      </AdminRoute>
    } />
    </Routes>
    
  );
}
