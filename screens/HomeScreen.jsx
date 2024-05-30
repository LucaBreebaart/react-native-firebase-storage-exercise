import { Pressable, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const HomeScreen = ({ navigation }) => {
    const [latestImage, setLatestImage] = useState(null);
    const [latestTitle, setLatestTitle] = useState('');

    useEffect(() => {
        const fetchLatestImage = async () => {
            try {
                const imagesRef = collection(db, 'images');
                const q = query(imagesRef, orderBy('timestamp', 'desc'), limit(1));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const latestDoc = querySnapshot.docs[0];
                    setLatestImage(latestDoc.data().imageUrl);
                    setLatestTitle(latestDoc.data().title);
                }
            } catch (error) {
                console.error("Error fetching latest image: ", error);
            }
        };

        fetchLatestImage();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Pressable onPress={() => navigation.navigate("Add")}>
                <Text>Add</Text>
            </Pressable>

            {/* Card of your images that you need to loop through */}
            <View style={styles.card}>
                {latestImage ? (
                    <>
                        <Image style={styles.img} source={{ uri: latestImage }} />
                        <Text>{latestTitle}</Text>
                    </>
                ) : (
                    <Text>Loading...</Text>
                )}
            </View>
        </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    card: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20,
    },
    img: {
        width: '100%',
        height: 200,
        objectFit: 'cover',
    },
});
