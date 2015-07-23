var TM = function(j) {
    function g(a, b) {
        this.msv = a;
        this._funcs = b;
        this._funcs || (this._funcs = []);
        var c = this;
        this.play = function() {
            c._funcs.play ? c._funcs.play.call(this) : c.msv.update(null, 1, null)
        };
        this.pause = function() {
            c._funcs.pause ? c._funcs.pause.call(c) : c.msv.update(null, 0, null)
        };
        this.beginning = function() {
            c._funcs.beginning ? c._funcs.beginning.call(this) : c.msv.update(0, null, null)
        };
        this.live = function() {
            c._funcs.live ? c._funcs.live.call(this) : console.log("No Live")
        };
        this.ff = function() {
            c._funcs.ff ? c._funcs.ff.call(this) :
                c.msv.update(null, 10, null)
        };
        this.fr = function() {
            c._funcs.fr ? c._funcs.fr.call(this) : c.msv.update(null, -10, null)
        };
        this.update = function() {
            c.msv.query()
        };
        this.update_time = function(h, b) {
            h.html(b.call(c, c.msv.query().pos))
        };
        this.time_formatter = function(b) {
            var a = Math.floor(b / 86400),
                e = Math.floor((b - 86400 * a) / 3600),
                d = Math.floor((b - 86400 * a - 3600 * e) / 60),
                f = c.msv.query().vel;
            b = 1 > Math.abs(f) ? (b - 86400 * a - 3600 * e - 60 * d).toFixed(2) : Math.floor(b - 86400 * a - 3600 * e - 60 * d);
            f = "";
            1 < a ? f = a + " days " : 0 < a && (f = a + " day ");
            1 < e ? f += e + " hours " :
                0 < e && (f += e + " hour ");
            1 < d ? f += d + " mins " : 0 < d && (f += d + " min ");
            return 1 < b ? f + (b + " secs ") : f + (b + " sec ")
        };
        this.date_formatter = function(b) {
            return new Date(1E3 * b)
        };
        this.default_formatter = function(b) {
            return b.toFixed(2)
        };
        this.int_formatter = function(b) {
            return b.toFixed(0)
        }
    }

    function k(a, b, c, h) {
        html = '<div class="ui-widget ui-corner-all">';
        c && (html += '<div class="title" id="title">' + c + "</div>");
        h && (html += '<span id="' + b + '" class="ui-widget-header ui-corner-all ui-buttonset">', d++, html += '<button id="btnstart">Go to start</button>',
            html += '<button id="btnrewind">Go fast(er) backwards</button>', html += '<button id="btnplay">Play</button>', html += '<button id="btnstop">Stop</button>', html += '<button id="btnforward">Fast(er) forward</button>', html += '<button id="btnend">Live</button>');
        html += "</span>";
        html += ' <div  class="clock" id="' + b + '_time"></div>';
        return html += "</div>"
    }
    var d = 0;
    g.prototype.toString = function() {
        return "ControlBar for " + this.msv.src
    };
    g.prototype.attach = function(a, b, c, h) {
        var m = "msvcb" + d;
        d++;
        var e = this;
        a.html(k(e.msv, m,
            c, h));
        var g = $(a.find(".clock"));
        b || (b = this.default_formatter);
        e._do_update = function() {
            e.update_time.call(e, g, b)
        };
        h && $(function() {
            a.find("#btnstart").button({
                text: !1,
                icons: {
                    primary: "ui-icon-seek-first"
                }
            }).click(function() {
                e.beginning()
            });
            a.find("#btnrewind").button({
                text: !1,
                icons: {
                    primary: "ui-icon-seek-prev"
                }
            }).click(function() {
                e.fr()
            });
            a.find("#btnplay").button({
                text: !1,
                icons: {
                    primary: "ui-icon-play"
                }
            }).click(function() {
                e.play()
            });
            a.find("#btnstop").button({
                text: !1,
                icons: {
                    primary: "ui-icon-stop"
                }
            }).click(function() {
                e.pause()
            });
            a.find("#btnforward").button({
                text: !1,
                icons: {
                    primary: "ui-icon-seek-next"
                }
            }).click(function() {
                e.ff()
            });
            a.find("#btnend").button({
                text: !1,
                icons: {
                    primary: "ui-icon-seek-end"
                }
            }).click(function() {
                e.live()
            })
        });
        e.msv.on("change", function() {
            e._do_update.call(e);
            0 != e.msv.query().vel ? null == e._timer && (e._timer = window.setInterval(e._do_update, 500)) : e._timer && (clearTimeout(e._timer), e._timer = null)
        });
        this.update()
    };
    j.ControlBar = g;
    return j
}(TM || {});
TM = function(j) {
    function g(d, a) {
        this.msv = d;
        this._options = a;
        this._timer = null;
        a.type || (a.type = "handle");
        void 0 === this._options.animateTime && (this._options.animateTime = 100);
        void 0 === this._options.frequency && (this._options.frequency = 150);
        d || (this._options.frequency = 0);
        "function" == typeof a.min ? this._minFunc = a.min : this._min = a.min || d.getInfo().range[0];
        "function" == typeof a.max ? this._maxFunc = a.max : this._max = a.max || d.getInfo().range[1];
        if (void 0 == a.max || void 0 == a.min) throw "Need ranges for slider";
        void 0 == this._options.control &&
            (this._options.control = !0)
    }

    function k() {
        return '<div class="sliderbox"><div class="slider"><div class="completed"></div></div> </div>'
    }
    g.prototype.attach = function(d, a) {
        this._htmlElem = d;
        a && (this.onchange = a);
        $(d).html(k);
        var b = this,
            c = $(d);
        this.getMinMax = function() {
            var a = b._minFunc ? b._minFunc.call() : b._min,
                c = b._maxFunc ? b._maxFunc.call() : b._max;
            return [a, c]
        };
        if (!0 == this._options.control) c.find(".sliderbox").on("click", function(a) {
            var c = a.offsetX ? a.offsetX : a.pageX - $(a.currentTarget).position().left;
            a = a.currentTarget.clientWidth;
            c /= a;
            b.onchange ? b.onchange.call(this, 100 * c) : (a = b.getMinMax(), c *= a[1] - a[0], b.msv && b.msv.update(c))
        });
        b.msv && (b.msv.on("timeupdate", function() {
            b.update()
        }), b.msv.on("change", function() {
            var a = b.getMinMax(),
                a = b.msv.query().pos / (a[1] - a[0]);
            "handle" == b._options.type ? b._htmlElem.find(".completed").animate({
                left: Math.min(100 * a, 98) + "%"
            }, b._options.animateTime) : b._htmlElem.find(".completed").animate({
                width: Math.min(100 * a, 100) + "%"
            }, b._options.animateTime)
        }))
    };
    g.prototype.update = function() {
        var d = this.getMinMax(),
            d = this.msv.query().pos / (d[1] - d[0]);
        "handle" == this._options.type ? this._htmlElem.find(".completed").animate({
            left: Math.min(100 * d, 98) + "%"
        }, this._options.animateTime) : this._htmlElem.find(".completed").animate({
            width: 100 * d + "%"
        }, this._options.animateTime)
    };
    g.prototype.setFraction = function(d) {
        var a = $(this._htmlElem).find(".completed");
        "handle" == this._options.type ? a.animate({
            left: Math.min(100 * d, 98) + "%"
        }, this._options.animateTime) : a.animate({
            width: 100 * d + "%"
        }, this._options.animateTime)
    };
    j.Slider = g;
    j.JQSlider =
        function(d, a, b) {
            var c = !1;
            b = b || {};
            b.policy = b.policy || function() {
                return 100
            };
            var h = !1,
                g, e = function() {
                    if (!b.range) {
                        var c = a.getInfo().range,
                            d = !isNaN(parseFloat(c[0])) && isFinite(c[0]) ? c[0] : 0,
                            c = !isNaN(parseFloat(c[1])) && isFinite(c[1]) ? c[1] : 10;
                        b.range = [d, c]
                    }
                },
                j = !1;
            e();
            d.slider({
                min: 0,
                max: 100,
                step: 0.05,
                change: function(d, e) {
                    var g;
                    void 0 !== d.originalEvent && (c = !0, g = b.range[0], g += e.value * (b.range[1] - g) / 100, a.update(g, null, null), c = !1)
                },
                start: function() {
                    c = !0
                }
            });
            g = d.find(".ui-slider-handle");
            g.hide();
            a.on("timeupdate",
                function() {
                    !1 === j && (j = !0, "rw" !== a.getInfo().cred && d.slider("disable"));
                    e();
                    var f, l;
                    if (!1 === c) {
                        f = a.query().pos;
                        l = b.range[0];
                        var k = b.range[1];
                        l = f <= l ? 0 : f >= k ? 100 : 100 * (f - l) / (k - l);
                        f = f < b.range[0] ? !1 : f > b.range[1] ? !1 : !0;
                        if (h || f) !h && f ? g.show() : h && !f && g.hide(), h = f, d.slider("option", "value", l)
                    }
                })
        };
    return j
}(TM || {});
