import { PolymerElement, html } from "@polymer/polymer";
import "@polymer/polymer/lib/elements/dom-if";
import "@polymer/polymer/lib/elements/dom-repeat";

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
              id: '0',
              task: "Task number 1",
              completed: true,
            },
            {
              id: '1',
              task: "Task number 2",
              completed: false,
            },
            {
              id: '2',
              task: "Task number 3",
              completed: true,
            },
            {
              id: '3',
              task: "Task number 4",
              completed: false,
            },
          ];
        },
        observer: (todoList) => {
          console.log(todoList)
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

  onCheckBoxClick(e){
    const todoID = e.target.name;
    this.todoList = this.todoList.map((list)=>{
      if(todoID === list.id){
        list.completed = !list.completed;
        return list
      }else{
        return list
      }
    })
    console.log(this.todoList)
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
            <span><button on-click="onDeleteButtonClick" data-item$="{{item.id}}">
                Delete
              </button>
            </span>
            <span><input type ='checkbox' name ='[[item.id]]' checked ="{{item.completed}}" on-change='onCheckBoxClick'></span>
        </div>
      </template>
    `;
  }
}


customElements.define("my-element", MyElement);
