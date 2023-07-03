// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { descriptionClient } from './services/descriptions/descriptions.shared'
export type {
    Description,
    DescriptionData,
    DescriptionQuery,
    DescriptionPatch
} from './services/descriptions/descriptions.shared'

import { spellClient } from './services/spells/spells.shared'
export type { Spell, SpellData, SpellQuery, SpellPatch } from './services/spells/spells.shared'

import { systemClient } from './services/system/system.shared'
export type { System, SystemData, SystemQuery, SystemPatch } from './services/system/system.shared'

import { weaponClient } from './services/weapons/weapons.shared'
export type { Weapon, WeaponData, WeaponQuery, WeaponPatch } from './services/weapons/weapons.shared'

import { characterClient } from './services/characters/characters.shared'
export type {
    Character,
    CharacterData,
    CharacterQuery,
    CharacterPatch
} from './services/characters/characters.shared'

import { messageClient } from './services/messages/messages.shared'
export type { Message, MessageData, MessageQuery, MessagePatch } from './services/messages/messages.shared'

import { userClient } from './services/users/users.shared'
export type { User, UserData, UserQuery, UserPatch } from './services/users/users.shared'

export interface Configuration {
    connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the luca app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any>(
    connection: TransportConnection<ServiceTypes>,
    authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
    const client: ClientApplication = feathers()

    client.configure(connection)
    client.configure(authenticationClient(authenticationOptions))
    client.set('connection', connection)

    client.configure(userClient)
    client.configure(messageClient)
    client.configure(characterClient)
    client.configure(weaponClient)
    client.configure(systemClient)
    client.configure(spellClient)
    client.configure(descriptionClient)
    return client
}
