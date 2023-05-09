// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Character, CharacterData, CharacterPatch, CharacterQuery } from './characters.schema'

export type { Character, CharacterData, CharacterPatch, CharacterQuery }

export interface CharacterParams extends MongoDBAdapterParams<CharacterQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class CharacterService<ServiceParams extends Params = CharacterParams> extends MongoDBService<
  Character,
  CharacterData,
  CharacterParams,
  CharacterPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('characters'))
  }
}
