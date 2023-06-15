// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import type { Static } from '@feathersjs/typebox'
import { ObjectIdSchema, Type, getValidator, querySyntax } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const systemSchema = Type.Object(
    {
        _id: ObjectIdSchema(),
        system: Type.String(),
        brand: Type.String(),
        edition: Type.String()
    },
    { $id: 'System', additionalProperties: false }
)
export type System = Static<typeof systemSchema>
export const systemValidator = getValidator(systemSchema, dataValidator)
export const systemResolver = resolve<System, HookContext>({})

export const systemExternalResolver = resolve<System, HookContext>({})

// Schema for creating new entries
export const systemDataSchema = Type.Pick(systemSchema, ['system', 'brand', 'edition'], {
    $id: 'SystemData'
})
export type SystemData = Static<typeof systemDataSchema>
export const systemDataValidator = getValidator(systemDataSchema, dataValidator)
export const systemDataResolver = resolve<System, HookContext>({})

// Schema for updating existing entries
export const systemPatchSchema = Type.Partial(systemSchema, {
    $id: 'SystemPatch'
})
export type SystemPatch = Static<typeof systemPatchSchema>
export const systemPatchValidator = getValidator(systemPatchSchema, dataValidator)
export const systemPatchResolver = resolve<System, HookContext>({})

// Schema for allowed query properties
export const systemQueryProperties = Type.Pick(systemSchema, ['_id', 'system', 'brand', 'edition'])
export const systemQuerySchema = Type.Intersect(
    [
        querySyntax(systemQueryProperties),
        // Add additional query properties here
        Type.Object({}, { additionalProperties: false })
    ],
    { additionalProperties: false }
)
export type SystemQuery = Static<typeof systemQuerySchema>
export const systemQueryValidator = getValidator(systemQuerySchema, queryValidator)
export const systemQueryResolver = resolve<SystemQuery, HookContext>({})
