
import { useState, useEffect } from 'react';

export default function Home() {
  const [fragment, setFragment] = useState('');

  const drawFragment = async () => {
    const res = await fetch('/api/fragments');
    const data = await res.json();
    if (data.fragment) {
      setFragment(data.fragment);
    } else {
      setFragment('No available content.');
    }
  };

  return (
    <main style={{ padding: 40, textAlign: 'center' }}>
      <button
        onClick={drawFragment}
        style={{ padding: '10px 20px', fontSize: '16px', marginBottom: '20px' }}
      >
        Draw Fragment
      </button>
      <div
        style={{
          padding: '20px',
          fontSize: '18px',
          border: '1px solid #ccc',
          borderRadius: '10px',
          maxWidth: '600px',
          margin: '0 auto',
          wordWrap: 'break-word',
          whiteSpace: 'pre-wrap'
        }}
      >
        {fragment || 'Click the button to begin.'}
      </div>
    </main>
  );
}
