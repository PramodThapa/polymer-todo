import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc
} from "firebase/firestore";
import { firebaseConfig } from "../../config.js";

//initilize app
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { db, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, getDoc };
