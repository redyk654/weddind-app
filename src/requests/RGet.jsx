import firebase from "../firebase";

export async function fetchEvents(userId) {
    const db = firebase.firestore();
    const eventsRef = db.collection('evenements');
    const snapshot = await eventsRef.where('userId', '==', userId).get();
    if (snapshot.empty) {
        return [];
    }
    const tempList = []
    snapshot.forEach(doc => {
        tempList.push({ id: doc.id, data: doc.data() });
    });
    return tempList
}