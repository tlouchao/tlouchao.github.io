import { map } from 'nanostores'

interface ExpandInterface {
    [key: string]: boolean,
}

export const $expand = map<ExpandInterface>(
    { 
        navbar: false,
        gallery: true,
    }
)

export enum ExpandEvent {
    ENABLE = "enableautoexpand", // TODO: remove enum?
    DISABLE = "disableautoexpand",
}