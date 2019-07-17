"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Filters = /** @class */ (function () {
    function Filters(filters, selectedFilter, ctx) {
        var _this = this;
        this.filters = filters;
        this.selectedFilter = selectedFilter;
        this.ctx = ctx;
        this.setupFilterMenu = function () {
            var menu = document.querySelector(".filter_menu");
            if (menu) {
                _this.filters.forEach(function (filter) {
                    menu.innerHTML += "\n        <div class=\"menu_item menu_filter\" id=\"" + filter.title + "\" style=\"background: rgba(" + (filter.r + 100) + ", " + (filter.g +
                        100) + ", " + (filter.b + 100) + ", 0.5)\">\n          <span id=\"" + filter.title + "\">" + filter.title + "</span>\n        </div>\n        ";
                });
            }
            var menu_filters = document.querySelectorAll(".menu_filter");
            menu_filters.forEach(function (filter) {
                return filter.addEventListener("click", function (e) {
                    return _this.selectFilter(e);
                });
            });
        };
        this.selectFilter = function (e) {
            var filterTitle = e.target.id;
            var filter = _this.filters.filter(function (filter) { return filter.title === filterTitle; });
            _this.selectedFilter = filter[0];
        };
        this.addFilter = function () {
            var pixels = _this.ctx.getImageData(0, 0, 500, 500);
            var _a = _this.selectedFilter, r = _a.r, g = _a.g, b = _a.b;
            for (var i = 0; i < pixels.data.length; i += 4) {
                pixels.data[i + 0] = pixels.data[i + 0] + r; // RED
                pixels.data[i + 1] = pixels.data[i + 1] + g; // GREEN
                pixels.data[i + 2] = pixels.data[i + 2] + b; // Blue
            }
            _this.ctx.putImageData(pixels, 0, 0);
        };
    }
    return Filters;
}());
exports.Filters = Filters;
