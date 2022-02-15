import "@polymer/polymer/lib/elements/dom-if";
import "@polymer/polymer/lib/elements/dom-repeat";
import { PolymerElement, html } from "@polymer/polymer";

import {
  getTodoList,
  deleteTodo,
  updateTodo,
} from "../services/todoService.js";

import "./input-element.js";

class MyElement extends PolymerElement {
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
       * Binded with child element (input-element.js)
       *
       * @type {String}
       */
      inputText: {
        type: String,
        value: "",
      },

      /**
       * List of todos.
       * 
       * Binded with child element (input-element.js)
       * 
       * @type {Array}
       */
      todoList: {
        type: Array,
        notify: true,
        value() {
          return [];
        },
        observer: (todoList) => {
        },
      },
    };
  }

  /**
   * Use for one-time configuration of your component after local DOM is initialized.
   */
  ready() {
    super.ready();
    getTodoList().then((todos) => {
      this.todoList = todos;
      console.log(this.todoList);
    });
  }

  /**
   * Function to check if todo is completed or not.
   * 
   * @param {*} item || todo item
   * 
   * @returns {Boolean}
   */
  isCompleted(item) {
    return item.completed === false;
  }

  /**
   * Function to execute when delete button is clicked
   * 
   * @param {*} e || event
   */
  onDeleteButtonClick(e) {
    const todoID = e.target.dataset.item;
    deleteTodo(todoID).then(() => {
      getTodoList().then((todos) => {
        this.todoList = todos;
      });
    });
  }

  /**
   * Function to handle css class 
   * 
   * @param {*} completed || todo completed status
   * 
   * @returns {String} || name of css class
   */
  getClasses(completed) {
    if (completed) return "completed";
  }

  /**
   * Function executed when checkbox is clicked
   * 
   * @param {*} e || event 
   */
  onCheckBoxClick(e) {
    const todoID = e.target.name;
    updateTodo(todoID).then(() => {
      getTodoList().then((todos) => {
        this.todoList = todos;
      });
    });
  }

  static get template() {
    return html`
      <style>
        .text {
        }
        .completed {
          color: red;
          text-decoration: line-through;
        }
      </style>

      <input-element
        id="input"
        search-text="{{inputText}}"
        todo-list="{{todoList}}"
      >
      </input-element>

      <template is="dom-repeat" items="{{todoList}}">
        <div>
          Task:
          <span class$="[[getClasses(item.completed)]]">{{item.task}}</span>
          <span
            ><button on-click="onDeleteButtonClick" data-item$="{{item.id}}">
              Delete
            </button>
          </span>
          <span
            ><input
              type="checkbox"
              name="[[item.id]]"
              checked="{{item.completed}}"
              on-change="onCheckBoxClick"
          /></span>
        </div>
      </template>
    `;
  }
}

/**
 * Defining and register component as 'my-element'
 */
customElements.define("my-element", MyElement);
