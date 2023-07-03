// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Spell, SpellData, SpellPatch, SpellQuery, SpellService } from './spells.class'

export type { Spell, SpellData, SpellPatch, SpellQuery }

export type SpellClientService = Pick<SpellService<Params<SpellQuery>>, (typeof spellMethods)[number]>

export const spellPath = 'spells'

export const spellMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const spellClient = (client: ClientApplication) => {
    const connection = client.get('connection')

    client.use(spellPath, connection.service(spellPath), {
        methods: spellMethods
    })
}

// Add this service to the client service type index
declare module '../../client' {
    interface ServiceTypes {
        [spellPath]: SpellClientService
    }
}
