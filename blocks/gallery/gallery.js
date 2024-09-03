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

    const pictureElement = galleryItem.querySelector('picture');
    const itemType = pictureElement ? 'gallery-item' : 'gallery-item-youtube';

    let caption;
    let fullscreenSrc;
    let thumbnailSrc;

    if (itemType === 'gallery-item') {
      const captionElement = galleryItem.querySelector('p');
      caption = captionElement.textContent;
      const imgElement = pictureElement.querySelector('img');
      const imgSrc = imgElement.getAttribute('src');
      fullscreenSrc = imgSrc;
      thumbnailSrc = imgSrc;
    } else if (itemType === 'gallery-item-youtube') {
      const [captionElement, youtubeIdElement] = [...galleryItem.querySelectorAll('p')];
      caption = captionElement.textContent;
      const videoID = youtubeIdElement.textContent;
      fullscreenSrc = `https://www.youtube.com/watch?v=${videoID}`;
      thumbnailSrc = `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`;
    }

    const img = document.createElement('img');

    slideElement.classList.add('f-carousel__slide');

    slideElement.setAttribute('data-src', fullscreenSrc);
    slideElement.setAttribute('data-fancybox', `gallery-${galleryCounter}`);
    slideElement.setAttribute('data-caption', caption);

    img.setAttribute('src', thumbnailSrc);

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
