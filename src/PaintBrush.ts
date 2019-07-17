type CustomEvent = Event & MouseEvent;

interface CustomButton extends HTMLButtonElement {
  textContent: string;
}

export class PaintBrush {
  painting: boolean = false;
  brushWidth: number = 5;
  brushColor: string = "#37ccc9";
  changeWidthBtns: NodeList = document.querySelectorAll(".change_bw");
  changeColor: HTMLInputElement | null = document.querySelector<
    HTMLInputElement
  >(".change_bc");

  constructor(public canvas: HTMLCanvasElement, public ctx: any) {}

  addListeners = (): void => {
    const handleEvent = (e: Event): void => {
      switch (e.type) {
        case "mousedown":
          this.painting = true;
          break;
        case "mouseup":
          this.painting = false;
          break;
        case "mousemove":
          this.painting && this.addPaint(<CustomEvent>e);
          break;
        case "mouseleave":
          this.painting = false;
          break;
      }
    };

    "mousedown mouseup mousemove mouseleave".split(" ").map(name => {
      this.canvas.addEventListener(name, handleEvent, false);
    });

    if (this.changeWidthBtns) {
      this.changeWidthBtns.forEach((button: Node) => {
        button.addEventListener("click", (e: Event) => {
          if (e.target) {
            this.changeBrushWidth(
              parseInt((e.target as CustomButton).textContent)
            );
          }
        });
      });
    }

    if (this.changeColor) {
      this.changeColor.addEventListener("change", (e: Event) => {
        this.changeBrushColor((e.target as HTMLInputElement).value);
      });
    }
  };

  addPaint = (e: MouseEvent) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    this.ctx.strokeStyle = this.brushColor;
    this.ctx.lineWidth = this.brushWidth;
    this.ctx.lineJoin = "round";
    this.ctx.lineCap = "round";
    this.ctx.beginPath();
    const { left, top } = this.canvas.getBoundingClientRect();
    this.ctx.moveTo(mouseX - left, mouseY - top);
    this.ctx.lineTo(mouseX - left, mouseY - top);

    this.ctx.stroke();
  };

  changeBrushWidth = (width: number): void => {
    this.brushWidth = width;
  };

  changeBrushColor = (color: string): void => {
    this.brushColor = color;
  };
}
