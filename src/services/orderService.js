import { collection, addDoc, getDocs, query, orderBy, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

// Save order to Firebase
export const saveOrderToFirebase = async (orderData) => {
  try {
    const ordersCollection = collection(db, "orders");
    const docRef = await addDoc(ordersCollection, {
      ...orderData,
      createdAt: new Date().toISOString(),
      status: "completed"
    });
    console.log("Order saved with ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving order: ", error);
    return { success: false, error: error.message };
  }
};

// Get all orders from Firebase
export const getOrdersFromFirebase = async () => {
  try {
    const ordersCollection = collection(db, "orders");
    const q = query(ordersCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return { success: true, orders };
  } catch (error) {
    console.error("Error getting orders: ", error);
    return { success: false, error: error.message, orders: [] };
  }
};

// Delete order from Firebase
export const deleteOrderFromFirebase = async (orderId) => {
  try {
    const orderDoc = doc(db, "orders", orderId);
    await deleteDoc(orderDoc);
    return { success: true };
  } catch (error) {
    console.error("Error deleting order: ", error);
    return { success: false, error: error.message };
  }
};
