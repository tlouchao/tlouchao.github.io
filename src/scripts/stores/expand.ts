import { map } from 'nanostores'

interface ExpandInterface {
    [key: string]: boolean,
}

export const $expand = map<ExpandInterface>(
    { 
        gallery: true,
    }
)