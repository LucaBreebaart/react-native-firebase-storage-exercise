import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage, db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Function to upload image to Firebase Storage and save metadata to Firestore
export const handleUploadOfImage = async (uri, title) => {
    try {
        // Convert URI to Blob
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        const fileName = `${title}-${Date.now()}.jpg`; // Generate a unique file name
        const imageRef = ref(storage, fileName);
        await uploadBytes(imageRef, blob);

        blob.close();

        const downloadURL = await getDownloadURL(imageRef);

        const docRef = await addDoc(collection(db, "images"), {
            title: title,
            imageUrl: downloadURL,
            timestamp: serverTimestamp(),
        });

        console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.error("Error uploading image and saving to Firestore: ", error);
    }
};
