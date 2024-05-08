import firebase from "../firebase";

export function authWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
}

export async function authWithEmailAndPassword(email, password) {
    email = email.trim();
    password = password.trim();
    return await firebase.auth().signInWithEmailAndPassword(email, password);
}

export async function authWithEmailAndPasswordCreateUser(email, password) {
    email = email.trim();
    password = password.trim();
    return await firebase.auth().createUserWithEmailAndPassword(email, password);
}

export async function authSignOut() {
    return await firebase.auth().signOut();
}

export async function storeUserInFirestore(user, displayName, email) {
    return await firebase.firestore().collection('users').doc(user.uid).set({
        displayName: displayName,
        email: email
    });
}