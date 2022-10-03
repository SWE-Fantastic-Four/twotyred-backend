import admin from "firebase-admin";

const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.favouriteRoute = functions.https.onCall(async (data, context) => {
  if (!context) {
    throw new functions.https.HttpsError(
      "you must be a registered user to like route"
    );
  }
  // get refs for user doc and route doc
  const user = admin.firestore().collection("Users").doc(context.username);
  const doc = await user.get();
  if (doc.data().Favourites.includes(data.id)) {
    throw new functions.https.HttpsError("You can only favourite a post once");
  }
  return user.update({
    Favourites: [...doc.data().Favourites, data.id],
  });
});
