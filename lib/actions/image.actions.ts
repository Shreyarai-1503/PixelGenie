"use server"

import { revalidatePath } from "next/cache";
import Image from "../db/models/image.model";
import User from "../db/models/user.model";
import { connectToDatabase } from "../db/mongoose"
import { handleError } from "../utils"
import { redirect } from "next/navigation";
import { v2 as cloudinary } from "cloudinary";

const populateUser = (query: any) => query.populate({
    path: 'author',
    model: User,
    select: '_id firstName lastName clerkId'
})

//ADD IMAGE
export async function addImage({ image, userId, path }: AddImageParams) {
    try {
        await connectToDatabase();

        const author = await User.findById(userId);

        if (!author) {
            throw new Error("User not found");
        }

        const newImage = await Image.create({
            ...image,
            user: author._id
        })

        revalidatePath(path);  //revalidate path to show new image that was created

        return JSON.parse(JSON.stringify(newImage));
    } catch (error) {
        handleError(error);
    }
}

//UPDATE IMAGE
export async function updateImage({ image, userId, path }: UpdateImageParams) {
    try {
        await connectToDatabase();

        const imageToUpdate = await Image.findById(image._id);

        if (!imageToUpdate || imageToUpdate.author.toHexString() !== userId) {
            throw new Error("Unauthorized or image not found");
        }

        const updatedImage = await Image.findOneAndUpdate(
            imageToUpdate._id,
            image,
            { new: true }
        )

        revalidatePath(path);

        return JSON.parse(JSON.stringify(updatedImage));
    } catch (error) {
        handleError(error);
    }
}

//DELETE IMAGE
export async function deleteImage(imageId: string) {
    try {
        await connectToDatabase();

        await Image.findByIdAndDelete(imageId);
    } catch (error) {
        handleError(error);
    } finally {
        redirect('/');
    }
}

//GET IMAGE
export async function getImage(imageId: string) {
    try {
        await connectToDatabase();

        const image = await populateUser(Image.findById(imageId));  //to get image as well as author

        if (!image) {
            throw new Error("Image not found");
        }

        return JSON.parse(JSON.stringify(image));
    } catch (error) {
        handleError(error);
    }
}

//GET ALL IMAGES
export async function getAllImages({ page = 1, searchQuery = '', limit = 9 }: { page: number, searchQuery?: string, limit?: number }) {
    try {
        await connectToDatabase();

        cloudinary.config({
            cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true
        });

        let exp = 'folder=pixelgenie'

        if (searchQuery) {
            exp += ` AND ${searchQuery}`
        }

        const { resources } = await cloudinary.search.expression(exp).execute();

        const resourceIds = resources.map((resource: any) => resource.public_id);

        let query = {}

        if (searchQuery) {  //Constructs a query object based on the search results, suitable for further filtering or database operations.
            query = {
                publicId: {
                    $in: resourceIds
                }
            }
        }

        //pagination
        const skipAmount = (Number(page) - 1) * limit;
        const images = await populateUser(Image.find(query))
            .sort({ updatedAt: -1 })  //new on top
            .skip(skipAmount)
            .limit(limit)

        const totalImages = await Image.find(query).countDocuments();  //Finds all documents matching the given query and counts them.
        const savedImages = await Image.find().countDocuments();  //images stored in the collection, regardless of any filtering criteria. This provides a count of all images in the database.

        return {
            data: JSON.parse(JSON.stringify(images)),
            totalPage: Math.ceil(totalImages / limit),
            savedImages,
        }
    } catch (error) {
        handleError(error);
    }
}

//GET USER'S IMAGES
export async function getUserImages({ page = 1, userId, limit = 9 }: { page?: number, userId?: string, limit?: number }) {
    try {
        await connectToDatabase();
        
        const skipAmount = (Number(page) - 1) * limit;
        const images = await populateUser(Image.find({ author: userId }))
            .sort({ updatedAt: -1 })  //new on top
            .skip(skipAmount)
            .limit(limit)

        const totalImages = await Image.find({ author: userId }).countDocuments();

        return {
            data: JSON.parse(JSON.stringify(images)),
            totalPage: Math.ceil(totalImages / limit),
        }
    } catch (error) {
        handleError(error);
    }
}