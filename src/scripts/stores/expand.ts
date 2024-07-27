import { map } from 'nanostores'

interface ExpandInterface {
    [key: string]: boolean,
}

export const $expand = map<ExpandInterface>(
    {
        navbar: false, 
        gallery: false,
    }
)