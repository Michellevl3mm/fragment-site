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
    `我曾经试图装点自己，用特殊的方法改写未来，但已无力回天，就像这段文字一般没有结构…… I have once tried to decorate myself and rewrite the future in a special way, but it was beyond my power, like a paragraph without structure.`
  );

  const getRandomFragment = () => {
    const minLenCN = 3;
    const maxLenCN = 15;
    const minWordsEN = 3;
    const maxWordsEN = 15;

    const cnRegex = /[一-龥]/;
    const words = fullText.split(/(\s+|(?<!\w)(?=[\u4e00-\u9fa5])|(?<=[\u4e00-\u9fa5])(?!\w))/).filter(Boolean);

    const options = [];
    for (let i = 0; i < words.length; i++) {
      for (let len = 1; len <= maxLenCN && i + len <= words.length; len++) {
        const slice = words.slice(i, i + len);
        const joined = slice.join('').trim();
        const isChinese = cnRegex.test(joined);
        if (
          (isChinese && joined.length >= minLenCN && joined.length <= maxLenCN) ||
          (!isChinese && slice.filter(w => /\w+/.test(w)).length >= minWordsEN && slice.filter(w => /\w+/.test(w)).length <= maxWordsEN)
        ) {
          if (!usedFragments.has(joined)) options.push(joined);
        }
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
        style={{ padding: '10px 20px', fontSize: '16px', marginBottom: '20px', cursor: 'pointer' }}>
        draw
      </button>

      <div style={{ padding: '20px', fontSize: '18px', border: '1px solid #ccc', borderRadius: '10px', maxWidth: '600px', margin: '0 auto' }}>
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
          style={{ padding: '10px 20px', marginLeft: '10px' }}>
          submit
        </button>
      </div>
    </main>
  );
}
