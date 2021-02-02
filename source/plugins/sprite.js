import { Engine } from '../elements/engine.js';

const { loaders } = quantum;

Engine.plugins.add(api => {
    loaders.png = (url, options) => new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => reject(image);
        image.src = url;
    });
});