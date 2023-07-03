// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Description, DescriptionData, DescriptionPatch, DescriptionQuery } from './descriptions.schema'

export type { Description, DescriptionData, DescriptionPatch, DescriptionQuery }

export interface DescriptionParams extends MongoDBAdapterParams<DescriptionQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class DescriptionService<ServiceParams extends Params = DescriptionParams> extends MongoDBService<
    Description,
    DescriptionData,
    DescriptionParams,
    DescriptionPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
    return {
        paginate: app.get('paginate'),
        Model: app.get('mongodbClient').then((db) => db.collection('descriptions'))
    }
}
