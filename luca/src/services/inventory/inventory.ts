// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
    inventoryDataValidator,
    inventoryPatchValidator,
    inventoryQueryValidator,
    inventoryResolver,
    inventoryExternalResolver,
    inventoryDataResolver,
    inventoryPatchResolver,
    inventoryQueryResolver
} from './inventory.schema'

import type { Application } from '../../declarations'
import { InventoryService, getOptions } from './inventory.class'
import { inventoryPath, inventoryMethods } from './inventory.shared'

export * from './inventory.class'
export * from './inventory.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const inventory = (app: Application) => {
    // Register our service on the Feathers application
    app.use(inventoryPath, new InventoryService(getOptions(app)), {
        // A list of all methods this service exposes externally
        methods: inventoryMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    })
    // Initialize hooks
    app.service(inventoryPath).hooks({
        around: {
            all: [
                /* authenticate('jwt'), */
                schemaHooks.resolveExternal(inventoryExternalResolver),
                schemaHooks.resolveResult(inventoryResolver)
            ]
        },
        before: {
            all: [
                schemaHooks.validateQuery(inventoryQueryValidator),
                schemaHooks.resolveQuery(inventoryQueryResolver)
            ],
            find: [],
            get: [],
            create: [
                schemaHooks.validateData(inventoryDataValidator),
                schemaHooks.resolveData(inventoryDataResolver)
            ],
            patch: [
                schemaHooks.validateData(inventoryPatchValidator),
                schemaHooks.resolveData(inventoryPatchResolver)
            ],
            remove: []
        },
        after: {
            all: []
        },
        error: {
            all: []
        }
    })
}

// Add this service to the service type index
declare module '../../declarations' {
    interface ServiceTypes {
        [inventoryPath]: InventoryService
    }
}
