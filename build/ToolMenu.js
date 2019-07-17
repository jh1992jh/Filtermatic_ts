"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ToolMenu = /** @class */ (function () {
    function ToolMenu() {
        var _this = this;
        this.showToolMenu = null;
        this.paintTool = document.querySelector("#paint_tool");
        this.textTool = document.querySelector("#text_tool");
        this.paintToolMenu = document.querySelector("#paint_tool_menu");
        this.textToolMenu = document.querySelector("#text_tool_menu");
        this.addListeners = function () {
            _this.paintTool &&
                _this.paintTool.addEventListener("click", function (e) {
                    return _this.toggleToolMenu(e);
                });
            _this.textTool &&
                _this.textTool.addEventListener("click", function (e) {
                    _this.toggleToolMenu(e);
                });
            var closeBtns = document.querySelectorAll(".close_toolmenu");
            closeBtns.forEach(function (button) {
                button.addEventListener("click", function (e) { return (e.target.parentElement.style.display = "none"); });
            });
        };
        this.toggleToolMenu = function (e) {
            if (e.target &&
                e.target.id === "paint_tool" &&
                _this.paintToolMenu &&
                _this.textToolMenu) {
                _this.textToolMenu.style.display = "none";
                _this.paintToolMenu.style.display = "flex";
            }
            else if (e.target.id === "text_tool" &&
                _this.paintToolMenu &&
                _this.textToolMenu) {
                _this.paintToolMenu.style.display = "none";
                _this.textToolMenu.style.display = "flex";
            }
            else if (e.target.className === "close") {
                console.log(e.target.parentElement);
            }
        };
    }
    return ToolMenu;
}());
exports.ToolMenu = ToolMenu;
