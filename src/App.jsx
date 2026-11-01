import { useEffect, useState } from 'react';

const thumbnailGradients = [
  'linear-gradient(45deg, #345, #789)',
  'linear-gradient(45deg, #653, #a87)',
  'linear-gradient(45deg, #356, #78a)',
];

function App() {
  const [search, setSearch] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/videos', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load videos. Please try again later.');
        }
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error('Invalid video data received from the server.');
        }
        setVideos(data);
        setLoading(false);
      })
      .catch((fetchError) => {
        if (fetchError.name === 'AbortError') return;
        setError(fetchError.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/logo.png" alt="Vlogflix logo" width="50" />
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
        </div>
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
          {loading ? (
            <p>Loading videos...</p>
          ) : error ? (
            <p role="alert">{error}</p>
          ) : filtered.length === 0 ? (
            <p>No videos found.</p>
          ) : (
            filtered.map((video) => (
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
                    background:
                      thumbnailGradients[
                        video.id % thumbnailGradients.length
                      ],
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
            ))
          )}
        </div>
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center', color: 'gray' }}>
        <p>Live on vlogflix.vercel.app - Made by Kundan 🚀</p>
      </div>
    </div>
  );
}

export default App;
