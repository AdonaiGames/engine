import { bufferData } from './buffers';

export const encodeCommand = (device, command) => {
    const commandEncoder = device.createCommandEncoder();
    for (const pass of command.passes) {
        if (pass.compute) {
            const { descriptor } = pass;

            const computePassEncoder = commandEncoder.beginComputePass(descriptor);

            computePassEncoder.endPass();
        } else {
            const { descriptor, pipeline, viewport, scissorRect, bindGroups, vertexBuffers, indexBuffer, draws } = pass;

            const renderPassEncoder = commandEncoder.beginRenderPass(descriptor);
            renderPassEncoder.setPipeline(pipeline);

            // TODO: Set this only on viewport resize.
            if (viewport) {
                renderPassEncoder.setViewport(viewport.x, viewport.y, viewport.width, viewport.height, viewport.minDepth, viewport.maxDepth);
            }

            if (scissorRect) {
                renderPassEncoder.setScissorRect(scissorRect.x, scissorRect.y, scissorRect.width, scissorRect.height); //canvas.width/height
            }

            if (bindGroups) {
                for (let i = 0; i < bindGroups.length; i++) {
                    renderPassEncoder.setBindGroup(i, bindGroups[i]);
                }
            }

            if (vertexBuffers) {
                for (let i = 0; i < vertexBuffers.length; i++) {
                    renderPassEncoder.setVertexBuffer(i, vertexBuffers[i].handle);
                }
            }

            if (indexBuffer) {
                renderPassEncoder.setIndexBuffer(indexBuffer.handle);
            }

            if (draws) {
                for (const draw of draws) {
                    const indexed = draw.indexed;
                    const indirect = draw.indirect;
                    if (indexed) {
                        if (indirect) {
                            renderPassEncoder.drawIndexedIndirect(draw.buffer, draw.offset);
                        } else {
                            renderPassEncoder.drawIndexed(draw.count, draw.instances, draw.firstElement, draw.baseVertex, draw.firstInstance);
                        }
                    } else {
                        if (indirect) {
                            renderPassEncoder.drawIndirect(draw.buffer, draw.offset);
                        } else {
                            renderPassEncoder.draw(draw.count, draw.instances, draw.firstElement, draw.firstInstance);
                        }
                    }
                }
            }

            renderPassEncoder.endPass();
        }
    }

    return commandEncoder.finish();
};