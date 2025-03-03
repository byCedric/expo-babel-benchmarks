# Babel transform benchmark

This is a test project where `@expo/metro-config`'s babel transformer is hotwired with `babel-timing` to benchmark individual babel transformations.

## How to use

- `bun expo export --clear --platform ...` - generate the benchmark first
- `bun run babel-timing:per-file` - to see benchmark results per file
- `bun run babel-timing:per-plugin` - to see benchmark results per plugin

> Make sure to delete **.babel-timing/data.jsonl** before rerunning another benchmark, otherwise the data will be appended to the old benchmark.
