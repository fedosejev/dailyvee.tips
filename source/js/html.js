import React from 'react';
import path from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { renderToStaticMarkup } from 'react-dom/server';
import Episodes from './components/Episodes';
import content from '../data/content.json';

const render = () => {
  const indexHtmlFilePath = path.resolve(__dirname, '../../docs/index.html');
  const indexHtml = readFileSync(indexHtmlFilePath, 'utf8');

  const rendered = renderToStaticMarkup(
    <Episodes episodes={content.episodes} filterBy="" />
  );

  const updatedHtml = indexHtml.replace('<div id="replace"></div>', rendered);

  writeFileSync(indexHtmlFilePath, updatedHtml);
};

render();
