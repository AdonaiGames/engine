﻿export function createTexture(context, parameters, target, format, type, data) {
    const texture = {
        parameters,
        target,
        format,
        type,
        data
    };

    applyTexture(texture, context);
    return texture;
}

export function applyTexture(texture, context) {
    texture.changed = !!texture.data;
    texture.type = context[texture.type] || texture.type || context.UNSIGNED_BYTE;
    texture.target = context[texture.target] || texture.target || context.TEXTURE_2D;
    texture.format = context[texture.format] || texture.format || context.RGBA;
    texture.parameters = texture.parameters || [{ name: context.TEXTURE_MIN_FILTER, value: context.LINEAR }];
    for (const parameter of texture.parameters) {
        if(context.hasOwnProperty(parameter.name)) {
            parameter.name = context[parameter.name]
        }

        if (context.hasOwnProperty(parameter.value)) {
            parameter.value = context[parameter.value]
        }        
    }

    restoreTexture(texture, context);
    context.textures.add(texture);
}

export function restoreTexture(texture, context) {
    texture.handle = context.createTexture();
}

export function bindTexture(texture, context) {
    context.activeTexture(context.TEXTURE0 + texture.unit);
    context.bindTexture(texture.target, texture.handle);
}

export function bufferTexture(texture, context) {
    for (const parameter of texture.parameters) {
        //context.texParameteri(texture.target, parameter.name, parameter.value);
        context.texParameterf(texture.target, parameter.name, parameter.value);
    }

    context.texImage2D(texture.target, /* mipmap level */ 0, texture.format, texture.format, texture.type, texture.data);
}

export function deleteTexture(texture, context) {
    context.textures.delete(texture);
    context.deleteTexture(texture.handle);
}