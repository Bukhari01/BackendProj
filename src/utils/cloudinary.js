import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"



// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadCloudinary = async(localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //File has been uploaded
        console.log("File has been uplaoded on Cloudinary", response.url);
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath) //remove the locally saved temporary file if upload fails
        return null;
    }
}


export {uploadCloudinary};