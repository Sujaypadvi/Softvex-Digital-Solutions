/// <reference types="vite/client" />

// This file assumes the environment has process.env.API_KEY or similar
// For this demo context, we'll implement a Mock Firestore wrapper 
// if real config isn't provided, to ensure functionality.

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Standard Firebase Config template
const firebaseConfig = {
  apiKey: "DEMO_KEY",
  authDomain: "softvex-demo.firebaseapp.com",
  projectId: "softvex-demo",
  storageBucket: "softvex-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Helper for contacting
export const submitContactForm = async (data: any) => {
  try {
    // Use environment variable for API endpoint
    const apiEndpoint = import.meta.env.VITE_API_ENDPOINT || 'http://localhost:3001/api/contact';

    // Call the API
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit form');
    }

    const result = await response.json();
    console.log("Contact form submitted successfully:", result);
    return result.id || 'success';
  } catch (e: any) {
    console.error("Error submitting contact form:", e);

    // Fallback: Try to save to Firestore directly
    try {
      const docRef = await addDoc(collection(db, 'contacts'), {
        ...data,
        createdAt: Date.now()
      });
      console.log("Saved to Firestore as fallback");
      return docRef.id;
    } catch (firestoreError) {
      console.error("Firestore fallback failed:", firestoreError);

      // Final fallback: LocalStorage
      const submissions = JSON.parse(localStorage.getItem('softvex_contacts') || '[]');
      submissions.push({ ...data, id: Date.now().toString(), createdAt: Date.now() });
      localStorage.setItem('softvex_contacts', JSON.stringify(submissions));
      console.log("Saved to LocalStorage as final fallback");
      return "demo-id";
    }
  }
};

export const getContactSubmissions = async () => {
  try {
    const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    // Fallback
    const submissions = JSON.parse(localStorage.getItem('softvex_contacts') || '[]');
    return submissions.reverse();
  }
};
