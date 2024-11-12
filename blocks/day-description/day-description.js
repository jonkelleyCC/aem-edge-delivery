// import {
//   decorateMain,
// } from '../../scripts/scripts.js';

// import {
//   loadSections,
// } from '../../scripts/aem.js';

// eslint-disable-next-line consistent-return
export async function loadFragment(path) {
  if (path && path.startsWith('/')) {
    // eslint-disable-next-line no-param-reassign
    path = path.replace(/(\.plain)?\.html/, '');
    const resp = await fetch(`${path}.infinity.json`);
    if (!resp.ok) {
      throw new Error(`Response status: ${resp.status}`);
    }

    const json = await resp.json();
    return json['jcr:content']?.data?.master || {};
  }
}

export default async function decorate(block) {
  // eslint-disable-next-line no-console
  console.log(block);
  const link = block.querySelector('a');
  const path = link ? link.getAttribute('href') : block.textContent.trim();
  const fragment = await loadFragment(path);
  // eslint-disable-next-line no-console
  console.log(fragment);

  if (fragment) {
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

    const description = document.createElement('p');
    description.classList.add('day-description__description');
    description.innerText = fragment?.description;
    textContainer.appendChild(description);
  }
}
