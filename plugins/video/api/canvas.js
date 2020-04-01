import { assign, setElementParent } from '../imports';
import { videoOptions } from '../systems/video';

export const canvasOptions = {
    alpha: false,
    depth: true,
    stencil: false,
    antialias: false,
    desynchronized: true,
    premultipliedAlpha: true,
    preserveDrawingBuffer: false
};

export const configureCanvas = (options) => assign(canvasOptions, options);

export const createCanvas = (options = videoOptions) => {
    const canvas = document.createElement('canvas');

    if (options.parent) {
        setElementParent(canvas, options.parent);
    }

    if (options.scale) {
        resizeCanvas(canvas, options.scale);
    }

    return canvas;
}

export const getCanvasContext = (canvas, options = canvasOptions) => canvas.getContext('2d', options);

export const getWebGLContext = (canvas, options = canvasOptions) => canvas.getContext('webgl2', options) || canvas.getContext('webgl', options);

export const getWebGPUContext = (canvas) => canvas.getContext('gpupresent');

export const resizeCanvas = (canvas, scale) => {
    const scaledWidth = canvas.clientWidth * scale;
    const scaledHeight = canvas.clientHeight * scale;
    if (canvas.width !== scaledWidth || canvas.height !== scaledHeight) {
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;
        return true;
    }

    return false;
};