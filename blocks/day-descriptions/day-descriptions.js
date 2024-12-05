/* eslint-disable no-console */
import { moveInstrumentation } from '../../scripts/scripts.js';

// eslint-disable-next-line consistent-return
export async function loadFragment(path) {
  const aemAuthorUrl = 'https://author-p123749-e1215043.adobeaemcloud.com';
  const aemPublishUrl = 'https://publish-p123749-e1215043.adobeaemcloud.com';
  const persistedQuery = '/graphql/execute.json/Content-Fragments/day-description-by-path';

  const url = window.location && window.location.origin && window.location.origin.includes('author')
    ? `${aemAuthorUrl}${persistedQuery};path=${path}`
    : `${aemPublishUrl}${persistedQuery};path=${path}`;
  const options = { credentials: 'include' };

  if (path && path.startsWith('/')) {
    const resp = await fetch(url, options);
    if (!resp.ok) {
      throw new Error(`Response status: ${resp.status}`);
    }

    const json = await resp.json();
    return json?.data?.dayDescriptionByPath?.item || {};
  }
}

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('day-description');

    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach(async (div) => {
      const link = div.querySelector('a');
      const path = (link ? link.getAttribute('href') : block.textContent.trim()).replace(
        /(\.plain)?\.html/,
        '',
      );
      const fragment = await loadFragment(path);

      // li.dataset.aueResource = `urn:aemconnection:${path}/jcr:content/data/master`;
      // li.dataset.aueType = 'reference';
      // li.dataset.aueFilter = 'cf';
      // li.removeAttribute('data-aue-model');

      // empty container of all contents including the anchor element
      div.replaceChildren();

      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');
      const textContainer = document.createElement('div');
      textContainer.classList.add('text-container');
      div.appendChild(imageContainer);
      div.appendChild(textContainer);

      const image = document.createElement('img');
      image.classList.add('day-description__image');
      // eslint-disable-next-line no-underscore-dangle
      image.src = fragment?.image?._path;
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
      description.innerHTML = fragment?.description?.html;
      textContainer.appendChild(description);
    });

    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}
