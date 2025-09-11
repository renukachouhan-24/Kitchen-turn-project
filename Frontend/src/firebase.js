// filepath: /home/ng/Kitchen-turn-project/Frontend/src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDFOVAWEiDi7s-dIqHbNhsCRcw4y4AF6Jc",
  authDomain: "ng-kitchen-turn.firebaseapp.com",
  projectId: "ng-kitchen-turn",
  storageBucket: "ng-kitchen-turn.firebasestorage.app",
  messagingSenderId: "404711981234",
  appId: "1:404711981234:web:b12f59411a610c0115c9ab",
  measurementId: "G-W7JCVRMGJN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };