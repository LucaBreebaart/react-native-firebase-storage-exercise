import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button, Image } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { handleUploadOfImage } from '../services/BucketService';

const AddScreen = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadImage = async () => {
        if (image && title) {
            try {
                await handleUploadOfImage(image, title);
                alert("Image uploaded successfully");
            } catch (error) {
                console.error("Error uploading image: ", error);
                alert("Failed to upload image");
            }
        } else {
            alert("Please provide both a title and an image.");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputField}
                placeholder="Memory Title"
                onChangeText={newText => setTitle(newText)}
                value={title}
            />
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <TouchableOpacity style={styles.button} onPress={uploadImage}>
                <Text style={styles.buttonText}>Add Memory</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddScreen;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff',
    },
    inputField: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    button: {
        backgroundColor: "green",
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
});
