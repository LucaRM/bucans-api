// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
    weaponDataResolver,
    weaponDataValidator,
    weaponExternalResolver,
    weaponPatchResolver,
    weaponPatchValidator,
    weaponQueryResolver,
    weaponQueryValidator,
    weaponResolver
} from './weapons.schema'

import { authenticate } from '@feathersjs/authentication'
import type { Application } from '../../declarations'
import { WeaponService, getOptions } from './weapons.class'
import { weaponMethods, weaponPath } from './weapons.shared'

export * from './weapons.class'
export * from './weapons.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const weapon = (app: Application) => {
    // Register our service on the Feathers application
    app.use(weaponPath, new WeaponService(getOptions(app)), {
        // A list of all methods this service exposes externally
        methods: weaponMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    })
    // Initialize hooks
    app.service(weaponPath).hooks({
        around: {
            all: [
                authenticate('jwt'),
                schemaHooks.resolveExternal(weaponExternalResolver),
                schemaHooks.resolveResult(weaponResolver)
            ]
        },
        before: {
            all: [
                schemaHooks.validateQuery(weaponQueryValidator),
                schemaHooks.resolveQuery(weaponQueryResolver)
            ],
            find: [],
            get: [],
            create: [
                schemaHooks.validateData(weaponDataValidator),
                schemaHooks.resolveData(weaponDataResolver)
            ],
            patch: [
                schemaHooks.validateData(weaponPatchValidator),
                schemaHooks.resolveData(weaponPatchResolver)
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
        [weaponPath]: WeaponService
    }
}
