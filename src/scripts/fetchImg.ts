import { v2 as cloudinary, type ResourceApiResponse } from 'cloudinary'
import { type PidInterface } from '../interface';

const cloudName = import.meta.env.PUBLIC_CLOUD_NAME;
const apiKey = import.meta.env.CLOUD_API_KEY;
const apiSecret = import.meta.env.CLOUD_API_SECRET;

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
});

interface AssetInterface extends PidInterface {
    secure_url: string,
}

//-----------------Helper function to validate URLS--------------------------//

const validateImg = async function(assets : AssetInterface[]) : Promise<AssetInterface[]> {

    let validAssets : AssetInterface[] = [];

    if (assets) {

        let predicate = async(url : string) : Promise<boolean> => {
            try {
                let response = await fetch(url, { method: "HEAD"});
                return response.ok;
            } catch(err) {
                return false;
            }
        };

        // Boolean mask with predicate
        await Promise.all(
            assets.map(async(a) => predicate(a.secure_url)))
            .then((response : boolean[]) => validAssets = assets.filter((_, idx) => response[idx]))
            .catch((err) => {});
    }

    return validAssets;

}

//--------------------------------Fetch Images-------------------------------//

export const fetchImg = async function(prefix : string) : Promise<PidInterface[] | void> {

    // Make sure that this function is executed once
    var fetchImgExecuted = false;
    if (fetchImgExecuted) return;

    // Fetch the images given some prefix
    const options = {prefix: prefix, type: 'upload', tags: true};
    let assets = await cloudinary.api.resources(options)
        .then((response : ResourceApiResponse) => {
            return response['resources']?.map(r => {
                return {public_id: r['public_id'], 
                        tags: r['tags'],
                        secure_url: r['secure_url'],};
            })
        })
        .catch((err) => {})

    // Get valid images with status code 200
    if (assets) {
        let validAssets = await validateImg(assets);

        // Make sure that this function is executed once
        fetchImgExecuted = true;
        
        // Return the filtered images
        let res : PidInterface[] = [];
        if (validAssets) {
            validAssets.map(a => res.push({public_id: a.public_id, tags: a.tags}));
        } else {
            assets.map(a => res.push({public_id: a.public_id, tags: a.tags}));
        }
        return res;
    }
}
