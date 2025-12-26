import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { db } from "../firebase";

const WISHLIST_COLLECTION = "wishlist";

// Add bike to wishlist in Firebase
export const addToWishlistFirebase = async (bike) => {
  try {
    const wishlistCollection = collection(db, WISHLIST_COLLECTION);
    const docRef = await addDoc(wishlistCollection, {
      bikeId: bike.id,
      name: bike.name,
      description: bike.description,
      price: bike.price,
      range: bike.range,
      maxSpeed: bike.maxSpeed,
      battery: bike.battery,
      image: bike.image,
      addedAt: new Date().toISOString()
    });
    console.log("Added to wishlist with ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding to wishlist: ", error);
    return { success: false, error: error.message };
  }
};

// Remove bike from wishlist in Firebase
export const removeFromWishlistFirebase = async (bikeId) => {
  try {
    const wishlistCollection = collection(db, WISHLIST_COLLECTION);
    const q = query(wishlistCollection, where("bikeId", "==", bikeId));
    const querySnapshot = await getDocs(q);
    
    const deletePromises = [];
    querySnapshot.forEach((document) => {
      deletePromises.push(deleteDoc(doc(db, WISHLIST_COLLECTION, document.id)));
    });
    
    await Promise.all(deletePromises);
    console.log("Removed from wishlist");
    return { success: true };
  } catch (error) {
    console.error("Error removing from wishlist: ", error);
    return { success: false, error: error.message };
  }
};

// Get all wishlist items from Firebase
export const getWishlistFromFirebase = async () => {
  try {
    const wishlistCollection = collection(db, WISHLIST_COLLECTION);
    const querySnapshot = await getDocs(wishlistCollection);
    
    const wishlist = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      wishlist.push({
        id: data.bikeId,
        name: data.name,
        description: data.description,
        price: data.price,
        range: data.range,
        maxSpeed: data.maxSpeed,
        battery: data.battery,
        image: data.image,
        firebaseId: doc.id
      });
    });
    
    return { success: true, wishlist };
  } catch (error) {
    console.error("Error getting wishlist: ", error);
    return { success: false, error: error.message, wishlist: [] };
  }
};
