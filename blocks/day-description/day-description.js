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
  // if (fragment) {
  //   // const container = block.querySelector('>div');
  //   // eslint-disable-next-line no-console
  //   console.log(fragment);
  // }
}
