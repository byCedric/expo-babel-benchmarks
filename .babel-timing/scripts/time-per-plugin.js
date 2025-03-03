const fs = require('node:fs');
const path = require('node:path');
const process = require('node:process');
const assert = require('node:assert');

const platform = process.argv[2];
assert(platform, 'No platform specified, run the script with `per-file [android|ios|web|server]` to select the platform benchmark results');

const data = fs.readFileSync(path.join(__dirname, '..', `data-${platform}.jsonl`), 'utf8');
const entries = data.split('\n').filter(Boolean).map((content) => JSON.parse(content));

const plugins = {};

for (const entry of entries) {
  for (const plugin of entry.plugins) {
    if (!(plugin.name in plugins)) {
      plugins[plugin.name] = {};
    }

    plugins[plugin.name][entry.name] = plugin;
  }
}

const unsorted = [];

for (const pluginName of Object.keys(plugins)) {
  const plugin = plugins[pluginName];
  const totalTime = Object.values(plugin).reduce((time, entry) => time + entry.time, 0);
  const averageTime = totalTime / Object.values(plugin).length;
  const totalVisits = Object.values(plugin).reduce((visits, entry) => visits + entry.visits, 0);

  unsorted.push({
    plugin: pluginName,
    totalTime,
    averageTime,
    totalVisits,
  });
}

for (const entry of unsorted.sort((a, b) => a.totalTime - b.totalTime)) {
  const { plugin, averageTime, totalTime, totalVisits } = entry;
  console.log(plugin, '|| average of', averageTime, 'ms per file || total time', totalTime, 'ms || total visits', totalVisits);
}
