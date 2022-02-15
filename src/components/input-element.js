import { PolymerElement, html } from "@polymer/polymer";

import { addToDo, getTodoList } from "../services/todoService.js";

class InputElement extends PolymerElement {
  /**
   * Static function that sets the props for the component.
   *
   * @returns {object} || Object of proporties of component with respective key and value.
   */
  static get properties() {
    return {
      /**
       * Text of the input field to add todo.
       *
       * Binded with parent element (my-app.js)
       *
       * @type {String}
       */
      searchText: {
        type: String,
        notify: true,
      },

      /**
       * List of todos.
       *
       * Binded with parent element (my-app.js)
       *
       * @type {Array}
       */
      todoList: {
        type: Object,
        notify: true,
        observer: (todoList) => {},
      },
    };
  }

  /**
   * Function executed when input field is changed
   *
   * props 'searchText' is set
   *
   * @param {*} e | event
   */
  handleInputChange(e) {
    this.searchText = e.target.value;
  }

  /**
   * Function executed when add button is clicked
   *
   * @param {*} e || event
   */
  onAddButtonClick(e) {
    let todo = { task: this.searchText, completed: false };
    addToDo(todo).then(() => {
      getTodoList().then((todos) => {
        this.todoList = todos;
      });
    });
  }

  static get template() {
    return html` <input type="text" on-input="handleInputChange" />
      <span><button on-click="onAddButtonClick">ADD</button></span>`;
  }
}

/**
 * Defining and register component as 'imput-element'
 */
customElements.define("input-element", InputElement);
