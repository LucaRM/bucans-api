// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
    Inventory,
    InventoryData,
    InventoryPatch,
    InventoryQuery,
    InventoryService
} from './inventory.class'

export type { Inventory, InventoryData, InventoryPatch, InventoryQuery }

export type InventoryClientService = Pick<
    InventoryService<Params<InventoryQuery>>,
    (typeof inventoryMethods)[number]
>

export const inventoryPath = 'inventory'

export const inventoryMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const inventoryClient = (client: ClientApplication) => {
    const connection = client.get('connection')

    client.use(inventoryPath, connection.service(inventoryPath), {
        methods: inventoryMethods
    })
}

// Add this service to the client service type index
declare module '../../client' {
    interface ServiceTypes {
        [inventoryPath]: InventoryClientService
    }
}
