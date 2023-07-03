// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
    descriptionDataValidator,
    descriptionPatchValidator,
    descriptionQueryValidator,
    descriptionResolver,
    descriptionExternalResolver,
    descriptionDataResolver,
    descriptionPatchResolver,
    descriptionQueryResolver
} from './descriptions.schema'

import type { Application } from '../../declarations'
import { DescriptionService, getOptions } from './descriptions.class'
import { descriptionPath, descriptionMethods } from './descriptions.shared'

export * from './descriptions.class'
export * from './descriptions.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const description = (app: Application) => {
    // Register our service on the Feathers application
    app.use(descriptionPath, new DescriptionService(getOptions(app)), {
        // A list of all methods this service exposes externally
        methods: descriptionMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    })
    // Initialize hooks
    app.service(descriptionPath).hooks({
        around: {
            all: [
                schemaHooks.resolveExternal(descriptionExternalResolver),
                schemaHooks.resolveResult(descriptionResolver)
            ]
        },
        before: {
            all: [
                schemaHooks.validateQuery(descriptionQueryValidator),
                schemaHooks.resolveQuery(descriptionQueryResolver)
            ],
            find: [],
            get: [],
            create: [
                schemaHooks.validateData(descriptionDataValidator),
                schemaHooks.resolveData(descriptionDataResolver)
            ],
            patch: [
                schemaHooks.validateData(descriptionPatchValidator),
                schemaHooks.resolveData(descriptionPatchResolver)
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
        [descriptionPath]: DescriptionService
    }
}
