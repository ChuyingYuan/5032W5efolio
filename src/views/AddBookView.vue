<template>
    <div>
      <h1>Add Book</h1>
      <form @submit.prevent="addBook">
        <div>
          <label for="isbn">ISBN:</label>
          <input type="text" v-model="isbn" id="isbn" required />
        </div>
        <div>
          <label for="name">Name:</label>
          <input type="text" v-model="name" id="name" required />
        </div>
        <button type="submit">Add Book</button>
      </form>
  
      <h2>Order Books By:</h2>
      <select v-model="orderBy" @change="fetchBooks">
        <option value="isbn">ISBN</option>
        <option value="name">Name</option>
      </select>
  
      <h1>Book List</h1>
      <ul>
        <li v-for="book in books" :key="book.id">
          {{ book.name }} - ISBN: {{ book.isbn }}
          <button @click="deleteBook(book.id)">Delete</button>
          <button @click="updateBook(book.id)">Update</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import db from '../firebase';
  import { collection, addDoc, getDocs, query, where, orderBy, limit, updateDoc, deleteDoc, doc } from 'firebase/firestore';
  
  export default {
    setup() {
      const isbn = ref('');
      const name = ref('');
      const books = ref([]);
      const orderByField = ref('isbn'); // Default order by 'isbn'
  
      // Function to add a book
      const addBook = async () => {
        try {
          const isbnNumber = Number(isbn.value);
          if (isNaN(isbnNumber)) {
            alert('ISBN must be a valid number');
            return;
          }
  
          await addDoc(collection(db, 'books'), {
            isbn: isbnNumber,
            name: name.value
          });
  
          isbn.value = '';
          name.value = '';
          alert('Book added successfully!');
          fetchBooks(); // Refresh the book list after adding
        } catch (error) {
          console.error('Error adding book: ', error);
        }
      };
  
      // Function to fetch books with queries
      const fetchBooks = async () => {
        try {
          const q = query(
            collection(db, 'books'),
            where('isbn', '>', 1000), // Example condition
            orderBy(orderByField.value),   // Corrected use of orderBy with the dynamic field
            limit(10)
          );
          const querySnapshot = await getDocs(q);
          const booksArray = [];
          querySnapshot.forEach((doc) => {
            booksArray.push({ id: doc.id, ...doc.data() });
          });
          books.value = booksArray;
        } catch (error) {
          console.error('Error fetching books: ', error);
        }
      };
  
      // Function to update a book
      const updateBook = async (id) => {
        try {
          const newName = prompt('Enter new name for the book:');
          if (newName) {
            const bookRef = doc(db, 'books', id);
            await updateDoc(bookRef, { name: newName });
            alert('Book updated successfully!');
            fetchBooks(); // Refresh the book list after updating
          }
        } catch (error) {
          console.error('Error updating book: ', error);
        }
      };
  
      // Function to delete a book
      const deleteBook = async (id) => {
        try {
          const bookRef = doc(db, 'books', id);
          await deleteDoc(bookRef);
          alert('Book deleted successfully!');
          fetchBooks(); // Refresh the book list after deleting
        } catch (error) {
          console.error('Error deleting book: ', error);
        }
      };
  
      // Fetch books on component mount
      onMounted(() => {
        fetchBooks();
      });
  
      return {
        isbn,
        name,
        books,
        orderByField,
        addBook,
        updateBook,
        deleteBook,
        fetchBooks
      };
    }
  };
  </script>
  