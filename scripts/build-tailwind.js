#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const tailwindPostcss = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');

async function build() {
  try {
    const inputPath = path.resolve(process.cwd(), 'styles/tailwind.input.css');
    const outPath = path.resolve(process.cwd(), 'app/tailwind.css');
    const css = fs.readFileSync(inputPath, 'utf8');

    // Run Tailwind's PostCSS plugin without optimization (run in Node)
    const processor = postcss([
      tailwindPostcss({ optimize: false }),
      autoprefixer(),
    ]);

    const result = await processor.process(css, { from: inputPath, to: outPath });
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, result.css, 'utf8');
    console.log('Built', outPath);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

build();
