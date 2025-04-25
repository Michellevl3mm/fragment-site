import { useState, useEffect } from 'react';

export default function Home() {
  const [fragment, setFragment] = useState('');
  const [usedFragments, setUsedFragments] = useState(() => {
    if (typeof window !== 'undefined') {
      return new Set(JSON.parse(localStorage.getItem('used') || '[]'));
    }
    return new Set();
  });
  const [inputText, setInputText] = useState('');
  const [fullText, setFullText] = useState(
    'I once tried to ornament myself, rewriting the future in strange ways, but it was all in vain. These words, like scattered fragments, lack structure and resolution.'
  );

  const getWords = (text) => {
    return text.match(/\b\w+('\w+)?\b/g) || [];
  };

  const getRandomFragment = () => {
    const minWords = 3;
    const maxWords = 15;
    const words = getWords(fullText);
    const options = [];

    for (let i = 0; i < words.length; i++) {
      for (let len = minWords; len <= maxWords && i + len <= words.length; len++) {
        const slice = words.slice(i, i + len).join(' ');
        if (!usedFragments.has(slice)) options.push(slice);
      }
    }

    if (options.length === 0) {
      setFragment('No more content available.');
      return;
    }

    const result = options[Math.floor(Math.random() * options.length)];
    setFragment(result);

    const newUsed = new Set(usedFragments);
    newUsed.add(result);
    setUsedFragments(newUsed);
    localStorage.setItem('used', JSON.stringify(Array.from(newUsed)));
  };

  const handleSubmit = () => {
    if (inputText.trim().length > 0) {
      setFullText(prev => prev + ' ' + inputText.trim());
      setInputText('');
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
          cursor: 'pointer',
        }}>
        draw
      </button>

      <div
        style={{
          padding: '20px',
          fontSize: '18px',
          border: '1px solid #ccc',
          borderRadius: '10px',
          maxWidth: '600px',
          margin: '0 auto',
        }}>
        {fragment || 'Click the button above to begin'}
      </div>

      <div style={{ marginTop: '30px' }}>
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Enter new text here"
          style={{ padding: '10px', width: '60%' }}
        />
        <button
          onClick={handleSubmit}
          style={{ padding: '10px 20px', marginLeft

