import "@polymer/polymer/lib/elements/dom-if";
import "@polymer/polymer/lib/elements/dom-repeat";
import { PolymerElement, html } from "@polymer/polymer";

import "@firefly-elements/polymerfire/firebase-app";
import "@firefly-elements/polymerfire/firebase-document";

import "./input-element.js";

class MyElement extends PolymerElement {
  static get properties() {
    return {
      inputText: {
        type: String,
        value: "Hello",
      },

      todoList: {
        type: Array,
        notify: true,
        value() {
          return [
            {
              id: "0",
              task: "Task number 1",
              completed: true,
            },
            {
              id: "1",
              task: "Task number 2",
              completed: false,
            },
            {
              id: "2",
              task: "Task number 3",
              completed: true,
            },
            {
              id: "3",
              task: "Task number 4",
              completed: false,
            },
          ];
        },
        observer: (todoList) => {
          //console.log(todoList);
        },
      },
      todo: {
        type: Array,
        notify: true,
        value() {
          return [
            {
              id: "1",
              task: "Local Task",
              completed: false,
            },
          ];
        },
        observer: (oldValue, newValue) => {
          console.log(oldValue, newValue);
        },
      },
    };
  }

  isCompleted(item) {
    return item.completed === false;
  }

  onDeleteButtonClick(e) {
    const todoID = e.target.dataset.item;
    this.todoList = this.todoList.filter((list) => list.id != todoID);
  }

  getClasses(completed) {
    if (completed) return "completed";
  }

  onCheckBoxClick(e) {
    const todoID = e.target.name;
    this.todoList = this.todoList.map((todo) => {
      if (todoID === todo.id) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
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

      <firebase-app
        auth-domain="polymer-todo-42aa3.firebaseapp.com"
        api-key="AIzaSyAR0Bo7tnkvT7moG0QgtBgepCaU-ly2IQc"
        storage-bucket="polymer-todo-42aa3.appspot.com"
        messaging-sender-id="1003234327453"
        projectId="polymer-todo-42aa3"
        appId="1:1003234327453:web:a1c9aafc19da705bb14d74"
        measurementId="G-ECMKX89VWY"
      ></firebase-app>

      <firebase-document path="/todo" data="{{todo}}">
      </firebase-document>

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

customElements.define("my-element", MyElement);
