// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
    Description,
    DescriptionData,
    DescriptionPatch,
    DescriptionQuery,
    DescriptionService
} from './descriptions.class'

export type { Description, DescriptionData, DescriptionPatch, DescriptionQuery }

export type DescriptionClientService = Pick<
    DescriptionService<Params<DescriptionQuery>>,
    (typeof descriptionMethods)[number]
>

export const descriptionPath = 'descriptions'

export const descriptionMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const descriptionClient = (client: ClientApplication) => {
    const connection = client.get('connection')

    client.use(descriptionPath, connection.service(descriptionPath), {
        methods: descriptionMethods
    })
}

// Add this service to the client service type index
declare module '../../client' {
    interface ServiceTypes {
        [descriptionPath]: DescriptionClientService
    }
}
