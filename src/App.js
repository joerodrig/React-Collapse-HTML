import React, {Component} from "react";
import CollapseHTML from "./CollapseHTML.js.jsx";

export class App extends Component {
  render() {
    var container = document.createElement("div");
    var firstChild = document.createElement("p");
    var firstChildTxt = document.createTextNode(`
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Pellentesque aliquam ultricies magna, id lobortis quam condimentum non.
      Suspendisse dui lacus, consectetur a efficitur ac, viverra eget sem.
      Vivamus molestie dui eu quam elementum, id finibus leo pretium.
      Fusce luctus ullamcorper lorem, id convallis massa placerat commodo.
      Nulla fringilla ligula non justo aliquam egestas. Donec ut nunc nisi.
      Curabitur interdum sit amet massa vel mollis.
    `);

    container.appendChild(firstChild);
    firstChild.appendChild(firstChildTxt);

    return (
      <div>
          <h1>Truncated text...</h1>
          <CollapseHTML
            html={container}
            charLimit={80}
            containerClass="truncate-html-container"
            innerClass="truncate-html-container-innerclass"
            innerClass="truncate-html-container-innerclass"
            buttonToggleClass="clickable-button"
            targetElement="p"
          />
      </div>
    );
  }
}
