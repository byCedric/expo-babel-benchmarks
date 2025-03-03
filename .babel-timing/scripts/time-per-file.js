const fs = require('node:fs');
const path = require('node:path');

const data = fs.readFileSync(path.join(__dirname, '..', 'data.jsonl'), 'utf8');
const entries = data.split('\n').filter(Boolean).map((content) => JSON.parse(content));

const sorted = entries.sort((a, b) => a.time - b.time);
const totalTime = entries.reduce((time, entry) => time + entry.time, 0);
const averageTime = totalTime / entries.length;

for (const entry of sorted) {
  console.log(entry.name, entry.time);
}

console.log('\nTotal time:', totalTime, 'ms for', entries.length, 'files - average', averageTime, 'ms per file');
