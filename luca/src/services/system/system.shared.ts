// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { System, SystemData, SystemPatch, SystemQuery, SystemService } from './system.class'

export type { System, SystemData, SystemPatch, SystemQuery }

export type SystemClientService = Pick<SystemService<Params<SystemQuery>>, (typeof systemMethods)[number]>

export const systemPath = 'system'

export const systemMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const systemClient = (client: ClientApplication) => {
    const connection = client.get('connection')

    client.use(systemPath, connection.service(systemPath), {
        methods: systemMethods
    })
}

// Add this service to the client service type index
declare module '../../client' {
    interface ServiceTypes {
        [systemPath]: SystemClientService
    }
}
