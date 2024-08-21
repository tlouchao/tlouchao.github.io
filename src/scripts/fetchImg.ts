import { v2 as cloudinary } from 'cloudinary';

const cloudName = import.meta.env.PUBLIC_CLOUD_NAME;
const cloudPrefix = import.meta.env.PUBLIC_CLOUD_PREFIX;
const apiKey = await import.meta.env.CLOUD_API_KEY;
const apiSecret = await import.meta.env.CLOUD_API_SECRET;

// Return "https" URLs by setting secure ro true
let cconfig = cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
});

const fetchImg = async function(prefix : string) : Promise<string[] | void> {

    interface ResponseInterface {
        resources: { public_id: string }[],
    }

    let options = {
        prefix: prefix,
        type: 'upload',
        max_results: 50,
    };
    
    let publicIds = cloudinary.api.resources(options)
        .then((response : ResponseInterface) => {
            return response['resources']?.map(r => r['public_id']);
        })
        .catch((err) => {
            console.log(err);
        });
    
    return publicIds;
}

export const publicIds = await fetchImg(cloudPrefix);
