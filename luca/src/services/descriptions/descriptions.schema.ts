// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const descriptionSchema = Type.Object(
    {
        _id: ObjectIdSchema(),
        text: Type.String()
    },
    { $id: 'Description', additionalProperties: false }
)
export type Description = Static<typeof descriptionSchema>
export const descriptionValidator = getValidator(descriptionSchema, dataValidator)
export const descriptionResolver = resolve<Description, HookContext>({})

export const descriptionExternalResolver = resolve<Description, HookContext>({})

// Schema for creating new entries
export const descriptionDataSchema = Type.Pick(descriptionSchema, ['text'], {
    $id: 'DescriptionData'
})
export type DescriptionData = Static<typeof descriptionDataSchema>
export const descriptionDataValidator = getValidator(descriptionDataSchema, dataValidator)
export const descriptionDataResolver = resolve<Description, HookContext>({})

// Schema for updating existing entries
export const descriptionPatchSchema = Type.Partial(descriptionSchema, {
    $id: 'DescriptionPatch'
})
export type DescriptionPatch = Static<typeof descriptionPatchSchema>
export const descriptionPatchValidator = getValidator(descriptionPatchSchema, dataValidator)
export const descriptionPatchResolver = resolve<Description, HookContext>({})

// Schema for allowed query properties
export const descriptionQueryProperties = Type.Pick(descriptionSchema, ['_id', 'text'])
export const descriptionQuerySchema = Type.Intersect(
    [
        querySyntax(descriptionQueryProperties),
        // Add additional query properties here
        Type.Object({}, { additionalProperties: false })
    ],
    { additionalProperties: false }
)
export type DescriptionQuery = Static<typeof descriptionQuerySchema>
export const descriptionQueryValidator = getValidator(descriptionQuerySchema, queryValidator)
export const descriptionQueryResolver = resolve<DescriptionQuery, HookContext>({})
