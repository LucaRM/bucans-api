// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Weapon, WeaponData, WeaponPatch, WeaponQuery, WeaponService } from './weapons.class'

export type { Weapon, WeaponData, WeaponPatch, WeaponQuery }

export type WeaponClientService = Pick<WeaponService<Params<WeaponQuery>>, (typeof weaponMethods)[number]>

export const weaponPath = 'weapons'

export const weaponMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const weaponClient = (client: ClientApplication) => {
    const connection = client.get('connection')

    client.use(weaponPath, connection.service(weaponPath), {
        methods: weaponMethods
    })
}

// Add this service to the client service type index
declare module '../../client' {
    interface ServiceTypes {
        [weaponPath]: WeaponClientService
    }
}
