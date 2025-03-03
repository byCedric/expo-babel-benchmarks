const fs = require('node:fs');
const path = require('node:path');
const process = require('node:process');
const assert = require('node:assert');

const platform = process.argv[2];
assert(platform, 'No platform specified, run the script with `per-file [android|ios|web|server]` to select the platform benchmark results');

const data = fs.readFileSync(path.join(__dirname, '..', `data-${platform}.jsonl`), 'utf8');
const entries = data.split('\n').filter(Boolean).map((content) => JSON.parse(content));

const sorted = entries.sort((a, b) => a.time - b.time);
const totalTime = entries.reduce((time, entry) => time + entry.time, 0);
const averageTime = totalTime / entries.length;

for (const entry of sorted) {
  console.log(entry.name, entry.time);
}

console.log('\nTotal time:', totalTime, 'ms for', entries.length, 'files - average', averageTime, 'ms per file');
