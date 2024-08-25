import { type PidInterface, type GalleryItemInterface } from '../interface';
import { getLabel } from './utils';
import path from 'path';
import url from 'url';

const cloudName = import.meta.env.PUBLIC_CLOUD_NAME;
const cloudHostname = import.meta.env.PUBLIC_CLOUD_HOSTNAME;

// Set img src to public URLs
let urlObj = {
    protocol: 'https',
    hostname: cloudHostname,
    pathname: '',
};

export const transformImg = (assets: PidInterface[], transform: string) : GalleryItemInterface => {

    // Get transforms for public URLs
    let ret : GalleryItemInterface = { props: [], tags: [] };

    if (assets) {
        
        // add unique tags to set
        let stags : Set<string> = new Set<string>();
        assets.map(a => a.tags.map(t => stags.add(t)));
        ret.tags = Array.from(stags).map(t => getLabel(t));

        // transforms
        ret.props = assets.map(asset => {
            urlObj.pathname = path.join(cloudName, transform, asset.public_id);
            let label = path.parse(asset.public_id).name;
            return {src: url.format(urlObj), label: label, tags: asset.tags};
        });
    }

    return ret;
}
