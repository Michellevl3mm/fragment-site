
import { useState, useEffect } from 'react';

export default function Home() {
  const [fragments, setFragments] = useState([]);
  const [usedFragments, setUsedFragments] = useState([]);
  const [fragment, setFragment] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('used');
    if (stored) setUsedFragments(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('used', JSON.stringify(usedFragments));
  }, [usedFragments]);

  const getRandomFragment = () => {
    if (fragments.length === 0) return setFragment('No available fragments.');
    const available = fragments.filter(f => !usedFragments.includes(f));
    if (available.length === 0) return setFragment('No available fragments.');
    const randomIndex = Math.floor(Math.random() * available.length);
    const result = available[randomIndex];
    setFragment(result);
    setUsedFragments([...usedFragments, result]);
  };

  const addFragment = () => {
    if (inputValue.trim()) {
      setFragments([...fragments, inputValue.trim()]);
      setInputValue('');
    }
  };

  return (
    <main style={{ padding: 40, textAlign: 'center' }}>
      <button
        onClick={getRandomFragment}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          marginBottom: '20px',
          cursor: 'pointer'
        }}
      >
        Draw a Fragment
      </button>
      <div style={{ marginBottom: '20px' }}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a new fragment here"
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '300px',
            marginRight: '10px'
          }}
        />
        <button onClick={addFragment} style={{ padding: '10px 20px', fontSize: '16px' }}>
          Add Fragment
        </button>
      </div>
      <div
        style={{
          padding: '20px',
          fontSize: '18px',
          border: '1px solid #ccc',
          borderRadius: '10px',
          maxWidth: '500px',
          margin: '0 auto'
        }}
      >
        {fragment || 'Click the button to begin'}
      </div>
    </main>
  );
}
