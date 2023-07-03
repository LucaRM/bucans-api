// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Spell, SpellData, SpellPatch, SpellQuery } from './spells.schema'

export type { Spell, SpellData, SpellPatch, SpellQuery }

export interface SpellParams extends MongoDBAdapterParams<SpellQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class SpellService<ServiceParams extends Params = SpellParams> extends MongoDBService<
    Spell,
    SpellData,
    SpellParams,
    SpellPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
    return {
        paginate: app.get('paginate'),
        Model: app.get('mongodbClient').then((db) => db.collection('spells'))
    }
}
