// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
    characterDataResolver,
    characterDataValidator,
    characterExternalResolver,
    characterPatchResolver,
    characterPatchValidator,
    characterQueryResolver,
    characterQueryValidator,
    characterResolver
} from './characters.schema'

import type { Application } from '../../declarations'
import { CharacterService, getOptions } from './characters.class'
import { characterMethods, characterPath } from './characters.shared'

export * from './characters.class'
export * from './characters.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const character = (app: Application) => {
    // Register our service on the Feathers application
    app.use(characterPath, new CharacterService(getOptions(app)), {
        // A list of all methods this service exposes externally
        methods: characterMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    })
    // Initialize hooks
    app.service(characterPath).hooks({
        around: {
            all: [
                // authenticate('jwt'),
                schemaHooks.resolveExternal(characterExternalResolver),
                schemaHooks.resolveResult(characterResolver)
            ]
        },
        before: {
            all: [
                schemaHooks.validateQuery(characterQueryValidator),
                schemaHooks.resolveQuery(characterQueryResolver)
            ],
            find: [],
            get: [],
            create: [
                schemaHooks.validateData(characterDataValidator),
                schemaHooks.resolveData(characterDataResolver)
            ],
            patch: [
                schemaHooks.validateData(characterPatchValidator),
                schemaHooks.resolveData(characterPatchResolver)
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
        [characterPath]: CharacterService
    }
}
