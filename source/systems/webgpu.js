import { registerComponentSystemUpdate } from '../application/architecture';
import { createWebGPUVideo } from '../output/video';

export async function registerWebGPUSystem() {
    const video = createWebGPUVideo();
    setElementParent(video.canvas, document.body);
    registerComponentSystemUpdate('renderable', video.renderable, video.render);
}
