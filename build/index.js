"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Stickers_1 = require("./Stickers");
var index_1 = require("./stickers/index");
var Filters_1 = require("./Filters");
var filters_1 = require("./filters/filters");
var PaintBrush_1 = require("./PaintBrush");
var ToolMenu_1 = require("./ToolMenu");
var Text_1 = require("./Text");
var body = document.querySelector("body");
var canvas = document.querySelector("canvas");
var ctx = canvas && canvas.getContext("2d");
var imgInput = document.querySelector("#img-input");
var image = document.querySelector("#canvas-img");
var addTextBtn = document.querySelector("#add_text_btn");
var addStickerBtn = document.querySelector("#add_sticker_btn");
var addFilterBtn = document.querySelector("#add_filter_btn");
var topTextInput = document.querySelector("#top_text_input");
//const saveNewImage = document.querySelector<HTMLButtonElement>("#save_img");
var Canvas = /** @class */ (function () {
    function Canvas(canvas, Stickers, Filters, PaintBrush, Text) {
        var _this = this;
        this.canvas = canvas;
        this.Stickers = Stickers;
        this.Filters = Filters;
        this.PaintBrush = PaintBrush;
        this.Text = Text;
        this.width = 500;
        this.height = 500;
        this.setupCanvas = function () {
            console.log(_this.canvas);
            _this.canvas.width = _this.width;
            _this.canvas.height = _this.height;
            console.log(ctx);
        };
        this.uploadImg = function () {
            var img = new Image();
            if (imgInput && imgInput.files) {
                img.src = URL.createObjectURL(imgInput.files[0]);
                img.onload = function () {
                    ctx && ctx.drawImage(img, 0, 0, _this.width, _this.height);
                };
            }
        };
        /*addText = (): void => {
          const topText = topTextInput && topTextInput.value;
          if (ctx && topText) {
            ctx.font = "50px Arial";
            ctx.fillStyle = "rgba(150, 150, 150, 1)";
            ctx.fillText(topText, 10, 60);
            ctx.textAlign = "center";
          }
        };*/
        this.addListeners = function () {
            var saveImageBtn = document.querySelector("#download_img_btn");
            var goBackBtn = document.querySelector(".go_back");
            var downloadScreen = document.querySelector(".download_image");
            if (downloadScreen && goBackBtn && saveImageBtn) {
                saveImageBtn.addEventListener("click", function () {
                    downloadScreen.style.display = "flex";
                    _this.saveImage();
                });
                goBackBtn.addEventListener("click", function () {
                    downloadScreen.style.display = "none";
                });
            }
        };
        this.saveImage = function () {
            // TODO: WRITE A FUNCTION TO LOOP TROUGH THE ADDED STICKERS ARRAY AND ADD THE STICKERS TO CANVAS
            var downloadScreen = document.querySelector(".download_image");
            var pixels = ctx && ctx.getImageData(0, 0, _this.canvas.width, _this.canvas.height);
            var saveCanvas = document.querySelector(".save_canvas");
            if (saveCanvas) {
                saveCanvas.width = 500;
                saveCanvas.height = 500;
                saveCanvas.classList.add("save_canvas");
                var saveCtx_1 = saveCanvas && saveCanvas.getContext("2d");
                if (saveCtx_1 && pixels) {
                    saveCtx_1.putImageData(pixels, 0, 0);
                }
                downloadScreen &&
                    downloadScreen.insertBefore(saveCanvas, downloadScreen.childNodes[2]);
                var link_1 = document.createElement("a");
                //link.className = "modalSave";
                //const image = document.createElement("img");
                //link.className = "download_image";
                link_1.innerHTML = "Download image";
                //link.appendChild(image);
                var _a = saveCanvas.getBoundingClientRect(), left = _a.left, top_1 = _a.top;
                console.log("left: " + left, "top: " + top_1);
                var addedStickers_1 = _this.Stickers.addedStickers;
                var addedTexts = _this.Text.addedText;
                // ctx.drawImage(logoSvg, addedStickers[i].x - canvasXbounding, addedStickers[i].y - canvasYbounding, addedStickers[i].width * addedStickers[i].size , addedStickers[i].height * addedStickers[i].size);
                // console.log(addedTexts, "left: " + left, "top: " + top);
                if (saveCtx_1 && addedStickers_1.length > 0) {
                    var _loop_1 = function (i) {
                        var logoSvg = new Image();
                        logoSvg.src = addedStickers_1[i].src;
                        logoSvg.onload = function () {
                            addedStickers_1[i].x !== undefined &&
                                addedStickers_1[i].y !== undefined &&
                                saveCtx_1.drawImage(logoSvg, addedStickers_1[i].x, addedStickers_1[i].y, addedStickers_1[i].width, Math.floor(addedStickers_1[i].height));
                        };
                        console.log(addedStickers_1[i].title + ", x: " + addedStickers_1[i].x + ", y: " + addedStickers_1[i].y + " ");
                    };
                    for (var i = 0; i < addedStickers_1.length; i++) {
                        _loop_1(i);
                    }
                }
                // TODO MAKE WRITING TEXT TO CANVAS WORK!
                if (saveCtx_1 && addedTexts.length > 0) {
                    for (var i = 0; i < addedTexts.length; i++) {
                        /*
                        addedTexts[i].x !== undefined &&
                          addedTexts[i].y !== undefined &&
                          saveCtx.drawImage(
                            logoSvg,
                            addedTexts[i].x - left - addedTexts[i].width / 2,
                            addedTexts[i].y - top - addedTexts[i].height / 2,
                            addedTexts[i].width,
                            addedTexts[i].height
                          );
                      */
                        console.log(saveCtx_1.measureText(addedTexts[i].text), addedTexts[i].text);
                        saveCtx_1.font = addedTexts[i].size + "px Arial";
                        saveCtx_1.fillStyle = "" + addedTexts[i].color;
                        saveCtx_1.fillText(addedTexts[i].text, addedTexts[i].x, addedTexts[i].y);
                        console.log(saveCanvas);
                        //saveCtx.fillText(addedTexts[i].text, 10, 60);
                        console.log(addedTexts[i].text + ", x: " + addedTexts[i].x + ", y: " + addedTexts[i].y + " ");
                    }
                }
                var prevLink = document.querySelector(".download_image_link");
                if (prevLink) {
                    prevLink.remove();
                }
                link_1.className = "download_image_link";
                link_1.addEventListener("click", function (ev) {
                    link_1.href = saveCanvas.toDataURL();
                    link_1.download = "FilterMatic" + new Date().toISOString() + ".png";
                    link_1.remove();
                }, false);
                downloadScreen && downloadScreen.appendChild(link_1);
            }
        };
    }
    return Canvas;
}());
if (canvas &&
    imgInput &&
    addTextBtn &&
    addStickerBtn &&
    addFilterBtn
//saveNewImage
) {
    var ctx_1 = canvas.getContext("2d");
    var NewCanvas_1 = new Canvas(canvas, new Stickers_1.Stickers(index_1.stickers, index_1.stickers[0], ctx_1, canvas), new Filters_1.Filters(filters_1.filters, filters_1.filters[0], ctx_1), new PaintBrush_1.PaintBrush(canvas, ctx_1), new Text_1.Text(canvas, ctx_1));
    var toolMenu = new ToolMenu_1.ToolMenu();
    NewCanvas_1.Text.addListeners();
    NewCanvas_1.setupCanvas();
    NewCanvas_1.Stickers.setupStickerMenu();
    NewCanvas_1.Filters.setupFilterMenu();
    NewCanvas_1.PaintBrush.addListeners();
    NewCanvas_1.addListeners();
    toolMenu.addListeners();
    // toolMenu.setupToolMenu();
    imgInput.addEventListener("change", NewCanvas_1.uploadImg);
    //addTextBtn.addEventListener("click", NewCanvas.addText);
    /*canvas.addEventListener("mousemove", e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });*/
    canvas.addEventListener("click", function () { return console.log("clickin"); });
    addStickerBtn.addEventListener("click", function () {
        NewCanvas_1.Stickers.addSticker();
    });
    addFilterBtn.addEventListener("click", function () {
        NewCanvas_1.Filters.addFilter();
    });
    // saveNewImage.addEventListener("click", () => NewCanvas.saveImage());
    //console.log(canvas.getBoundingClientRect());
}
