import {
  db,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "../firebase/connection.js";

/**
 * Function that add todo to the firestore
 *
 * @param {*} todo || @param @type {Object} || todo object to add in firestore
 */
async function addToDo(todo) {
  try {
    const docRef = await addDoc(collection(db, "todo"), todo);

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

/**
 * Function that return documents from firestore
 *
 * @returns {Object} || todo object
 */
async function getTodoList() {
  let todoList = [];
  try {
    const querySnapshot = await getDocs(collection(db, "todo"));
    querySnapshot.forEach((todo) => {
      todoList.push({
        id: todo.id,
        task: todo.data().task,
        completed: todo.data().completed,
      });
    });
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
  return todoList;
}

/**
 * Function that deletes document from the collection
 *
 * @param {*} documentName || @param @type {String} || Document name inside collection that you want to delete
 */
async function deleteTodo(documentName) {
  try {
    await deleteDoc(doc(db, "todo", documentName));
  } catch (e) {
    console.log("Error deleting document:", e);
  }
}

/**
 * Function that updates document field with repective documentName
 *
 * @param {*} documentName || @param @type {String} || Document name inside collection that you wants to update.
 */
async function updateTodo(documentName) {
  try {
    const todo = await getDoc(doc(db, "todo", documentName));
    await updateDoc(doc(db, "todo", documentName), {
      completed: !todo.data().completed,
    });
  } catch (e) {
    console.log("Error updating document:", e);
  }
}

export { addToDo, getTodoList, deleteTodo, updateTodo };
