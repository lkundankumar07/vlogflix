import { useState } from 'react';

function App() {
  const [search, setSearch] = useState('');

  const videos = [
    {
      id: 1,
      title: 'Mountain Vlog - Manali Trip',
      category: 'Travel',
      views: '1.2M',
    },
    {
      id: 2,
      title: 'My Daily Routine 2026',
      category: 'Daily Vlog',
      views: '850K',
    },
    { id: 3, title: 'Bihar Food Challenge', category: 'Food', views: '2.1M' },
    { id: 4, title: 'Coding Setup Tour', category: 'Tech', views: '500K' },
    {
      id: 5,
      title: 'College Life Vlog',
      category: 'Daily Vlog',
      views: '900K',
    },
    { id: 6, title: 'Goa Beach Party', category: 'Travel', views: '3.4M' },
  ];

  const filtered = videos.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        background: 'black',
        color: 'white',
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'Arial',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1
          style={{
            color: 'red',
            fontSize: '40px',
            fontWeight: '900',
            margin: 0,
          }}
        >
          VLOGFLIX
        </h1>
        <input
          placeholder="Search vlogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '10px 20px',
            borderRadius: '20px',
            border: 'none',
            width: '250px',
          }}
        />
      </div>

      <div style={{ marginTop: '30px' }}>
        <h2>Trending Vlogs 🔥</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '20px',
            marginTop: '20px',
          }}
        >
          {filtered.map((video) => (
            <div
              key={video.id}
              style={{
                background: '#1a1a1a',
                borderRadius: '10px',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  height: '140px',
                  background: `linear-gradient(45deg, #${Math.floor(Math.random() * 900) + 100}, #${Math.floor(Math.random() * 900) + 100})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '50px',
                }}
              >
                ▶️
              </div>
              <div style={{ padding: '12px' }}>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>
                  {video.title}
                </h3>
                <p style={{ margin: 0, color: 'gray', fontSize: '13px' }}>
                  {video.category} • {video.views} views
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center', color: 'gray' }}>
        <p>Live on vlogflix.vercel.app - Made by Kundan 🚀</p>
      </div>
    </div>
  );
}

export default App;
