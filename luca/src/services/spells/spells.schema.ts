// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import type { Static } from '@feathersjs/typebox'
import { ObjectIdSchema, Type, getValidator, querySyntax } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const spellSchema = Type.Object(
    {
        _id: ObjectIdSchema(),
        system: Type.String(),
        sourceBook: Type.String(),
        magicSource: Type.String(),
        name: Type.String(),
        level: Type.String(),
        duration: Type.String(),
        castingAction: Type.String(),
        school: Type.String(),
        range: Type.String(),
        attackType: Type.String(),
        savingThrow: Type.String(),
        components: Type.String(),
        damageType: Type.String(),
        effect: Type.String(),
        description: Type.String(),
        dice: Type.String(),
        targets: Type.String(),
        image: Type.String()
    },
    { $id: 'Spell', additionalProperties: true }
)
export type Spell = Static<typeof spellSchema>
export const spellValidator = getValidator(spellSchema, dataValidator)
export const spellResolver = resolve<Spell, HookContext>({})

export const spellExternalResolver = resolve<Spell, HookContext>({})

// Schema for creating new entries
export const spellDataSchema = Type.Pick(
    spellSchema,
    [
        'system',
        'sourceBook',
        'magicSource',
        'name',
        'level',
        'duration',
        'castingAction',
        'school',
        'range',
        'attackType',
        'savingThrow',
        'components',
        'damageType',
        'effect',
        'description',
        'dice',
        'targets',
        'image'
    ],
    {
        $id: 'SpellData'
    }
)
export type SpellData = Static<typeof spellDataSchema>
export const spellDataValidator = getValidator(spellDataSchema, dataValidator)
export const spellDataResolver = resolve<Spell, HookContext>({})

// Schema for updating existing entries
export const spellPatchSchema = Type.Partial(spellSchema, {
    $id: 'SpellPatch'
})
export type SpellPatch = Static<typeof spellPatchSchema>
export const spellPatchValidator = getValidator(spellPatchSchema, dataValidator)
export const spellPatchResolver = resolve<Spell, HookContext>({})

// Schema for allowed query properties
export const spellQueryProperties = Type.Pick(spellSchema, [
    '_id',
    'system',
    'sourceBook',
    'magicSource',
    'name',
    'level',
    'duration',
    'castingAction',
    'school',
    'range',
    'attackType',
    'savingThrow',
    'components',
    'damageType',
    'effect',
    'description',
    'dice',
    'targets',
    'image'
])
export const spellQuerySchema = Type.Intersect(
    [
        querySyntax(spellQueryProperties),
        // Add additional query properties here
        Type.Object({}, { additionalProperties: false })
    ],
    { additionalProperties: false }
)
export type SpellQuery = Static<typeof spellQuerySchema>
export const spellQueryValidator = getValidator(spellQuerySchema, queryValidator)
export const spellQueryResolver = resolve<SpellQuery, HookContext>({})
