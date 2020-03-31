import { resourceOptions } from '../../../engine/main';

const loadImage = async (resource) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.src = resource;
    });
};

resourceOptions.extensions.png = loadImage;
