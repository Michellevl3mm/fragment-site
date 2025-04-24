
import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./data/fragments.txt');

let usedFragments = new Set();

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { text } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Invalid text' });
    }
    fs.appendFileSync(filePath, `\n${text}`);
    return res.status(200).json({ status: 'Text appended' });
  }

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'No content found' });
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content
    .replace(/\s+/g, '')
    .match(/.{3,15}/g)
    ?.filter(line => line && !usedFragments.has(line)) || [];

  if (lines.length === 0) {
    return res.status(200).json({ fragment: null });
  }

  const selected = lines[Math.floor(Math.random() * lines.length)];
  usedFragments.add(selected);

  return res.status(200).json({ fragment: selected });
}
