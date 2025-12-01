"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (e, n, t) {
  function o(e) {
    var n = c.className,
        t = Modernizr._config.classPrefix || "";

    if (p && (n = n.baseVal), Modernizr._config.enableJSClass) {
      var o = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");
      n = n.replace(o, "$1" + t + "js$2");
    }

    Modernizr._config.enableClasses && (n += " " + t + e.join(" " + t), p ? c.className.baseVal = n : c.className = n);
  }

  function a() {
    return "function" != typeof n.createElement ? n.createElement(arguments[0]) : p ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments);
  }

  function i(e, n) {
    return _typeof(e) === n;
  }

  function A() {
    var e, n, t, o, a, A, s;

    for (var r in u) {
      if (u.hasOwnProperty(r)) {
        if (e = [], n = u[r], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (t = 0; t < n.options.aliases.length; t++) {
          e.push(n.options.aliases[t].toLowerCase());
        }

        for (o = i(n.fn, "function") ? n.fn() : n.fn, a = 0; a < e.length; a++) {
          A = e[a], s = A.split("."), 1 === s.length ? Modernizr[s[0]] = o : (!Modernizr[s[0]] || Modernizr[s[0]] instanceof Boolean || (Modernizr[s[0]] = new Boolean(Modernizr[s[0]])), Modernizr[s[0]][s[1]] = o), f.push((o ? "" : "no-") + s.join("-"));
        }
      }
    }
  }

  function s(e, n) {
    if ("object" == _typeof(e)) for (var t in e) {
      m(e, t) && s(t, e[t]);
    } else {
      e = e.toLowerCase();
      var a = e.split("."),
          i = Modernizr[a[0]];
      if (2 == a.length && (i = i[a[1]]), "undefined" != typeof i) return Modernizr;
      n = "function" == typeof n ? n() : n, 1 == a.length ? Modernizr[a[0]] = n : (!Modernizr[a[0]] || Modernizr[a[0]] instanceof Boolean || (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])), Modernizr[a[0]][a[1]] = n), o([(n && 0 != n ? "" : "no-") + a.join("-")]), Modernizr._trigger(e, n);
    }
    return Modernizr;
  }

  function r() {
    var e = n.body;
    return e || (e = a(p ? "svg" : "body"), e.fake = !0), e;
  }

  function l(e, t, o, i) {
    var A,
        s,
        l,
        f,
        u = "modernizr",
        d = a("div"),
        p = r();
    if (parseInt(o, 10)) for (; o--;) {
      l = a("div"), l.id = i ? i[o] : u + (o + 1), d.appendChild(l);
    }
    return A = a("style"), A.type = "text/css", A.id = "s" + u, (p.fake ? p : d).appendChild(A), p.appendChild(d), A.styleSheet ? A.styleSheet.cssText = e : A.appendChild(n.createTextNode(e)), d.id = u, p.fake && (p.style.background = "", p.style.overflow = "hidden", f = c.style.overflow, c.style.overflow = "hidden", c.appendChild(p)), s = t(d, e), p.fake ? (p.parentNode.removeChild(p), c.style.overflow = f, c.offsetHeight) : d.parentNode.removeChild(d), !!s;
  }

  var f = [],
      u = [],
      d = {
    _version: "3.6.0",
    _config: {
      classPrefix: "",
      enableClasses: !0,
      enableJSClass: !0,
      usePrefixes: !0
    },
    _q: [],
    on: function on(e, n) {
      var t = this;
      setTimeout(function () {
        n(t[e]);
      }, 0);
    },
    addTest: function addTest(e, n, t) {
      u.push({
        name: e,
        fn: n,
        options: t
      });
    },
    addAsyncTest: function addAsyncTest(e) {
      u.push({
        name: null,
        fn: e
      });
    }
  },
      Modernizr = function Modernizr() {};

  Modernizr.prototype = d, Modernizr = new Modernizr();
  var c = n.documentElement,
      p = "svg" === c.nodeName.toLowerCase(),
      h = d._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
  d._prefixes = h;
  var m;
  !function () {
    var e = {}.hasOwnProperty;
    m = i(e, "undefined") || i(e.call, "undefined") ? function (e, n) {
      return n in e && i(e.constructor.prototype[n], "undefined");
    } : function (n, t) {
      return e.call(n, t);
    };
  }(), d._l = {}, d.on = function (e, n) {
    this._l[e] || (this._l[e] = []), this._l[e].push(n), Modernizr.hasOwnProperty(e) && setTimeout(function () {
      Modernizr._trigger(e, Modernizr[e]);
    }, 0);
  }, d._trigger = function (e, n) {
    if (this._l[e]) {
      var t = this._l[e];
      setTimeout(function () {
        var e, o;

        for (e = 0; e < t.length; e++) {
          (o = t[e])(n);
        }
      }, 0), delete this._l[e];
    }
  }, Modernizr._q.push(function () {
    d.addTest = s;
  }), Modernizr.addAsyncTest(function () {
    function e(e, n, t) {
      function o(n) {
        var o = n && "load" === n.type ? 1 == a.width : !1,
            i = "webp" === e;
        s(e, i && o ? new Boolean(o) : o), t && t(n);
      }

      var a = new Image();
      a.onerror = o, a.onload = o, a.src = n;
    }

    var n = [{
      uri: "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=",
      name: "webp"
    }, {
      uri: "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==",
      name: "webp.alpha"
    }, {
      uri: "data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",
      name: "webp.animation"
    }, {
      uri: "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=",
      name: "webp.lossless"
    }],
        t = n.shift();
    e(t.name, t.uri, function (t) {
      if (t && "load" === t.type) for (var o = 0; o < n.length; o++) {
        e(n[o].name, n[o].uri);
      }
    });
  });
  var g = d.testStyles = l;
  Modernizr.addTest("touchevents", function () {
    var t;
    if ("ontouchstart" in e || e.DocumentTouch && n instanceof DocumentTouch) t = !0;else {
      var o = ["@media (", h.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
      g(o, function (e) {
        t = 9 === e.offsetTop;
      });
    }
    return t;
  }), Modernizr.addTest("details", function () {
    var e,
        n = a("details");
    return "open" in n ? (g("#modernizr details{display:block}", function (t) {
      t.appendChild(n), n.innerHTML = "<summary>a</summary>b", e = n.offsetHeight, n.open = !0, e = e != n.offsetHeight;
    }), e) : !1;
  }), A(), o(f), delete d.addTest, delete d.addAsyncTest;

  for (var v = 0; v < Modernizr._q.length; v++) {
    Modernizr._q[v]();
  }

  e.Modernizr = Modernizr;
}(window, document);
