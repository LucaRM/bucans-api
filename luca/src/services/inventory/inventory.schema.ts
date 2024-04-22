// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema

const Item = Type.Object(
    {
        externalId: ObjectIdSchema(),
        quantity: Type.Number(),
    },
    { $id: 'Item', additionalProperties: true }
)
export const inventorySchema = Type.Object(
    {
        _id: ObjectIdSchema(),
        owner: ObjectIdSchema(),
        item: Item
    },
    { $id: 'Inventory', additionalProperties: true }
)
export type Inventory = Static<typeof inventorySchema>
export const inventoryValidator = getValidator(inventorySchema, dataValidator)
export const inventoryResolver = resolve<Inventory, HookContext>({})

export const inventoryExternalResolver = resolve<Inventory, HookContext>({})

// Schema for creating new entries
export const inventoryDataSchema = Type.Pick(inventorySchema, ["owner"], {
    $id: 'InventoryData'
})
export type InventoryData = Static<typeof inventoryDataSchema>
export const inventoryDataValidator = getValidator(inventoryDataSchema, dataValidator)
export const inventoryDataResolver = resolve<Inventory, HookContext>({})

// Schema for updating existing entries
export const inventoryPatchSchema = Type.Partial(inventorySchema, {
    $id: 'InventoryPatch'
})
export type InventoryPatch = Static<typeof inventoryPatchSchema>
export const inventoryPatchValidator = getValidator(inventoryPatchSchema, dataValidator)
export const inventoryPatchResolver = resolve<Inventory, HookContext>({})

// Schema for allowed query properties
export const inventoryQueryProperties = Type.Pick(inventorySchema, ['_id', 'owner'])
export const inventoryQuerySchema = Type.Intersect(
    [
        querySyntax(inventoryQueryProperties),
        // Add additional query properties here
        Type.Object({}, { additionalProperties: false })
    ],
    { additionalProperties: false }
)
export type InventoryQuery = Static<typeof inventoryQuerySchema>
export const inventoryQueryValidator = getValidator(inventoryQuerySchema, queryValidator)
export const inventoryQueryResolver = resolve<InventoryQuery, HookContext>({})
