import { createCanvas, getWebGLContext, resizeCanvas, firstSubstring } from '../imports';

export const extensionNames = ['ANGLE_instanced_arrays'];

export function createWebGLContext() {
    const context = getWebGLContext(createCanvas());
    applyOptionsAndExtensions(context);
    return context;
}

export function applyOptionsAndExtensions(context) {
    context.enable(context.DEPTH_TEST);
    context.enable(context.BLEND);
    context.blendFunc(context.ONE, context.ONE_MINUS_SRC_ALPHA);
    context.pixelStorei(context.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, true);

    for (const extensionName of extensionNames) {
        const vendorName = firstSubstring(extensionName, extensionName.indexOf('_'));
        const extension = context.getExtension(extensionName);
        for (const member in extension) {
            const isConstant = member.includes('_');
            const memberNameWithoutVendorName = firstSubstring(member, member.indexOf(vendorName) - (isConstant ? 1 : 0));
            context[memberNameWithoutVendorName] = isConstant ? extension[member] : extension[member].bind(extension);
        }
    }
}

export function resizeContext(context, scale) {
    if (resizeCanvas(context.canvas, scale)) {
        context.viewport(0, 0, context.drawingBufferWidth, context.drawingBufferHeight);
    }
}