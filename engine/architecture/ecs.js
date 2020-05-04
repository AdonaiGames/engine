import { createPropertyTraps } from '../utilities/proxies.js';

export const systems = new Map();

const addComponent = (entity, name, value) => systems.has(name) && systems.get(name).add(value);

const deleteComponent = (entity, name, value) => systems.has(name) && systems.get(name).delete(value);

const updateComponents = (entity, method) => Object.entries(entity).forEach(([name, value]) => method(entity, name, value));

export const proxyEntity = (entity) => new Proxy(entity || {}, createPropertyTraps(addComponent, deleteComponent));

export const attachEntity = (entity) => updateComponents(entity, addComponent);

export const detachEntity = (entity) => updateComponents(entity, deleteComponent);