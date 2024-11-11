// import {
//   decorateMain,
// } from '../../scripts/scripts.js';

// import {
//   loadSections,
// } from '../../scripts/aem.js';

export async function loadFragment(path) {
  if (path && path.startsWith('/')) {
    // eslint-disable-next-line no-param-reassign
    path = path.replace(/(\.plain)?\.html/, '').replace('/content/dam', '');
    const resp = await fetch(`/api/assets${path}.json`);
    if (resp.ok) {
      return resp.json();
    }
  }
  return null;
}

export default async function decorate(block) {
  // eslint-disable-next-line no-console
  console.log(block);
  // const link = block.querySelector('a');
  // const path = link ? link.getAttribute('href') : block.textContent.trim();
  // const fragment = await loadFragment(path);
  // if (fragment) {
  //   // const container = block.querySelector('>div');
  //   // eslint-disable-next-line no-console
  //   console.log(fragment);
  // }
}
