/* eslint-disable no-console */
// import {
//   decorateMain,
// } from '../../scripts/scripts.js';

// import {
//   loadSections,
// } from '../../scripts/aem.js';

// eslint-disable-next-line consistent-return
/* export async function loadFragment(path) {
  if (path && path.startsWith('/')) {
    const resp = await fetch(`${path}.infinity.json`);
    if (!resp.ok) {
      throw new Error(`Response status: ${resp.status}`);
    }

    const json = await resp.json();
    return json['jcr:content']?.data?.master || {};
  }
}

export default async function decorate(block) {
  const link = block.querySelector('a');
  const path = (link ? link.getAttribute('href') : block.textContent.trim())
    .replace(/(\.plain)?\.html/, '');
  const fragment = await loadFragment(path);

  if (fragment) {
    // add attributes to tie to block to content fragment
    block.dataset.aueResource = `urn:aemconnection:${path}/jcr:content/data/master`;
    block.dataset.aueType = 'reference';
    block.dataset.aueFilter = 'cf';
    block.removeAttribute('data-aue-model');

    const container = block.querySelector(':scope > div');
    // empty container of all contents including the anchor element
    container.replaceChildren();

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    const textContainer = document.createElement('div');
    textContainer.classList.add('text-container');
    container.appendChild(imageContainer);
    container.appendChild(textContainer);

    const image = document.createElement('img');
    image.classList.add('day-description__image');
    image.src = fragment?.image;
    imageContainer.appendChild(image);

    const subtitle = document.createElement('p');
    subtitle.classList.add('day-description__subtitle');
    subtitle.innerText = fragment?.dayNumber;
    textContainer.appendChild(subtitle);

    const title = document.createElement('h4');
    title.classList.add('day-description__title');
    title.innerText = fragment?.destination;
    textContainer.appendChild(title);

    const description = document.createElement('span');
    description.classList.add('day-description__description');
    description.innerHTML = fragment?.description;
    textContainer.appendChild(description);
  }
} */

import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block, ...rest) {
  console.log(rest);
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
}
