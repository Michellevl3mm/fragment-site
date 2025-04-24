import { useState } from 'react';

export default function Home() {
  const fullText = `我曾经试图装点自己，用特殊的方法故事去改写未来，但已无力回天，就像这段文字一般没有结构，我没有省略任何文字却如行尸走肉，他像是最压抑的本能...`; // 可替换为完整文本
  const [fragment, setFragment] = useState('');

  const getRandomFragment = () => {
    const minLen = 3;
    const maxLen = 15;
    const len = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
    const start = Math.floor(Math.random() * (fullText.length - len));
    const result = fullText.slice(start, start + len);
    setFragment(result);
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
        抽一段
      </button>
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
        {fragment || '点上面按钮开始'}
      </div>
    </main>
  );
}
