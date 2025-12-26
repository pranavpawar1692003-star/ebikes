import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

// Save a new ride to Firebase
export const saveRideToFirebase = async (rideData) => {
    try {
        const ridesCollection = collection(db, "rides");
        const docRef = await addDoc(ridesCollection, {
            ...rideData,
            createdAt: new Date().toISOString(),
            timestamp: Date.now()
        });
        console.log("Ride saved with ID: ", docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error saving ride: ", error);
        return { success: false, error: error.message };
    }
};

// Get all rides from Firebase
export const getRidesFromFirebase = async () => {
    try {
        const ridesCollection = collection(db, "rides");
        const q = query(ridesCollection, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const rides = [];
        querySnapshot.forEach((doc) => {
            rides.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return { success: true, rides };
    } catch (error) {
        console.error("Error getting rides: ", error);
        return { success: false, error: error.message, rides: [] };
    }
};
