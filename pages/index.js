
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
  const [fullText, setFullText] = useState(\`
水中、沉默的人，不再去相信不再去回应，按理来说我应该写下来，但是书写减缓了我思考的速度，我只能打字，有一下没一下的敲打，钢琴，其实我在弹钢琴……
I once tried to adorn myself, to rewrite the future through peculiar stories and methods, but it was all in vain. Just like these words—without structure. I have omitted nothing, and yet I feel like the walking dead. It feels like the most repressed instinct...
（中略，可自行补充完整长文）
\`);

  const getRandomFragment = () => {
    const isEnglish = /^[a-zA-Z0-9\s.,'";!?-]+$/.test(fullText);
    const min = isEnglish ? 5 : 3;
    const max = isEnglish ? 10 : 15;
    const units = isEnglish ? fullText.split(/\s+/) : Array.from(fullText);
    const options = [];
    for (let i = 0; i < units.length; i++) {
      for (let len = min; len <= max && i + len <= units.length; len++) {
        const slice = units.slice(i, i + len).join(isEnglish ? ' ' : '');
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
      setFullText(prev => prev + (prev.endsWith(' ') ? '' : ' ') + inputText.trim());
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
          style={{ padding: '10px 20px', marginLeft: '10px' }}>
          submit
        </button>
      </div>
    </main>
  );
}
