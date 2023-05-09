// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  Character,
  CharacterData,
  CharacterPatch,
  CharacterQuery,
  CharacterService
} from './characters.class'

export type { Character, CharacterData, CharacterPatch, CharacterQuery }

export type CharacterClientService = Pick<
  CharacterService<Params<CharacterQuery>>,
  (typeof characterMethods)[number]
>

export const characterPath = 'characters'

export const characterMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const characterClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(characterPath, connection.service(characterPath), {
    methods: characterMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [characterPath]: CharacterClientService
  }
}
