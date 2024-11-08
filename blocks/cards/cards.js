import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    const textContainer = document.createElement('div');
    textContainer.className = 'cards-card-body';
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
        div.after(textContainer);
      } else if (div.querySelector('[data-aue-prop="subtitle"]')) {
        div.className = 'cards-card-subtitle';
        textContainer.appendChild(div);
      } else if (div.querySelector('[data-aue-prop="title"]')) {
        div.className = 'cards-card-title';
        textContainer.appendChild(div);
      } else {
        div.className = 'cards-card-text';
        textContainer.appendChild(div);
      }
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
