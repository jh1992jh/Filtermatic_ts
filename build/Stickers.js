"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var randomId_1 = require("./helpers/randomId");
var index_1 = require("./stickers/index");
var Stickers = /** @class */ (function () {
    function Stickers(stickers, selectedSticker, ctx, canvas) {
        var _this = this;
        this.stickers = stickers;
        this.selectedSticker = selectedSticker;
        this.ctx = ctx;
        this.canvas = canvas;
        this.addedStickers = [];
        this.dragging = false;
        this.stickerMoved = this.selectedSticker;
        this.modifying = false;
        this.modifiedSticker = this.selectedSticker;
        this.addListeners = function () {
            var handleEvent = function (e) {
                switch (e.type) {
                    case "dblclick":
                        _this.deleteSticker(e);
                        break;
                    case "click":
                        _this.selectModiefiedSticker(e);
                        break;
                    case "mousemove":
                        _this.moveSticker(e);
                        break;
                    case "mousedown":
                        _this.dragging = true;
                        _this.updateStickerCords(e, e.target.id);
                        break;
                    case "mouseup":
                        _this.dragging = false;
                        _this.updateStickerCords(e, e.target.id);
                        break;
                    case "mouseleave":
                        _this.dragging = false;
                    default:
                        return;
                }
            };
            var stickersAdded = document.querySelectorAll(".sticker");
            stickersAdded.forEach(function (sticker) {
                "click mouseenter mouseleave mousemove dblclick mousedown mouseup"
                    .split(" ")
                    .map(function (name) {
                    sticker.addEventListener(name, handleEvent, false);
                });
            });
        };
        this.selectSticker = function (e) {
            var sticker = index_1.stickers.filter(function (sticker) { return sticker.title === e.target.id; });
            var selectedStickerEl = document.querySelectorAll(".selected_sticker");
            if (selectedStickerEl) {
                selectedStickerEl.forEach(function (sticker) {
                    sticker.classList.remove("selected_sticker");
                });
            }
            var parentStickerElement = e.target.parentElement;
            if (e.target && parentStickerElement) {
                if (parentStickerElement.classList.contains("menu_sticker")) {
                    parentStickerElement.classList.add("selected_sticker");
                }
            }
            if (e.target.classList.contains("menu_sticker")) {
                e.target.classList.add("selected_sticker");
            }
            _this.selectedSticker = sticker[0];
        };
        this.moveSticker = function (e) {
            var mouseX = e.clientX;
            var mouseY = e.clientY;
            var sticker = e.target;
            if (sticker && _this.dragging) {
                sticker.style.top = mouseY - sticker.height / 2 + "px";
                sticker.style.left = mouseX - sticker.width / 2 + "px";
            }
        };
        this.setupStickerMenu = function () {
            var menu = document.querySelector(".sticker_menu");
            if (menu) {
                _this.stickers.forEach(function (sticker) {
                    menu.innerHTML += "\n            <div class=\"menu_item menu_sticker\" id=\"" + sticker.title + "\">\n              <img src=\"" + sticker.src + "\" id=\"" + sticker.title + "\" class=\"sticker_img\"/>\n            </div>\n          ";
                });
            }
            var menuStickers = document.querySelectorAll(".menu_sticker");
            menuStickers.forEach(function (sticker) {
                sticker.addEventListener("click", function (e) { return _this.selectSticker(e); });
            });
        };
        this.updateStickerCords = function (e, id) {
            var _a = _this.canvas.getBoundingClientRect(), left = _a.left, top = _a.top;
            var sticker = e.target;
            var mouseX = e.clientX - sticker.width / 2;
            var mouseY = e.clientY - sticker.height / 2;
            var newStickers = _this.addedStickers.map(function (sticker) {
                if (sticker.id === id) {
                    sticker.x = mouseX - left;
                    sticker.y = mouseY - top;
                }
                return sticker;
            });
            _this.addedStickers = newStickers;
        };
        this.addSticker = function () {
            var stickerImg = document.createElement("img");
            var stickerWrapper = document.createElement("div");
            stickerWrapper.className = "sticker_wrapper";
            stickerImg.src = _this.selectedSticker.src;
            stickerImg.className = "sticker";
            stickerImg.style.height = _this.selectedSticker.height + "px";
            stickerImg.style.width = _this.selectedSticker.width + "px";
            stickerImg.draggable = false;
            var id = stickerImg.id + _this.selectedSticker.id + randomId_1.ID();
            stickerWrapper.id = stickerImg.id = id;
            var body = document.querySelector("body");
            body && body.appendChild(stickerImg);
            _this.addListeners();
            var _a = _this.canvas.getBoundingClientRect(), left = _a.left, top = _a.top;
            var canvasStickerCenterY = _this.canvas.height / 2 - _this.selectedSticker.height / 2;
            var canvasStikcerCenterX = _this.canvas.width / 2 - _this.selectedSticker.width / 2;
            stickerImg.style.top = canvasStickerCenterY - top + "px";
            stickerImg.style.left = left + canvasStikcerCenterX + "px";
            var newSticker = __assign({}, _this.selectedSticker, { id: id, x: canvasStikcerCenterX + left, y: canvasStickerCenterY - top });
            _this.addedStickers.push(newSticker);
        };
        this.deleteSticker = function (e) {
            var id = e.target.id;
            _this.addedStickers = _this.addedStickers.filter(function (sticker) { return sticker.id !== id; });
            e.target.remove();
            var prevModifyModal = document.querySelector(".sticker_modal");
            prevModifyModal && prevModifyModal.remove();
        };
        this.selectModiefiedSticker = function (e) {
            var targetSticker = _this.addedStickers.filter(function (sticker) {
                return sticker.id === e.target.id;
            })[0];
            if (targetSticker) {
                var prevModifyModal = document.querySelector(".sticker_modal");
                prevModifyModal && prevModifyModal.remove();
                _this.modifiedSticker = targetSticker;
                var _a = _this.modifiedSticker, title = _a.title, id = _a.id, x = _a.x, y = _a.y, height = _a.height, width = _a.width;
                _this.modifying = true;
                var _b = _this.canvas.getBoundingClientRect(), left = _b.left, top_1 = _b.top;
                var modifyModal_1 = document.createElement("div");
                var stickerImg = document.createElement("img");
                var infoList_1 = document.createElement("ul");
                // Cant't loop trough the obj to get both value and key because ISticker has no property index type string, :(
                var titleLi = document.createElement("li");
                titleLi.textContent = "title: " + title;
                var idLi = document.createElement("li");
                idLi.textContent = "id: " + id;
                var xLi = document.createElement("li");
                xLi.textContent = "x: " + _this.modifiedSticker.x.toFixed(1);
                var yLi = document.createElement("li");
                yLi.textContent = "y: " + _this.modifiedSticker.y.toFixed(1);
                var widthLi = document.createElement("li");
                widthLi.textContent = "width: " + width;
                widthLi.id = "sticker_width";
                var heightLi = document.createElement("li");
                heightLi.id = "sticker_height";
                heightLi.textContent = "height: " + height;
                var close_1 = document.createElement("span");
                close_1.className = "close_modal";
                close_1.textContent = "X";
                var propArr = [titleLi, idLi, xLi, yLi, widthLi, heightLi];
                propArr.forEach(function (prop) {
                    infoList_1.appendChild(prop);
                });
                var body = document.querySelector("body");
                modifyModal_1.className = "sticker_modal";
                stickerImg.src = _this.modifiedSticker.src;
                var incBtn = document.createElement("button");
                var decBtn = document.createElement("button");
                var delIcon = document.createElement("i");
                incBtn.textContent = "+";
                decBtn.textContent = "-";
                delIcon.className = "delete_icon fas fa-trash-alt";
                incBtn.className = "size_btn";
                decBtn.className = "size_btn";
                modifyModal_1.appendChild(delIcon);
                modifyModal_1.appendChild(stickerImg);
                modifyModal_1.appendChild(infoList_1);
                modifyModal_1.appendChild(close_1);
                modifyModal_1.appendChild(incBtn);
                modifyModal_1.appendChild(decBtn);
                modifyModal_1.style.top = _this.modifiedSticker.y + "px";
                modifyModal_1.style.left = _this.modifiedSticker.x + "px";
                body && body.appendChild(modifyModal_1);
                incBtn.style.top = "30%";
                incBtn.style.right = "1em";
                decBtn.style.top = "60%";
                incBtn.style.right = "1em";
                incBtn.addEventListener("click", function () { return _this.changeSize("inc"); });
                decBtn.addEventListener("click", function () { return _this.changeSize("dec"); });
                close_1.addEventListener("click", function () { return modifyModal_1.remove(); });
                delIcon.addEventListener("click", function () { return _this.deleteSticker(e); });
            }
        };
        this.changeSize = function (change) {
            var stickerWidth = document.querySelector("#sticker_width");
            var stickerHeight = document.querySelector("#sticker_height");
            var sticker = document.querySelector("#" + _this.modifiedSticker.id);
            if (change === "inc" && sticker && stickerWidth && stickerHeight) {
                var width = _this.modifiedSticker.width;
                var height = _this.modifiedSticker.height;
                if (width > height) {
                    var ratio = width / height;
                    _this.modifiedSticker.width += 3;
                    _this.modifiedSticker.height += 3 * ratio;
                }
                stickerWidth.textContent = "width: " + width.toString();
                stickerHeight.textContent = "height: " + height.toFixed().toString();
                sticker.style.height = _this.modifiedSticker.height + "px";
                sticker.style.width = _this.modifiedSticker.width + "px";
            }
            if (change === "dec" && sticker && stickerWidth && stickerHeight) {
                _this.modifiedSticker.height -= 3;
                _this.modifiedSticker.width -= 3;
                var width = _this.modifiedSticker.width.toString();
                var height = _this.modifiedSticker.height.toString();
                stickerWidth.textContent = "width: " + width;
                stickerHeight.textContent = "height: " + height;
                sticker.style.height = _this.modifiedSticker.height + "px";
                sticker.style.width = _this.modifiedSticker.width + "px";
            }
        };
    }
    return Stickers;
}());
exports.Stickers = Stickers;
