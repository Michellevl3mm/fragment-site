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

    const cnRegex = /[\u4e00-\u9fa5]/;
    const tokens = fullText.match(/([\u4e00-\u9fa5]{1,}|[a-zA-Z']+|\s+|[^\u4e00-\u9fa5\w\s]+)/g) || [];

    const options = [];
    for (let i = 0; i < tokens.length; i++) {
      for (let len = 1; len <= Math.max(maxLenCN, maxWordsEN) && i + len <= tokens.length; len++) {
        const slice = tokens.slice(i, i + len);
        const joined = slice.join('').trim();
        const isChinese = slice.every(token => /[\u4e00-\u9fa5]/.test(token));
        const wordCount = slice.filter(token => /[a-zA-Z']{2,}/.test(token)).length;
        if (
          (isChinese && joined.length >= minLenCN && joined.length <= maxLenCN) ||
          (!isChinese && wordCount >= minWordsEN && wordCount <= maxWordsEN)
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

