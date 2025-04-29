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
  const [fullText, setFullText] = useState(`水中、沉默的人，不再去相信不再去回应，按理来说我应该写下来，但是书写减缓了我思考的速度，我只能打字，有一下没一下的敲打，钢琴，其实我在弹钢琴.又耳鸣了，像随机生成的文字，轰鸣，我的头开始晕了，我到底该怎么办，我也不知道.
...
Tibet—
The wind in the valley that lifted me into the sky,
That cruel landscape—
You shouldn’t stare at it so many times.`);

  const getRandomFragment = () => {
    const isEnglish = /^[\x00-\x7F]+$/.test(fullText);
    const options = [];
    const words = fullText.split(/\s+/).filter(Boolean);
    if (words.length > 5) {
      for (let i = 0; i <= words.length - 5; i++) {
        for (let len = 5; len <= 10 && i + len <= words.length; len++) {
          const slice = words.slice(i, i + len).join(' ');
          if (!usedFragments.has(slice)) options.push(slice);
        }
      }
    }
    for (let i = 0; i < fullText.length; i++) {
      for (let len = 3; len <= 15 && i + len <= fullText.length; len++) {
        const slice = fullText.slice(i, i + len);
        if (!/\s/.test(slice) && !usedFragments.has(slice)) {
          options.push(slice);
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
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          marginBottom: '20px',
          cursor: 'pointer',
        }}>
        Draw
      </button>

      <div
        style={{
          padding: '20px',
          fontSize: '18px',
          border: '1px solid #ccc',
          borderRadius: '10px',
          maxWidth: '600px',
          margin: '0 auto',
          minHeight: '80px'
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
          Submit
        </button>
      </div>
    </main>
  );
}



