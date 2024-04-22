import { inventory } from './inventory/inventory'
import { description } from './descriptions/descriptions'
import { spell } from './spells/spells'
import { system } from './system/system'
import { weapon } from './weapons/weapons'
import { character } from './characters/characters'
import { message } from './messages/messages'
import { user } from './users/users'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
    app.configure(inventory)
    app.configure(description)
    app.configure(spell)
    app.configure(system)
    app.configure(weapon)
    app.configure(character)
    app.configure(message)
    app.configure(user)
    // All services will be registered here
}
