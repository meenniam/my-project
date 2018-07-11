const admin = require('firebase-admin');
const serviceAccount = require('./projectmlm-81d99-firebase-adminsdk-nqwyi-57bdc70ff4.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


module.exports = db;
