import { v2 as cloudinary } from 'cloudinary'
import axios from 'axios'
import path from 'path'
import url from 'url'

const cloudName = import.meta.env.PUBLIC_CLOUD_NAME;
const cloudHostname = import.meta.env.PUBLIC_CLOUD_HOSTNAME;
const cloudPrefix = import.meta.env.PUBLIC_CLOUD_PREFIX;
const apiKey = import.meta.env.CLOUD_API_KEY;
const apiSecret = import.meta.env.CLOUD_API_SECRET;

// Return "https" URLs by setting secure to true
cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
});

//--------------------------------Fetch Images-------------------------------//

interface AssetInterface {
    public_id: string,
    version: number,
    format: string,
}

interface ResponseInterface {
    resources: AssetInterface[],
}

var fetchImg = async function(prefix : string) : Promise<string[] | void> {

    // Make sure that this function is executed once
    var fetchImgExecuted = false;
    if (fetchImgExecuted) return;

    let validAssets : AssetInterface[] = [];

    // Fetch the images given some prefix
    const options = {prefix: prefix, type: 'upload'};
    let assets = await cloudinary.api.resources(options)
        .then((response : ResponseInterface) => {
            return response['resources']?.map(r => {
                return {public_id: r['public_id'], 
                        version: r['version'],
                        format: r['format']};
            })
        })
        .catch((err) => {})

    // Get valid images with status code 200
    if (assets) {

        let urlObj = {
            protocol: 'https',
            hostname: cloudHostname,
            pathname: '',
        };

        let predicate = async(url : string) : Promise<boolean> => {
            return axios.head(url)
                .then((response) => response.status == 200)
                .catch((err) => false);
        };

        // Boolean mask with predicate
        await Promise.all(
            assets.map(async(a) => {
                urlObj.pathname = path.join(cloudName, 'v' + a.version.toString(), a.public_id + '.' + a.format);
                return predicate(url.format(urlObj));
            }))
            .then((response : boolean[]) => {
                validAssets = assets.filter((_, idx) => response[idx]);
            })
            .catch((err) => {});
    }

    // Make sure that this function is executed once
    fetchImgExecuted = true;
    
    // Return the filtered images
    return (validAssets) ? validAssets?.map(a => a.public_id) : assets?.map(a => a.public_id);
}

export const publicIds : string[] | void = await fetchImg(cloudPrefix);
