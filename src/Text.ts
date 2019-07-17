import { ID } from "./helpers/randomId";

type CustomEvent = Event & MouseEvent;

interface IText {
  text: string;
  id: string;
  x: number;
  y: number;
  offsetW: number;
  offsetH: number;
  color: string;
  size: number;
}

interface TextDiv extends HTMLDivElement {
  width: number;
  height: number;
}

export class Text {
  addedText: IText[] = [];
  textInput: HTMLTextAreaElement | null = document.querySelector<
    HTMLTextAreaElement
  >("#text_input");
  addTextBtn: HTMLButtonElement | null = document.querySelector<
    HTMLButtonElement
  >("#add_text_btn");
  dragging: boolean = false;
  textSize: number = 16;
  textColor: string = "#ffffff";

  constructor(public canvas: HTMLCanvasElement, public ctx: any) {}

  addListeners = () => {
    if (this.addTextBtn) {
      this.addTextBtn.addEventListener("click", () => this.addText());
    }

    const handleEvent = (e: Event): void => {
      switch (e.type) {
        case "click":
          console.log("Hey you clicked " + e.target);
          break;

        case "mousedown":
          this.dragging = true;
          console.log(this.dragging);
          break;
        case "mouseup":
          this.dragging = false;
          this.updateTextCords(<CustomEvent>e, (e.target as Element).id);
          break;
        case "mouseleave":
          this.dragging = false;
          this.updateTextCords(<CustomEvent>e, (e.target as Element).id);
          break;
        case "mousemove":
          if (this.dragging) {
            this.moveText(<CustomEvent>e);
            this.updateTextCords(<CustomEvent>e, (e.target as Element).id);
          }
          break;
        case "dblclick":
          this.deleteText((e.target as Element).id);
          break;
        default:
          return;
      }
    };

    const textsAdded = document.querySelectorAll(".added_text");

    textsAdded.forEach((text: Node) => {
      "click mousedown mouseup mouseleave mousemove dblclick"
        .split(" ")
        .map(name => {
          text.addEventListener(name, handleEvent, false);
        });
    });

    const changeTextSizeBtns = document.querySelectorAll(".change_ts");

    changeTextSizeBtns.forEach((button: Node) => {
      button.addEventListener("click", (e: any) =>
        this.changeTextSize(parseInt(e.target.textContent))
      );
    });

    const changeColor = document.querySelector<HTMLInputElement>(
      "#text_color_input"
    );

    changeColor &&
      changeColor.addEventListener("change", (e: any) => {
        this.changeTextColor(e.target.value);
      });
  };

  addText = (): void => {
    if (this.textInput) {
      if (this.textInput.value === "") return;
      const body = document.querySelector<HTMLBodyElement>("body");
      const centerX = body && body.clientWidth / 2;
      const centerY = body && body.clientHeight / 2;

      if (centerX && centerY) {
        const newText: IText = {
          text: this.textInput.value,
          id: ID(),
          x: centerX,
          y: centerY,
          offsetW: 0,
          offsetH: 0,
          color: this.textColor,
          size: this.textSize
        };

        const newAddedText = document.createElement("div");

        newAddedText.classList.add("added_text");

        newAddedText.id = newText.id;
        newAddedText.style.left = `${newText.x}px`;
        newAddedText.style.top = `${newText.y}px`;
        newAddedText.style.color = newText.color;
        newAddedText.style.fontSize = `${newText.size}px`;
        newAddedText.textContent = newText.text;
        newAddedText.draggable = false;

        body && body.appendChild(newAddedText);
        const newTextDom: HTMLDivElement | null = document.querySelector(
          `#${newText.id}`
        );

        if (newTextDom) {
          newText.offsetW = newTextDom && newTextDom.offsetWidth;
          newText.offsetH = newTextDom && newTextDom.offsetHeight;
        }

        this.addListeners();
        this.addedText.push(newText);

        this.textInput.value = "";
      }
    }
  };

  moveText = (e: MouseEvent): void => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const text: any = e.target;
    console.log(text.offsetHeight, text.offsetWidth);
    if (text && this.dragging) {
      text.style.left = `${mouseX - text.offsetWidth / 2}px`;
      text.style.top = `${mouseY - text.offsetHeight / 2}px`;
    }
  };

  updateTextCords = (e: CustomEvent, id: string): void => {
    const { left, top } = this.canvas.getBoundingClientRect();

    const updatedText = e.target as HTMLDivElement;
    const mouseX = e.clientX - updatedText.offsetWidth / 2 - e.offsetX / 2;
    const mouseY = e.clientY + updatedText.offsetHeight / 2 - e.offsetY / 2;

    const newTexts = this.addedText.map(
      (text: IText): IText => {
        if (id === text.id) {
          text.x = updatedText.offsetLeft - left;
          text.y = updatedText.offsetTop - top + updatedText.offsetHeight;
        }
        return text;
      }
    );
    this.addedText = newTexts;
  };

  deleteText = (id: string) => {
    const filterdTexts = this.addedText.filter((text: IText) => {
      return text.id !== id;
    });

    this.addedText = filterdTexts;

    const text = document.querySelector<HTMLDivElement>(`#${id}`);
    text && text.remove();
  };

  changeTextSize = (size: number): void => {
    this.textSize = size;
  };

  changeTextColor = (color: string): void => {
    this.textColor = color;
  };
}
