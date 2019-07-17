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
            _this.canvas.width = _this.width;
            _this.canvas.height = _this.height;
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
                link_1.innerHTML = "Download image";
                var _a = saveCanvas.getBoundingClientRect(), left = _a.left, top_1 = _a.top;
                console.log("left: " + left, "top: " + top_1);
                var addedStickers_1 = _this.Stickers.addedStickers;
                var addedTexts = _this.Text.addedText;
                if (saveCtx_1 && addedStickers_1.length > 0) {
                    var _loop_1 = function (i) {
                        var logoSvg = new Image();
                        logoSvg.src = addedStickers_1[i].src;
                        logoSvg.onload = function () {
                            addedStickers_1[i].x !== undefined &&
                                addedStickers_1[i].y !== undefined &&
                                saveCtx_1.drawImage(logoSvg, addedStickers_1[i].x, addedStickers_1[i].y, addedStickers_1[i].width, Math.floor(addedStickers_1[i].height));
                        };
                    };
                    for (var i = 0; i < addedStickers_1.length; i++) {
                        _loop_1(i);
                    }
                }
                if (saveCtx_1 && addedTexts.length > 0) {
                    for (var i = 0; i < addedTexts.length; i++) {
                        saveCtx_1.font = addedTexts[i].size + "px Arial";
                        saveCtx_1.fillStyle = "" + addedTexts[i].color;
                        saveCtx_1.fillText(addedTexts[i].text, addedTexts[i].x, addedTexts[i].y);
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
if (canvas && imgInput && addTextBtn && addStickerBtn && addFilterBtn) {
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
    imgInput.addEventListener("change", NewCanvas_1.uploadImg);
    canvas.addEventListener("click", function () { return console.log("clickin"); });
    addStickerBtn.addEventListener("click", function () {
        NewCanvas_1.Stickers.addSticker();
    });
    addFilterBtn.addEventListener("click", function () {
        NewCanvas_1.Filters.addFilter();
    });
}
