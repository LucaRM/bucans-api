// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
    systemDataResolver,
    systemDataValidator,
    systemExternalResolver,
    systemPatchResolver,
    systemPatchValidator,
    systemQueryResolver,
    systemQueryValidator,
    systemResolver
} from './system.schema'

import { authenticate } from '@feathersjs/authentication'
import type { Application } from '../../declarations'
import { SystemService, getOptions } from './system.class'
import { systemMethods, systemPath } from './system.shared'

export * from './system.class'
export * from './system.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const system = (app: Application) => {
    // Register our service on the Feathers application
    app.use(systemPath, new SystemService(getOptions(app)), {
        // A list of all methods this service exposes externally
        methods: systemMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    })
    // Initialize hooks
    app.service(systemPath).hooks({
        around: {
            all: [
                authenticate('jwt'),
                schemaHooks.resolveExternal(systemExternalResolver),
                schemaHooks.resolveResult(systemResolver)
            ]
        },
        before: {
            all: [
                schemaHooks.validateQuery(systemQueryValidator),
                schemaHooks.resolveQuery(systemQueryResolver)
            ],
            find: [],
            get: [],
            create: [
                schemaHooks.validateData(systemDataValidator),
                schemaHooks.resolveData(systemDataResolver)
            ],
            patch: [
                schemaHooks.validateData(systemPatchValidator),
                schemaHooks.resolveData(systemPatchResolver)
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
        [systemPath]: SystemService
    }
}
