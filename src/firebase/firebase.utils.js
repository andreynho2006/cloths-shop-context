import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBrnBTVa2uCaAFpxM4fMlzmp9Wb3VJRbIE',
  authDomain: 'cloths-db.firebaseapp.com',
  databaseURL: 'https://cloths-db.firebaseio.com',
  projectId: 'cloths-db',
  storageBucket: 'cloths-db.appspot.com',
  messagingSenderId: '104942340413',
  appId: '1:104942340413:web:3caf3dd0781afb53f61d54',
  measurementId: 'G-N1F000TZYB'
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
