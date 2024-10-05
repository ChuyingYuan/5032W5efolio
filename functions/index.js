const functions = require("firebase-functions/v2");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

// Initialize the Firebase admin SDK
admin.initializeApp();

// HTTPS function for counting books
exports.countBooks = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;

      res.status(200).send({count});
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});

// HTTPS function for adding a book
exports.addBook = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      // Ensure it's a POST request
      if (req.method !== "POST") {
        return res.status(405).send("Method Not Allowed");
      }

      const {title, author} = req.body;

      // Validate input
      if (!title || !author) {
        return res.status(400).send("Title and author are required");
      }

      const booksCollection = admin.firestore().collection("books");

      // Add the new book to the Firestore collection
      await booksCollection.add({title, author});

      res.status(201).send("Book added successfully");
    } catch (error) {
      console.error("Error adding book:", error.message);
      res.status(500).send("Error adding book");
    }
  });
});

exports.getBooks = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const books = snapshot.docs.map((doc) => doc.data());

      res.status(200).send(books);
    } catch (error) {
      console.error("Error getting books:", error.message);
      res.status(500).send("Error getting books");
    }
  });
});
