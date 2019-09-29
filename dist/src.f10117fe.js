// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/helpers/randomId.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.ID = function () {
  return "_" + Math.random().toString(36).substr(2, 9);
};
},{}],"src/stickers/glasses1.png":[function(require,module,exports) {
module.exports = "/glasses1.7caede3e.png";
},{}],"src/stickers/glasses2.png":[function(require,module,exports) {
module.exports = "/glasses2.ead6836d.png";
},{}],"src/stickers/glasses3.png":[function(require,module,exports) {
module.exports = "/glasses3.633d6c23.png";
},{}],"src/stickers/grin1.png":[function(require,module,exports) {
module.exports = "/grin1.a07a68f9.png";
},{}],"src/stickers/tear1.svg":[function(require,module,exports) {
module.exports = "/tear1.eb5ca503.svg";
},{}],"src/stickers/sad1.svg":[function(require,module,exports) {
module.exports = "/sad1.51e1c82f.svg";
},{}],"src/stickers/smirk1.png":[function(require,module,exports) {
module.exports = "/smirk1.7d73e07c.png";
},{}],"src/stickers/unibrow1.svg":[function(require,module,exports) {
module.exports = "/unibrow1.5596dd7c.svg";
},{}],"src/stickers/teehee.png":[function(require,module,exports) {
module.exports = "/teehee.10ee74b7.png";
},{}],"src/stickers/lol.png":[function(require,module,exports) {
module.exports = "/lol.a3a9655e.png";
},{}],"src/stickers/zzz.png":[function(require,module,exports) {
module.exports = "/zzz.0abaa3a6.png";
},{}],"src/stickers/awesome.png":[function(require,module,exports) {
module.exports = "/awesome.74157346.png";
},{}],"src/stickers/cool.png":[function(require,module,exports) {
module.exports = "/cool.fd9224a8.png";
},{}],"src/stickers/exclamation.png":[function(require,module,exports) {
module.exports = "/exclamation.0143368f.png";
},{}],"src/stickers/question.png":[function(require,module,exports) {
module.exports = "/question.655affa9.png";
},{}],"src/stickers/dollar.png":[function(require,module,exports) {
module.exports = "/dollar.f15e8118.png";
},{}],"src/stickers/euro.png":[function(require,module,exports) {
module.exports = "/euro.9c2e95b8.png";
},{}],"src/stickers/britishPound.png":[function(require,module,exports) {
module.exports = "/britishPound.45972477.png";
},{}],"src/stickers/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var glasses1_png_1 = __importDefault(require("./glasses1.png"));

var glasses2_png_1 = __importDefault(require("./glasses2.png"));

var glasses3_png_1 = __importDefault(require("./glasses3.png"));

var grin1_png_1 = __importDefault(require("./grin1.png"));

var tear1_svg_1 = __importDefault(require("./tear1.svg"));

var sad1_svg_1 = __importDefault(require("./sad1.svg"));

var smirk1_png_1 = __importDefault(require("./smirk1.png"));

var unibrow1_svg_1 = __importDefault(require("./unibrow1.svg"));

var teehee_png_1 = __importDefault(require("./teehee.png"));

var lol_png_1 = __importDefault(require("./lol.png"));

var zzz_png_1 = __importDefault(require("./zzz.png"));

var awesome_png_1 = __importDefault(require("./awesome.png"));

var cool_png_1 = __importDefault(require("./cool.png"));

var exclamation_png_1 = __importDefault(require("./exclamation.png"));

var question_png_1 = __importDefault(require("./question.png"));

var dollar_png_1 = __importDefault(require("./dollar.png"));

var euro_png_1 = __importDefault(require("./euro.png"));

var britishPound_png_1 = __importDefault(require("./britishPound.png")); // NOTE ALL THE STICKERS HAVE TO BE 50x20 size


exports.stickers = [// HEADWEAR STICKERS
{
  title: "glasses1",
  src: glasses1_png_1.default,
  height: 20,
  width: 50,
  id: "glasses1_",
  x: 0,
  y: 0
}, {
  title: "glasses2",
  src: glasses2_png_1.default,
  height: 20,
  width: 50,
  id: "glasses2_",
  x: 0,
  y: 0
}, {
  title: "glasses3",
  src: glasses3_png_1.default,
  height: 20,
  width: 50,
  id: "glasses3_",
  x: 0,
  y: 0
}, // TEXT STICKERS
{
  title: "teehee",
  src: teehee_png_1.default,
  height: 40,
  width: 100,
  id: "teehee_",
  x: 0,
  y: 0
}, {
  title: "lol",
  src: lol_png_1.default,
  height: 40,
  width: 100,
  id: "lol_",
  x: 0,
  y: 0
}, {
  title: "zzz",
  src: zzz_png_1.default,
  height: 40,
  width: 100,
  id: "zzz_",
  x: 0,
  y: 0
}, {
  title: "awesome",
  src: awesome_png_1.default,
  height: 41,
  width: 158,
  id: "awesome_",
  x: 0,
  y: 0
}, {
  title: "cool",
  src: cool_png_1.default,
  height: 67,
  width: 98,
  id: "cool_",
  x: 0,
  y: 0
}, {
  title: "exclamation",
  src: exclamation_png_1.default,
  height: 67,
  width: 15,
  id: "exclamation_",
  x: 0,
  y: 0
}, {
  title: "question",
  src: question_png_1.default,
  height: 67,
  width: 31,
  id: "question_",
  x: 0,
  y: 0
}, {
  title: "dollar",
  src: dollar_png_1.default,
  height: 67,
  width: 31,
  id: "dollar_",
  x: 0,
  y: 0
}, {
  title: "euro",
  src: euro_png_1.default,
  height: 67,
  width: 31,
  id: "euro_",
  x: 0,
  y: 0
}, {
  title: "britishPound",
  src: britishPound_png_1.default,
  height: 67,
  width: 31,
  id: "britishPound_",
  x: 0,
  y: 0
}, // EMOJI STICKERS
{
  title: "grin1",
  src: grin1_png_1.default,
  height: 20,
  width: 50,
  id: "grin1_",
  x: 0,
  y: 0
}, {
  title: "tear1",
  src: tear1_svg_1.default,
  height: 34,
  width: 20.5,
  id: "tear1_",
  x: 0,
  y: 0
}, {
  title: "sad1",
  src: sad1_svg_1.default,
  height: 16,
  width: 28,
  id: "sad1_",
  x: 0,
  y: 0
}, {
  title: "smirk1",
  src: smirk1_png_1.default,
  height: 10,
  width: 30,
  id: "smirk1_",
  x: 0,
  y: 0
}, {
  title: "unibrow1",
  src: unibrow1_svg_1.default,
  height: 9,
  width: 48,
  id: "unibrow1_"
}];
},{"./glasses1.png":"src/stickers/glasses1.png","./glasses2.png":"src/stickers/glasses2.png","./glasses3.png":"src/stickers/glasses3.png","./grin1.png":"src/stickers/grin1.png","./tear1.svg":"src/stickers/tear1.svg","./sad1.svg":"src/stickers/sad1.svg","./smirk1.png":"src/stickers/smirk1.png","./unibrow1.svg":"src/stickers/unibrow1.svg","./teehee.png":"src/stickers/teehee.png","./lol.png":"src/stickers/lol.png","./zzz.png":"src/stickers/zzz.png","./awesome.png":"src/stickers/awesome.png","./cool.png":"src/stickers/cool.png","./exclamation.png":"src/stickers/exclamation.png","./question.png":"src/stickers/question.png","./dollar.png":"src/stickers/dollar.png","./euro.png":"src/stickers/euro.png","./britishPound.png":"src/stickers/britishPound.png"}],"src/Stickers.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var randomId_1 = require("./helpers/randomId");

var index_1 = require("./stickers/index");

var Stickers =
/** @class */
function () {
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
      var handleEvent = function handleEvent(e) {
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
        "click mouseenter mouseleave mousemove dblclick mousedown mouseup".split(" ").map(function (name) {
          sticker.addEventListener(name, handleEvent, false);
        });
      });
    };

    this.selectSticker = function (e) {
      var sticker = index_1.stickers.filter(function (sticker) {
        return sticker.title === e.target.id;
      });
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
        sticker.addEventListener("click", function (e) {
          return _this.selectSticker(e);
        });
      });
    };

    this.updateStickerCords = function (e, id) {
      var _a = _this.canvas.getBoundingClientRect(),
          left = _a.left,
          top = _a.top;

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

      var _a = _this.canvas.getBoundingClientRect(),
          left = _a.left,
          top = _a.top;

      var canvasStickerCenterY = _this.canvas.height / 2 - _this.selectedSticker.height / 2;
      var canvasStikcerCenterX = _this.canvas.width / 2 - _this.selectedSticker.width / 2;
      stickerImg.style.top = canvasStickerCenterY - top + "px";
      stickerImg.style.left = left + canvasStikcerCenterX + "px";

      var newSticker = __assign({}, _this.selectedSticker, {
        id: id,
        x: canvasStikcerCenterX + left,
        y: canvasStickerCenterY - top
      });

      _this.addedStickers.push(newSticker);
    };

    this.deleteSticker = function (e) {
      var id = e.target.id;
      _this.addedStickers = _this.addedStickers.filter(function (sticker) {
        return sticker.id !== id;
      });
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
        var _a = _this.modifiedSticker,
            title = _a.title,
            id = _a.id,
            x = _a.x,
            y = _a.y,
            height = _a.height,
            width = _a.width;
        _this.modifying = true;

        var _b = _this.canvas.getBoundingClientRect(),
            left = _b.left,
            top = _b.top;

        var modifyModal_1 = document.createElement("div");
        var stickerImg = document.createElement("img");
        var infoList_1 = document.createElement("ul"); // Cant't loop trough the obj to get both value and key because ISticker has no property index type string, :(

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
        var close = document.createElement("span");
        close.className = "close_modal";
        close.textContent = "X";
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
        modifyModal_1.appendChild(close);
        modifyModal_1.appendChild(incBtn);
        modifyModal_1.appendChild(decBtn);
        modifyModal_1.style.top = _this.modifiedSticker.y + "px";
        modifyModal_1.style.left = _this.modifiedSticker.x + "px";
        body && body.appendChild(modifyModal_1);
        incBtn.style.top = "30%";
        incBtn.style.right = "1em";
        decBtn.style.top = "60%";
        incBtn.style.right = "1em";
        incBtn.addEventListener("click", function () {
          return _this.changeSize("inc");
        });
        decBtn.addEventListener("click", function () {
          return _this.changeSize("dec");
        });
        close.addEventListener("click", function () {
          return modifyModal_1.remove();
        });
        delIcon.addEventListener("click", function () {
          return _this.deleteSticker(e);
        });
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
}();

exports.Stickers = Stickers;
},{"./helpers/randomId":"src/helpers/randomId.ts","./stickers/index":"src/stickers/index.ts"}],"src/Filters.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Filters =
/** @class */
function () {
  function Filters(filters, selectedFilter, ctx) {
    var _this = this;

    this.filters = filters;
    this.selectedFilter = selectedFilter;
    this.ctx = ctx;

    this.setupFilterMenu = function () {
      var menu = document.querySelector(".filter_menu");

      if (menu) {
        _this.filters.forEach(function (filter) {
          menu.innerHTML += "\n        <div class=\"menu_item menu_filter\" id=\"" + filter.title + "\" style=\"background: rgba(" + (filter.r + 100) + ", " + (filter.g + 100) + ", " + (filter.b + 100) + ", 0.5)\">\n          <span id=\"" + filter.title + "\">" + filter.title + "</span>\n        </div>\n        ";
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

      var filter = _this.filters.filter(function (filter) {
        return filter.title === filterTitle;
      });

      _this.selectedFilter = filter[0];
    };

    this.addFilter = function () {
      var pixels = _this.ctx.getImageData(0, 0, 500, 500);

      var _a = _this.selectedFilter,
          r = _a.r,
          g = _a.g,
          b = _a.b;

      for (var i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + r; // RED

        pixels.data[i + 1] = pixels.data[i + 1] + g; // GREEN

        pixels.data[i + 2] = pixels.data[i + 2] + b; // Blue
      }

      _this.ctx.putImageData(pixels, 0, 0);
    };
  }

  return Filters;
}();

exports.Filters = Filters;
},{}],"src/filters/filters.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filters = [{
  title: "lightBlue",
  r: 0,
  g: -7,
  b: 35.5
}, {
  title: "Brilliant Lavander",
  r: 6,
  g: -36,
  b: 15
}, {
  title: "Camouflage Green",
  r: 0,
  g: 14,
  b: -13
}, {
  title: "Azure Mist",
  r: 15,
  g: 30,
  b: 30
}, {
  title: "Amber",
  r: 5,
  g: -49,
  b: -70
}, {
  title: "Alien",
  r: -28,
  g: 2,
  b: -58
}, {
  title: "Cool Green",
  r: -91,
  g: 15,
  b: -36
}, {
  title: "Snow",
  r: 55,
  g: 50,
  b: 50
}, {
  title: "Sky Blue",
  r: -65,
  g: 6,
  b: 15
}, {
  title: "Lime",
  r: -50,
  g: 5,
  b: -50
}, {
  title: "Hot Pink",
  r: 25,
  g: -25,
  b: 0
}, {
  title: "Turquoise",
  r: -100,
  g: 16,
  b: 19
}];
},{}],"src/PaintBrush.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var PaintBrush =
/** @class */
function () {
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
      var handleEvent = function handleEvent(e) {
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

      var _a = _this.canvas.getBoundingClientRect(),
          left = _a.left,
          top = _a.top;

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
}();

exports.PaintBrush = PaintBrush;
},{}],"src/ToolMenu.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ToolMenu =
/** @class */
function () {
  function ToolMenu() {
    var _this = this;

    this.showToolMenu = null;
    this.paintTool = document.querySelector("#paint_tool");
    this.textTool = document.querySelector("#text_tool");
    this.infoTool = document.querySelector("#info_tool");
    this.paintToolMenu = document.querySelector("#paint_tool_menu");
    this.textToolMenu = document.querySelector("#text_tool_menu");
    this.infoToolMenu = document.querySelector("#info_tool_menu");

    this.addListeners = function () {
      _this.paintTool && _this.paintTool.addEventListener("click", function (e) {
        return _this.toggleToolMenu(e);
      });
      _this.textTool && _this.textTool.addEventListener("click", function (e) {
        _this.toggleToolMenu(e);
      });
      _this.infoTool && _this.infoTool.addEventListener("click", function (e) {
        _this.toggleToolMenu(e);
      });
      var closeBtns = document.querySelectorAll(".close_toolmenu");
      closeBtns.forEach(function (button) {
        button.addEventListener("click", function (e) {
          e.target.parentElement.style.display = "none";
        });
      });
    };

    this.toggleToolMenu = function (e) {
      if (e.target && e.target.id === "paint_tool" && _this.paintToolMenu && _this.textToolMenu && _this.infoToolMenu) {
        _this.textToolMenu.style.display = "none";
        _this.infoToolMenu.style.display = "none";
        _this.paintToolMenu.style.display = "flex";
      } else if (e.target.id === "text_tool" && _this.paintToolMenu && _this.textToolMenu && _this.infoToolMenu) {
        _this.paintToolMenu.style.display = "none";
        _this.infoToolMenu.style.display = "none";
        _this.textToolMenu.style.display = "flex";
      } else if (e.target && e.target.id === "info_tool" && _this.paintToolMenu && _this.textToolMenu && _this.infoToolMenu) {
        _this.paintToolMenu.style.display = "none";
        _this.textToolMenu.style.display = "none";
        _this.infoToolMenu.style.display = "flex";
      }
    };
  }

  return ToolMenu;
}();

exports.ToolMenu = ToolMenu;
},{}],"src/Text.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var randomId_1 = require("./helpers/randomId");

var Text =
/** @class */
function () {
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
        _this.addTextBtn.addEventListener("click", function () {
          return _this.addText();
        });
      }

      var handleEvent = function handleEvent(e) {
        switch (e.type) {
          case "click":
            break;

          case "mousedown":
            _this.dragging = true;
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
        "click mousedown mouseup mouseleave mousemove dblclick".split(" ").map(function (name) {
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
      changeColor && changeColor.addEventListener("change", function (e) {
        _this.changeTextColor(e.target.value);
      });
    };

    this.addText = function () {
      if (_this.textInput) {
        if (_this.textInput.value === "") return;
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

          if (newTextDom) {
            newText.offsetW = newTextDom && newTextDom.offsetWidth;
            newText.offsetH = newTextDom && newTextDom.offsetHeight;
          }

          _this.addListeners();

          _this.addedText.push(newText);

          _this.textInput.value = "";
        }
      }
    };

    this.moveText = function (e) {
      var mouseX = e.clientX;
      var mouseY = e.clientY;
      var text = e.target;

      if (text && _this.dragging) {
        text.style.left = mouseX - text.offsetWidth / 2 + "px";
        text.style.top = mouseY - text.offsetHeight / 2 + "px";
      }
    };

    this.updateTextCords = function (e, id) {
      var _a = _this.canvas.getBoundingClientRect(),
          left = _a.left,
          top = _a.top;

      var updatedText = e.target;
      var mouseX = e.clientX - updatedText.offsetWidth / 2 - e.offsetX / 2;
      var mouseY = e.clientY + updatedText.offsetHeight / 2 - e.offsetY / 2;

      var newTexts = _this.addedText.map(function (text) {
        if (id === text.id) {
          text.x = updatedText.offsetLeft - left;
          text.y = updatedText.offsetTop - top + updatedText.offsetHeight;
        }

        return text;
      });

      _this.addedText = newTexts;
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
}();

exports.Text = Text;
},{"./helpers/randomId":"src/helpers/randomId.ts"}],"src/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var Canvas =
/** @class */
function () {
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

        downloadScreen && downloadScreen.insertBefore(saveCanvas, downloadScreen.childNodes[2]);
        var link_1 = document.createElement("a");
        link_1.innerHTML = "Download image";

        var _a = saveCanvas.getBoundingClientRect(),
            left = _a.left,
            top = _a.top;

        var addedStickers_1 = _this.Stickers.addedStickers;
        var addedTexts = _this.Text.addedText;

        if (saveCtx_1 && addedStickers_1.length > 0) {
          var _loop_1 = function _loop_1(i) {
            var logoSvg = new Image();
            logoSvg.src = addedStickers_1[i].src;

            logoSvg.onload = function () {
              addedStickers_1[i].x !== undefined && addedStickers_1[i].y !== undefined && saveCtx_1.drawImage(logoSvg, addedStickers_1[i].x, addedStickers_1[i].y, addedStickers_1[i].width, Math.floor(addedStickers_1[i].height));
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
}();

if (canvas && imgInput && addTextBtn && addStickerBtn && addFilterBtn && ctx) {
  var NewCanvas_1 = new Canvas(canvas, new Stickers_1.Stickers(index_1.stickers, index_1.stickers[0], ctx, canvas), new Filters_1.Filters(filters_1.filters, filters_1.filters[0], ctx), new PaintBrush_1.PaintBrush(canvas, ctx), new Text_1.Text(canvas, ctx));
  var toolMenu = new ToolMenu_1.ToolMenu();
  NewCanvas_1.Text.addListeners();
  NewCanvas_1.setupCanvas();
  NewCanvas_1.Stickers.setupStickerMenu();
  NewCanvas_1.Filters.setupFilterMenu();
  NewCanvas_1.PaintBrush.addListeners();
  NewCanvas_1.addListeners();
  toolMenu.addListeners();
  imgInput.addEventListener("change", NewCanvas_1.uploadImg);
  addStickerBtn.addEventListener("click", function () {
    NewCanvas_1.Stickers.addSticker();
  });
  addFilterBtn.addEventListener("click", function () {
    NewCanvas_1.Filters.addFilter();
  });
}
},{"./Stickers":"src/Stickers.ts","./stickers/index":"src/stickers/index.ts","./Filters":"src/Filters.ts","./filters/filters":"src/filters/filters.ts","./PaintBrush":"src/PaintBrush.ts","./ToolMenu":"src/ToolMenu.ts","./Text":"src/Text.ts"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55025" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map