import { PolymerElement, html } from "@polymer/polymer";
import { idGenerator } from "../utils/id-generator.js";

class InputElement extends PolymerElement {
  static get properties() {
    return {
      searchText: {
        type: String,
        notify: true,
      },
      todoList: {
        type: Object,
        notify: true,
        observer: (todoList) => {},
      },
    };
  }

  handleInputChange(e) {
    this.searchText = e.target.value;
  }

  onAddButtonClick(e) {
    this.todoList = [
      ...this.todoList,
      { id: idGenerator(), task: this.searchText, completed: false },
    ];
  }

  static get template() {
    return html` <input type="text" on-input="handleInputChange" />
      <span><button on-click="onAddButtonClick">ADD</button></span>`;
  }
}

customElements.define("input-element", InputElement);
