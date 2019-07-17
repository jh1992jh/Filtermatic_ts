"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var randomId_1 = require("./helpers/randomId");
var Text = /** @class */ (function () {
    function Text(canvas, ctx) {
        var _this = this;
        this.canvas = canvas;
        this.ctx = ctx;
        this.addedText = [];
        this.textInput = document.querySelector("#text_input");
        this.addTextBtn = document.querySelector("#add_text_btn");
        this.dragging = false;
        this.textSize = 16;
        this.textColor = "#ffffff";
        this.addListeners = function () {
            if (_this.addTextBtn) {
                _this.addTextBtn.addEventListener("click", function () { return _this.addText(); });
            }
            var handleEvent = function (e) {
                switch (e.type) {
                    case "click":
                        console.log("Hey you clicked " + e.target);
                        break;
                    case "mousedown":
                        _this.dragging = true;
                        console.log(_this.dragging);
                        break;
                    case "mouseup":
                        _this.dragging = false;
                        _this.updateTextCords(e, e.target.id);
                        break;
                    case "mouseleave":
                        _this.dragging = false;
                        _this.updateTextCords(e, e.target.id);
                        break;
                    case "mousemove":
                        if (_this.dragging) {
                            _this.moveText(e);
                            _this.updateTextCords(e, e.target.id);
                        }
                        break;
                    case "dblclick":
                        _this.deleteText(e.target.id);
                        break;
                    default:
                        return;
                }
            };
            var textsAdded = document.querySelectorAll(".added_text");
            textsAdded.forEach(function (text) {
                "click mousedown mouseup mouseleave mousemove dblclick"
                    .split(" ")
                    .map(function (name) {
                    text.addEventListener(name, handleEvent, false);
                });
            });
            var changeTextSizeBtns = document.querySelectorAll(".change_ts");
            changeTextSizeBtns.forEach(function (button) {
                button.addEventListener("click", function (e) {
                    return _this.changeTextSize(parseInt(e.target.textContent));
                });
            });
            var changeColor = document.querySelector("#text_color_input");
            changeColor &&
                changeColor.addEventListener("change", function (e) {
                    _this.changeTextColor(e.target.value);
                });
        };
        this.addText = function () {
            if (_this.textInput) {
                if (_this.textInput.value === "")
                    return;
                var body = document.querySelector("body");
                var centerX = body && body.clientWidth / 2;
                var centerY = body && body.clientHeight / 2;
                if (centerX && centerY) {
                    var newText = {
                        text: _this.textInput.value,
                        id: randomId_1.ID(),
                        x: centerX,
                        y: centerY,
                        offsetW: 0,
                        offsetH: 0,
                        color: _this.textColor,
                        size: _this.textSize
                    };
                    var newAddedText = document.createElement("div");
                    newAddedText.classList.add("added_text");
                    newAddedText.id = newText.id;
                    newAddedText.style.left = newText.x + "px";
                    newAddedText.style.top = newText.y + "px";
                    newAddedText.style.color = newText.color;
                    newAddedText.style.fontSize = newText.size + "px";
                    newAddedText.textContent = newText.text;
                    newAddedText.draggable = false;
                    body && body.appendChild(newAddedText);
                    var newTextDom = document.querySelector("#" + newText.id);
                    console.log(newTextDom);
                    if (newTextDom) {
                        newText.offsetW = newTextDom && newTextDom.offsetWidth;
                        newText.offsetH = newTextDom && newTextDom.offsetHeight;
                    }
                    _this.addListeners();
                    _this.addedText.push(newText);
                    console.log(newText, _this.addedText);
                    _this.textInput.value = "";
                }
            }
        };
        this.moveText = function (e) {
            var mouseX = e.clientX;
            var mouseY = e.clientY;
            var text = e.target;
            console.log(text.offsetHeight, text.offsetWidth);
            if (text && _this.dragging) {
                text.style.left = mouseX - text.offsetWidth / 2 + "px";
                text.style.top = mouseY - text.offsetHeight / 2 + "px";
            }
        };
        this.updateTextCords = function (e, id) {
            var _a = _this.canvas.getBoundingClientRect(), left = _a.left, top = _a.top;
            var updatedText = e.target;
            var mouseX = e.clientX - updatedText.offsetWidth / 2 - e.offsetX / 2;
            var mouseY = e.clientY + updatedText.offsetHeight / 2 - e.offsetY / 2;
            console.log("clientY: " + e.clientY + ", e.target.offsetHeight / 2: " + updatedText.offsetHeight /
                2 + ", e.offsetY: " + e.offsetY);
            console.log(updatedText.offsetLeft - left, updatedText.offsetTop - top);
            var newTexts = _this.addedText.map(function (text) {
                if (id === text.id) {
                    text.x = updatedText.offsetLeft - left;
                    text.y = updatedText.offsetTop - top + updatedText.offsetHeight;
                }
                return text;
            });
            _this.addedText = newTexts;
            console.log(_this.addedText);
        };
        this.deleteText = function (id) {
            var filterdTexts = _this.addedText.filter(function (text) {
                return text.id !== id;
            });
            _this.addedText = filterdTexts;
            var text = document.querySelector("#" + id);
            text && text.remove();
        };
        this.changeTextSize = function (size) {
            _this.textSize = size;
        };
        this.changeTextColor = function (color) {
            _this.textColor = color;
        };
    }
    return Text;
}());
exports.Text = Text;
