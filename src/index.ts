import { Stickers } from "./Stickers";
import { stickers } from "./stickers/index";
import { Filters } from "./Filters";
import { filters } from "./filters/filters";
import { PaintBrush } from "./PaintBrush";
import { ToolMenu } from "./ToolMenu";
import { Text } from "./Text";

const body = document.querySelector<HTMLBodyElement>("body");
const canvas = document.querySelector<HTMLCanvasElement>("canvas");
const ctx = canvas && canvas.getContext("2d");
const imgInput = document.querySelector<HTMLInputElement>("#img-input");
const image = document.querySelector<HTMLImageElement>("#canvas-img");
const addTextBtn = document.querySelector<HTMLButtonElement>("#add_text_btn");
const addStickerBtn = document.querySelector<HTMLButtonElement>(
  "#add_sticker_btn"
);
const addFilterBtn = document.querySelector<HTMLButtonElement>(
  "#add_filter_btn"
);

const topTextInput = document.querySelector<HTMLInputElement>(
  "#top_text_input"
);

class Canvas<T extends HTMLCanvasElement> {
  width: number = 500;
  height: number = 500;
  constructor(
    public canvas: T,
    public Stickers: Stickers,
    public Filters: Filters,
    public PaintBrush: PaintBrush,
    public Text: Text
  ) {}

  setupCanvas = (): void => {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  };

  uploadImg = (): void => {
    const img: HTMLImageElement = new Image();

    if (imgInput && imgInput.files) {
      img.src = URL.createObjectURL(imgInput.files[0]);
      img.onload = () => {
        ctx && ctx.drawImage(img, 0, 0, this.width, this.height);
      };
    }
  };

  addListeners = (): void => {
    const saveImageBtn = document.querySelector<HTMLButtonElement>(
      "#download_img_btn"
    );

    const goBackBtn = document.querySelector<HTMLAnchorElement>(".go_back");

    const downloadScreen = document.querySelector<HTMLDivElement>(
      ".download_image"
    );

    if (downloadScreen && goBackBtn && saveImageBtn) {
      saveImageBtn.addEventListener("click", () => {
        downloadScreen.style.display = "flex";
        this.saveImage();
      });

      goBackBtn.addEventListener("click", () => {
        downloadScreen.style.display = "none";
      });
    }
  };

  saveImage = (): void => {
    const downloadScreen = document.querySelector<HTMLDivElement>(
      ".download_image"
    );

    const pixels =
      ctx && ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const saveCanvas: HTMLCanvasElement | null = document.querySelector(
      ".save_canvas"
    );

    if (saveCanvas) {
      saveCanvas.width = 500;
      saveCanvas.height = 500;
      saveCanvas.classList.add("save_canvas");

      const saveCtx = saveCanvas && saveCanvas.getContext("2d");
      if (saveCtx && pixels) {
        saveCtx.putImageData(pixels, 0, 0);
      }
      downloadScreen &&
        downloadScreen.insertBefore(saveCanvas, downloadScreen.childNodes[2]);

      const link = document.createElement("a");

      link.innerHTML = "Download image";

      const { left, top } = saveCanvas.getBoundingClientRect();

      const addedStickers = this.Stickers.addedStickers;
      const addedTexts = this.Text.addedText;

      if (saveCtx && addedStickers.length > 0) {
        for (let i = 0; i < addedStickers.length; i++) {
          const logoSvg = new Image();
          logoSvg.src = addedStickers[i].src;
          logoSvg.onload = () => {
            addedStickers[i].x !== undefined &&
              addedStickers[i].y !== undefined &&
              saveCtx.drawImage(
                logoSvg,
                addedStickers[i].x,
                addedStickers[i].y,
                addedStickers[i].width,
                Math.floor(addedStickers[i].height)
              );
          };
        }
      }

      if (saveCtx && addedTexts.length > 0) {
        for (let i = 0; i < addedTexts.length; i++) {
          saveCtx.font = `${addedTexts[i].size}px Arial`;

          saveCtx.fillStyle = `${addedTexts[i].color}`;
          saveCtx.fillText(
            addedTexts[i].text,
            addedTexts[i].x,
            addedTexts[i].y
          );
        }
      }
      const prevLink = document.querySelector(".download_image_link");

      if (prevLink) {
        prevLink.remove();
      }

      link.className = "download_image_link";
      link.addEventListener(
        "click",
        ev => {
          link.href = saveCanvas.toDataURL();
          link.download = `FilterMatic${new Date().toISOString()}.png`;
          link.remove();
        },
        false
      );
      downloadScreen && downloadScreen.appendChild(link);
    }
  };
}

if (canvas && imgInput && addTextBtn && addStickerBtn && addFilterBtn && ctx) {
  const NewCanvas = new Canvas<HTMLCanvasElement>(
    canvas,
    new Stickers(stickers, stickers[0], ctx, canvas),
    new Filters(filters, filters[0], ctx),
    new PaintBrush(canvas, ctx),
    new Text(canvas, ctx)
  );

  const toolMenu = new ToolMenu();

  NewCanvas.Text.addListeners();
  NewCanvas.setupCanvas();
  NewCanvas.Stickers.setupStickerMenu();
  NewCanvas.Filters.setupFilterMenu();
  NewCanvas.PaintBrush.addListeners();
  NewCanvas.addListeners();
  toolMenu.addListeners();

  imgInput.addEventListener("change", NewCanvas.uploadImg);

  addStickerBtn.addEventListener("click", () => {
    NewCanvas.Stickers.addSticker();
  });
  addFilterBtn.addEventListener("click", () => {
    NewCanvas.Filters.addFilter();
  });
}
