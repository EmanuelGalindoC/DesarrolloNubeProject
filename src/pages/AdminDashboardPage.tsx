import { useNavigate } from 'react-router-dom';

export default function AdminDashboardPage() {
  const navigate = useNavigate();

  const panels = [
    { label: 'Gestionar Géneros', path: '/admin/genres' },
    { label: 'Gestionar Artistas', path: '/admin/artists' },
    { label: 'Gestionar Canciones', path: '/admin/songs' },
  ];

  return (
    <div>
      <h2>Panel de Administración</h2>
      <div style={{
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap',
        marginTop: '1.5rem'
      }}>
        {panels.map(panel => (
          <div
            key={panel.path}
            onClick={() => navigate(panel.path)}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem 2rem',
              cursor: 'pointer',
              background: '#f9f9f9',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              minWidth: '200px',
              textAlign: 'center'
            }}
          >
            <strong>{panel.label}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
