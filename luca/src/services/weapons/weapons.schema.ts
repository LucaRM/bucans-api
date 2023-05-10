// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import type { Static } from '@feathersjs/typebox'
import { ObjectIdSchema, Type, getValidator, querySyntax } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const weaponSchema = Type.Object(
    {
        _id: ObjectIdSchema(),
        text: Type.String(),
        name: Type.String(),
        damage: Type.String(),
        weaponProperties: Type.String()
    },
    { $id: 'Weapon', additionalProperties: false }
)
export type Weapon = Static<typeof weaponSchema>
export const weaponValidator = getValidator(weaponSchema, dataValidator)
export const weaponResolver = resolve<Weapon, HookContext>({})

export const weaponExternalResolver = resolve<Weapon, HookContext>({})

// Schema for creating new entries
export const weaponDataSchema = Type.Pick(weaponSchema, ['text', 'name', 'damage', 'weaponProperties'], {
    $id: 'WeaponData'
})
export type WeaponData = Static<typeof weaponDataSchema>
export const weaponDataValidator = getValidator(weaponDataSchema, dataValidator)
export const weaponDataResolver = resolve<Weapon, HookContext>({})

// Schema for updating existing entries
export const weaponPatchSchema = Type.Partial(weaponSchema, {
    $id: 'WeaponPatch'
})
export type WeaponPatch = Static<typeof weaponPatchSchema>
export const weaponPatchValidator = getValidator(weaponPatchSchema, dataValidator)
export const weaponPatchResolver = resolve<Weapon, HookContext>({})

// Schema for allowed query properties
export const weaponQueryProperties = Type.Pick(weaponSchema, [
    '_id',
    'text',
    'name',
    'damage',
    'weaponProperties'
])
export const weaponQuerySchema = Type.Intersect(
    [
        querySyntax(weaponQueryProperties),
        // Add additional query properties here
        Type.Object({}, { additionalProperties: false })
    ],
    { additionalProperties: false }
)
export type WeaponQuery = Static<typeof weaponQuerySchema>
export const weaponQueryValidator = getValidator(weaponQuerySchema, queryValidator)
export const weaponQueryResolver = resolve<WeaponQuery, HookContext>({})
