export const initializeECS = () => {
    const systemEntities = new Map();
    const entitySystems = new Map();

    const createSystem = system => {
        const entities = [];
        for (const [entity, systems] of entitySystems) {
            if (system.validate(entity)) {
                system.construct?.(entity);
                entities.push(entity);
                systems.push(system);
            }
        }

        systemEntities.set(system, entities);
    };

    const deleteSystem = system => {
        for (const entity of systemEntities.remove(system)) {
            entitySystems.get(entity).remove(system);
            system.destruct?.(entity);
        }
    }

    const updateSystems = time => {
        for (const [system, entities] of systemEntities) {
            system.update?.(entities, time);
        }
    };

    const createEntity = entity => {
        const systems = [];
        for (const [system, entities] of systemEntities) {
            if (system.validate(entity)) {
                system.construct?.(entity);
                entities.push(entity);
                systems.push(system);
            }
        }

        entitySystems.set(entity, systems);
    };

    const deleteEntity = entity => {
        for (const system of entitySystems.remove(entity)) {
            systemEntities.get(system).remove(entity);
            system.destruct?.(entity);
        }
    };

    const updateEntity = entity => {
        for (const [system, entities] of systemEntities) {
            if (system.validate(entity)) {
                if (!entities.has(entity)) {
                    entitySystems.get(entity).push(system);
                    system.construct?.(entity);
                    entities.push(entity);
                }
            } else if (entities.has(entity)) {
                entitySystems.get(entity).remove(system);
                system.destruct?.(entity);
                entities.remove(entity);
            }
        }
    };

    return {
        createSystem,
        deleteSystem,
        updateSystems,
        createEntity,
        deleteEntity,
        updateEntity
    }
};