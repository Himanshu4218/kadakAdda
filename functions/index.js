const functions = require('firebase-functions');
const admin = require("firebase-admin");
const express = require("express");
const app = express();
admin.initializeApp();

app.get("/",(req,res) => {
    res.send("Home Page");
});

exports.addToCart = functions.https.onCall((data,context) => {
    if(!context.auth){
        throw new functions.https.HttpsError(
            'unauthenticated',
            'You have to login first'
        );
    }
    if(data.availability === false){
        throw new functions.https.HttpsError(
            'unavailable',
            'This Product is not available'
        );
    }
    title = data.title;
    return  admin.firestore().collection("user").doc(context.auth.uid).update({
                cart:{
                    title: 1
                }
            });
}); 

exports.addAddress = functions.https.onCall((data,context) => {
    if(!context.auth){
        throw new functions.https.HttpsError(
            'unauthenticated',
            'You have to login first'
        );
    }
    return admin.firestore().collection("user").doc(context.auth.uid).set({
        address: [
            Country = data.country,
            FullName = data.fullname,
            Street = data.street,
            HouseNo = data.houseNo,
            Pincode = data.pincode,
            City = data.city,
            State = data.state
        ]
    });

});

exports.increment = functions.https.onCall((data,context) => {
    if(!context.auth){
        throw new functions.https.HttpsError(
            'unauthenticated',
            'You have to login first'
        );
    }
    title = data.title;
    return admin.firestore.collection("user").doc(context.auth.uid).update({
        cart: {
            title: admin.firestore.FieldValue.increment(1)
        }
    });
});
exports.decrement = functions.https.onCall((data,context) => {
    if(!context.auth){
        throw new functions.https.HttpsError(
            'unauthenticated',
            'You have to login first'
        );
    }
    title = data.title;
    return admin.firestore.collection("user").doc(context.auth.uid).update({
        cart: {
            title: admin.firestore.FieldValue.decrement(1)
        }
    });
}); 

exports.KadakAdda = functions.https.onRequest(app);
 
