import url from 'url';
import path from 'path';

const cloudName = import.meta.env.PUBLIC_CLOUD_NAME;
const cloudHostname = import.meta.env.PUBLIC_CLOUD_HOSTNAME;

// Set img src to public URLs
let urlObj = {
    protocol: 'https',
    hostname: cloudHostname,
    pathname: '',
};

export type GalleryImageProp = {src: string, label: string};

export const transformImageProp = (publicId: string, transform: string) : GalleryImageProp => {
    urlObj.pathname = path.join(cloudName, transform, publicId);
    let label = path.parse(publicId).name;
    return {src: url.format(urlObj), label: label};
}

export const transformImageProps = (publicIds: string[], transform: string) : GalleryImageProp[] => {
    return publicIds.map(publicId => {
        return transformImageProp(publicId, transform);
    });
}
