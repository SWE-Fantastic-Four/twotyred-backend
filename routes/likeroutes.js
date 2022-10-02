import admin from "firebase-admin";

const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.likeRoute = functions.https.onCall((data, context) => {
    if (!context) {
        throw new functions.https.HttpsError(
            'you must be a registered user to like route'
        );
    }
    // get refs for user doc and route doc
    const user = admin.firestore().collection('Users').doc(context.username);
    const route = admin.firestore().collection('Routes').doc(data.id); // how to get id of a route?
    // how to tell likes to be an array?
    return user.get().then(doc => {
        // check that the user hasn't already liked the post
        if (doc.data().Likes.inclues(data.id)) {
            throw new functions.https.HttpsError(
                'You can ony like a post once',
            );
        }
        return user.update({
            Likes: [...doc.data().Likes, data.id]
        })
            .then(() => {
                return route.update({
                    Likes: admin.firestore.FieldValue.increment(1)
                });
        })
    })
})
