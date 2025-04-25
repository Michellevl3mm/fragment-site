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
    `我曾经试图装点自己，用特殊的方法改写未来，但已无力回天。就像这段文字一般没有结构，我没有省略任何文字却如何无序展开，他像是屈居尘埃的本能……；
    I once tried to rewrite my future in strange ways. But all collapsed. Words drift like pieces of broken glass.`
  );

  const isEnglish = (text) => /^[\x00-\x7F]+$/.test(text.trim());

  const getEnglishFragments = (text) => {
    const tokens = text.split(/\s+/).filter(Boolean);
    const minWords = 5;
    const maxWords = 10;
    const options = [];
    for (let i = 0; i < tokens.length; i++) {
      for (let len = minWords; len <= maxWords && i + len <= tokens.length; len++) {
        const slice = tokens.slice(i, i + len);
        const joined = slice.join(' ');
        if (!usedFragments.has(joined)) options.push(joined);
      }
    }
    return options;
  };

  const getChineseFragments = (text) => {
    const options = [];
    for (let i = 0; i < text.length; i++) {
      for (let len = 3; len <= 15 && i + len <= text.length; len++) {
        const frag = text.slice(i, i + len);
        if (!/[^\u4e00-\u9fa5；，。？！]/.test(frag) && !usedFragments.has(frag)) {
          options.push(frag);
        }
      }
    }
    return options;
  };

  const getRandomFragment = () => {
    const isEng = isEnglish(fullText);
    const candidates = isEng ? getEnglishFragments(fullText) : getChineseFragments(fullText);

    if (candidates.length === 0) {
      setFragment('No more content available.');
      return;
    }

    const result = candidates[Math.floor(Math.random() * candidates.length)];
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


