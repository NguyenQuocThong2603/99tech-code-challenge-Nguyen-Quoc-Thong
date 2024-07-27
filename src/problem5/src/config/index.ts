import { ContainerConfig } from './Container'
import { DbConfig } from './Db'

export const Config = {
    ...ContainerConfig,
    ...DbConfig,
}