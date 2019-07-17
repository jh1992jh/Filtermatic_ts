"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PaintBrush = /** @class */ (function () {
    function PaintBrush(canvas, ctx) {
        var _this = this;
        this.canvas = canvas;
        this.ctx = ctx;
        this.painting = false;
        this.brushWidth = 5;
        this.brushColor = "#37ccc9";
        this.changeWidthBtns = document.querySelectorAll(".change_bw");
        this.changeColor = document.querySelector(".change_bc");
        this.addListeners = function () {
            var handleEvent = function (e) {
                switch (e.type) {
                    case "mousedown":
                        _this.painting = true;
                        break;
                    case "mouseup":
                        _this.painting = false;
                        break;
                    case "mousemove":
                        _this.painting && _this.addPaint(e);
                        break;
                    case "mouseleave":
                        _this.painting = false;
                        break;
                }
            };
            "mousedown mouseup mousemove mouseleave".split(" ").map(function (name) {
                console.log("Adding listener " + name + " to canvas");
                _this.canvas.addEventListener(name, handleEvent, false);
            });
            if (_this.changeWidthBtns) {
                _this.changeWidthBtns.forEach(function (button) {
                    button.addEventListener("click", function (e) {
                        if (e.target) {
                            _this.changeBrushWidth(parseInt(e.target.textContent));
                        }
                    });
                });
            }
            if (_this.changeColor) {
                _this.changeColor.addEventListener("change", function (e) {
                    _this.changeBrushColor(e.target.value);
                });
            }
        };
        this.addPaint = function (e) {
            var mouseX = e.clientX;
            var mouseY = e.clientY;
            _this.ctx.strokeStyle = _this.brushColor;
            _this.ctx.lineWidth = _this.brushWidth;
            _this.ctx.lineJoin = "round";
            _this.ctx.lineCap = "round";
            _this.ctx.beginPath();
            var _a = _this.canvas.getBoundingClientRect(), left = _a.left, top = _a.top;
            _this.ctx.moveTo(mouseX - left, mouseY - top);
            _this.ctx.lineTo(mouseX - left, mouseY - top);
            _this.ctx.stroke();
        };
        this.changeBrushWidth = function (width) {
            _this.brushWidth = width;
        };
        this.changeBrushColor = function (color) {
            _this.brushColor = color;
        };
    }
    return PaintBrush;
}());
exports.PaintBrush = PaintBrush;
