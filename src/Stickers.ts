import { ID } from "./helpers/randomId";
import { stickers as originalStickers } from "./stickers/index";

type CustomEvent = Event & MouseEvent;

interface ISticker {
  title: string;
  src: string;
  height: number;
  width: number;
  id: string;
  x?: any;
  y?: any;
}

export class Stickers {
  addedStickers: ISticker[] = [];
  dragging: boolean = false;
  stickerMoved: ISticker = this.selectedSticker;
  modifying: boolean = false;
  modifiedSticker: ISticker = this.selectedSticker;

  constructor(
    public stickers: ISticker[],
    public selectedSticker: ISticker,
    public ctx: CanvasRenderingContext2D,
    public canvas: HTMLCanvasElement
  ) {}

  addListeners = () => {
    const handleEvent = (e: Event): void => {
      switch (e.type) {
        case "dblclick":
          this.deleteSticker(<CustomEvent>e);
          break;
        case "click":
          this.selectModiefiedSticker(<CustomEvent>e);
          break;
        case "mousemove":
          this.moveSticker(<CustomEvent>e);
          break;
        case "mousedown":
          this.dragging = true;

          this.updateStickerCords(<CustomEvent>e, (e.target as Element).id);
          break;
        case "mouseup":
          this.dragging = false;
          this.updateStickerCords(<CustomEvent>e, (e.target as Element).id);

          break;
        case "mouseleave":
          this.dragging = false;
        default:
          return;
      }
    };
    const stickersAdded = document.querySelectorAll(".sticker");

    stickersAdded.forEach((sticker: Element) => {
      "click mouseenter mouseleave mousemove dblclick mousedown mouseup"
        .split(" ")
        .map(name => {
          sticker.addEventListener(name, handleEvent, false);
        });
    });
  };
  selectSticker = (e: Event): void => {
    const sticker = originalStickers.filter(
      (sticker: ISticker) => sticker.title === (e.target as Element).id
    );

    const selectedStickerEl = document.querySelectorAll(".selected_sticker");

    if (selectedStickerEl) {
      selectedStickerEl.forEach(sticker => {
        sticker.classList.remove("selected_sticker");
      });
    }

    const parentStickerElement = (e.target as Element).parentElement;
    if ((e.target as Element) && parentStickerElement) {
      if (parentStickerElement.classList.contains("menu_sticker")) {
        parentStickerElement.classList.add("selected_sticker");
      }
    }

    if ((e.target as Element).classList.contains("menu_sticker")) {
      (e.target as Element).classList.add("selected_sticker");
    }

    this.selectedSticker = sticker[0];
  };

  moveSticker = (e: MouseEvent): void => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const sticker = e.target as HTMLImageElement;

    if (sticker && this.dragging) {
      sticker.style.top = `${mouseY - sticker.height / 2}px`;
      sticker.style.left = `${mouseX - sticker.width / 2}px`;
    }
  };

  setupStickerMenu = (): void => {
    const menu = document.querySelector<HTMLElement>(".sticker_menu");

    if (menu) {
      this.stickers.forEach((sticker: ISticker) => {
        menu.innerHTML += `
            <div class="menu_item menu_sticker" id="${sticker.title}">
              <img src="${sticker.src}" id="${
          sticker.title
        }" class="sticker_img"/>
            </div>
          `;
      });
    }

    const menuStickers = document.querySelectorAll(".menu_sticker");

    menuStickers.forEach(sticker => {
      sticker.addEventListener("click", e => this.selectSticker(e));
    });
  };

  updateStickerCords = (e: MouseEvent, id: string): void => {
    const { left, top } = this.canvas.getBoundingClientRect();
    const sticker = e.target as HTMLImageElement;

    const mouseX = e.clientX - sticker.width / 2;
    const mouseY = e.clientY - sticker.height / 2;

    const newStickers = this.addedStickers.map(
      (sticker: ISticker): ISticker => {
        if (sticker.id === id) {
          sticker.x = mouseX - left;
          sticker.y = mouseY - top;
        }
        return sticker;
      }
    );

    this.addedStickers = newStickers;
  };

  addSticker = (): void => {
    const stickerImg = document.createElement("img");
    const stickerWrapper = document.createElement("div");
    stickerWrapper.className = "sticker_wrapper";
    stickerImg.src = this.selectedSticker.src;
    stickerImg.className = "sticker";
    stickerImg.style.height = `${this.selectedSticker.height}px`;
    stickerImg.style.width = `${this.selectedSticker.width}px`;
    stickerImg.draggable = false;
    const id = stickerImg.id + this.selectedSticker.id + ID();
    stickerWrapper.id = stickerImg.id = id;
    const body = document.querySelector<HTMLBodyElement>("body");
    body && body.appendChild(stickerImg);

    this.addListeners();

    const { left, top } = this.canvas.getBoundingClientRect();

    const canvasStickerCenterY =
      this.canvas.height / 2 - this.selectedSticker.height / 2;
    const canvasStikcerCenterX =
      this.canvas.width / 2 - this.selectedSticker.width / 2;

    stickerImg.style.top = `${canvasStickerCenterY - top}px`;
    stickerImg.style.left = `${left + canvasStikcerCenterX}px`;

    const newSticker = {
      ...this.selectedSticker,
      id: id,
      x: canvasStikcerCenterX + left,
      y: canvasStickerCenterY - top
    };

    this.addedStickers.push(newSticker);
  };

  deleteSticker = (e: MouseEvent): void => {
    const id = (e.target as Element).id;
    this.addedStickers = this.addedStickers.filter(
      (sticker: ISticker) => sticker.id !== id
    );
    (e.target as Element).remove();
  };

  selectModiefiedSticker = (e: MouseEvent): void => {
    const targetSticker = this.addedStickers.filter((sticker: ISticker) => {
      return sticker.id === (e.target as Element).id;
    })[0];

    if (targetSticker) {
      const prevModifyModal = document.querySelector(".sticker_modal");
      prevModifyModal && prevModifyModal.remove();

      this.modifiedSticker = targetSticker;
      const { title, id, x, y, height, width } = this.modifiedSticker;
      this.modifying = true;

      const { left, top } = this.canvas.getBoundingClientRect();
      const modifyModal = document.createElement("div");
      const stickerImg = document.createElement("img");
      const infoList = document.createElement("ul");
      // Cant't loop trough the obj to get both value and key because ISticker has no property index type string, :(
      const titleLi = document.createElement("li");
      titleLi.textContent = `title: ${title}`;
      const idLi = document.createElement("li");
      idLi.textContent = `id: ${id}`;
      const xLi = document.createElement("li");
      xLi.textContent = `x: ${this.modifiedSticker.x.toFixed(1)}`;
      const yLi = document.createElement("li");
      yLi.textContent = `y: ${this.modifiedSticker.y.toFixed(1)}`;
      const widthLi = document.createElement("li");
      widthLi.textContent = `width: ${width}`;
      widthLi.id = "sticker_width";
      const heightLi = document.createElement("li");
      heightLi.id = "sticker_height";
      heightLi.textContent = `height: ${height}`;

      const close = document.createElement("span");
      close.className = "close_modal";
      close.textContent = "X";

      const propArr = [titleLi, idLi, xLi, yLi, widthLi, heightLi];

      propArr.forEach(prop => {
        infoList.appendChild(prop);
      });

      const body = document.querySelector("body");

      modifyModal.className = "sticker_modal";
      stickerImg.src = this.modifiedSticker.src;

      const incBtn = document.createElement("button");
      const decBtn = document.createElement("button");

      incBtn.textContent = "+";
      decBtn.textContent = "-";

      incBtn.className = "size_btn";
      decBtn.className = "size_btn";

      modifyModal.appendChild(stickerImg);
      modifyModal.appendChild(infoList);
      modifyModal.appendChild(close);
      modifyModal.appendChild(incBtn);
      modifyModal.appendChild(decBtn);

      modifyModal.style.top = `${this.modifiedSticker.y}px`;
      modifyModal.style.left = `${this.modifiedSticker.x}px`;

      body && body.appendChild(modifyModal);

      incBtn.style.top = `30%`;
      incBtn.style.right = "1em";
      decBtn.style.top = `60%`;
      incBtn.style.right = "1em";

      incBtn.addEventListener("click", () => this.changeSize("inc"));
      decBtn.addEventListener("click", () => this.changeSize("dec"));
      close.addEventListener("click", () => modifyModal.remove());
    }
  };

  changeSize = (change: string): void => {
    const stickerWidth = document.querySelector("#sticker_width");
    const stickerHeight = document.querySelector("#sticker_height");

    const sticker: HTMLImageElement | null = document.querySelector(
      `#${this.modifiedSticker.id}`
    );
    if (change === "inc" && sticker && stickerWidth && stickerHeight) {
      const width = this.modifiedSticker.width;
      const height = this.modifiedSticker.height;

      if (width > height) {
        const ratio = width / height;
        this.modifiedSticker.width += 3;
        this.modifiedSticker.height += 3 * ratio;
      }

      stickerWidth.textContent = `width: ${width.toString()}`;
      stickerHeight.textContent = `height: ${height.toFixed().toString()}`;

      sticker.style.height = `${this.modifiedSticker.height}px`;
      sticker.style.width = `${this.modifiedSticker.width}px`;
    }

    if (change === "dec" && sticker && stickerWidth && stickerHeight) {
      this.modifiedSticker.height -= 3;
      this.modifiedSticker.width -= 3;

      const width = this.modifiedSticker.width.toString();
      const height = this.modifiedSticker.height.toString();

      stickerWidth.textContent = `width: ${width}`;
      stickerHeight.textContent = `height: ${height}`;

      sticker.style.height = `${this.modifiedSticker.height}px`;
      sticker.style.width = `${this.modifiedSticker.width}px`;
    }
  };
}
