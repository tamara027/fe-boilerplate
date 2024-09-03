import { loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

await loadScript('https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js');
await loadScript('https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/carousel/carousel.umd.js');
await loadCSS('https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css');
await loadCSS('https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/carousel/carousel.css');
/* global Fancybox, Carousel */

let galleryCounter = 0;

export default function decorate(block) {
  galleryCounter += 1;

  const slides = [...block.children].map((galleryItem) => {
    const slideElement = document.createElement('div');
    moveInstrumentation(galleryItem, slideElement);

    const img = document.createElement('img');

    const captionElement = galleryItem.querySelector('p');
    const caption = captionElement.textContent;

    const pictureElement = galleryItem.querySelector('picture');
    const imgElement = pictureElement.querySelector('img');

    const imgSrc = imgElement.getAttribute('src');

    slideElement.classList.add('f-carousel__slide');

    slideElement.setAttribute('data-src', imgSrc);
    slideElement.setAttribute('data-fancybox', `gallery-${galleryCounter}`);
    slideElement.setAttribute('data-caption', caption);

    img.setAttribute('src', imgSrc);

    slideElement.append(img);

    return slideElement;
  });

  block.textContent = '';
  slides.forEach((slide) => {
    block.append(slide);
  });

  block.classList.add('f-carousel');

  Fancybox.bind(block);

  // https://fancyapps.com/carousel/getting-started/#initialize
  // eslint-disable-next-line no-new
  new Carousel(block, {});
}
