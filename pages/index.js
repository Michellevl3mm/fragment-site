import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function FragmentSelector() {
  const [textBank, setTextBank] = useState('');
  const [fragment, setFragment] = useState('');
  const [usedFragments, setUsedFragments] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('usedFragments');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('usedFragments', JSON.stringify(usedFragments));
    }
  }, [usedFragments]);

  const getRandomFragment = () => {
    if (!textBank) return;
    let tries = 0;
    const maxTries = 100;

    while (tries < maxTries) {
      const rand = Math.random();
      const len = rand < 0.01 ? 100 : Math.floor(Math.random() * 13) + 3;
      const start = Math.floor(Math.random() * (textBank.length - len));
      const result = textBank.slice(start, start + len);

      if (!usedFragments.includes(result)) {
        setFragment(result);
        setUsedFragments([...usedFragments, result]);
        return;
      }
      tries++;
    }
    setFragment('No available new fragment. Please upload more content.');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const newText = reader.result;
      setTextBank(prev => prev + '\n' + newText);
    };
    if (file) reader.readAsText(file);
  };

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <input
        type="file"
        accept=".txt,.rtf,.md"
        onChange={handleFileUpload}
        className="mb-2"
      />
      <Button onClick={getRandomFragment}>Draw Fragment</Button>
      <Card className="w-full max-w-md">
        <CardContent className="p-4 text-center text-lg whitespace-pre-wrap">
          {fragment || 'Please upload a file and click the button'}
        </CardContent>
      </Card>
    </div>
  );
}