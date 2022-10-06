import admin from "firebase-admin";
import serviceAccount from "./firebase-config/service-account.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const auth = admin.auth();
export const db = admin.firestore();

export const Routes = db.collection("Routes");
export const Users = db.collection("Users");