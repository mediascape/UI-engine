var TM = function(p) {
    function l(l, f, e) {
        function k() {
            a._reset();
            var b = a.$_htmlElem[0];
            if (0 == b.readyState) setTimeout(k, 100);
            else {
                var g = a._msv.query();
                0 == g.vel ? (b.paused || b.pause(), clearInterval(a.timer), a.timer = null, b.currentTime = g.pos + a._auto_skew + a._options.skew) : 1 > Math.abs(g.vel) ? (b.paused || b.pause(), b.currentTime = g.pos + a._auto_skew + a._options.skew) : b.paused && b.play()
            }
        }
        this.$_htmlElem = l;
        this._msv = f;
        if (!this._msv) throw "MISSING MSV";
        this._options = e;
        this._options ||
            (this._options = {});
        this._options.target || (this._options.target = 0.3);
        this._options.original_target = this._options.target;
        this._options.target = 5 * this._options.original_target;
        this._options.refresh || (this._options.refresh = 100);
        this._options.skew || (this._options.skew = 0);
        var a = this;
        this.timer = null;
        this.stats = [];
        this._auto_skew = this._init_skew = 0;
        this._no_adjust = !1;
        this._shaky = this._perfect = this._last_update = 0;
        this.avg_stats = [];
        this._reset = function() {
            a.stats = [];
            a.avg_stats = [];
            a._auto_skew = 0;
            a.last_update =
                0;
            a._perfect = 0;
            a._shaky = 0;
            a._options.target = 5 * a._options.original_target;
            a._no_adjust = !1;
            setTimeout(a._reset_plot_data, 100)
        };
        this._reset_plot_data = function() {
            if (a._options.debug && plot_data)
                for (var b in plot_data) plot_data[b].data = []
        };
        this.$_htmlElem.on("paused", function() {
            1 == a._msv.query().vel && a.$_htmlElem[0].play()
        });
        this.$_htmlElem.on("play", function() {
            1 != a._msv.query().vel && a.$_htmlElem[0].pause()
        });
        this.$_htmlElem.on("error", function(a) {
            console.log("ERROR IN MEDIA ELEMENT");
            console.log(a)
        });
        this.$_htmlElem.on("paused", function() {
            1 == a._msv.query().vel && a.$_htmlElem[0].play()
        });
        this.$_htmlElem.on("timeupdate", function(b) {
            if (!a._no_adjust) {
                var g = a._msv.query(),
                    j = g.pos + a._options.skew;
                if (1 != g.vel) {
                    var h = g.pos + a._options.skew + a._options.target;
                    a.$_htmlElem[0].currentTime = h
                } else {
                    g = j - this.currentTime;
                    a.stats.push(g);
                    10 < a.stats.length && (a.stats = a.stats.splice(a.stats.length - 10, 10));
                    10 < a.avg_stats.length && (a.avg_stats = a.avg_stats.splice(a.avg_stats.length - 10, 10));
                    var d = 1E5,
                        e = 0,
                        t = 0,
                        n;
                    for (n in a.stats) t =
                        a.stats[n], d = Math.min(d, a.stats[n]), e = Math.max(e, a.stats[n]);
                    t ? (t /= 5, a.avg_stats.push(t)) : t = g;
                    if (-2 >= a._perfect) {
                        d = 0;
                        for (n in a.avg_stats) d = Math.max(d, a.avg_stats[n]);
                        a._options.target = Math.min(1, Math.max(0.9 * a._options.target, Math.max(1.4 * d, a._options.original_target)));
                        a._perfect = 0
                    } else if (15 < a._perfect) {
                        d = 0;
                        for (n in a.avg_stats) d = Math.max(d, a.avg_stats[n]);
                        a._options.target = Math.max(1.2 * d, a._options.original_target);
                        a._perfect -= 5
                    }
                    1 < g && (a.last_update = 0);
                    a._options.debug && (plot_data && (plot_data[0].data.push([j, -g]), plot_data[1].data.push([j, a._auto_skew])), $("#diff").html(g.toFixed(3) + ", target:" + a._options.target.toFixed(3) + " perfect: " + a._perfect + " shaky: " + a._shaky), $("#ts").html(j.toFixed(3) + " skew: " + a._auto_skew.toFixed(3) + " avg: " + t.toFixed(3)));
                    if (Math.abs(g) > a._options.target) {
                        if (a._perfect -= 1, !(0 < a._perfect) && (a.stats = [], !(0.3 > j - a.last_update))) {
                            h = 0;
                            if (a.last_update) a._auto_skew += 0.5 * t, h = a._msv.query().pos + a._options.skew + a._auto_skew;
                            else if (1 > Math.abs(g)) a._auto_skew += 0.9 * g, h = a._msv.query().pos +
                                a._options.skew + a._options.target;
                            else {
                                var f = this,
                                    k = function(d) {
                                        function j() {
                                            if (!1 != a._no_adjust)
                                                if (0 == a._msv.query().vel) a._no_adjust = !1;
                                                else {
                                                    var b = h - (a._msv.query().pos + a._options.skew);
                                                    if (0 > b) return k(2 * d);
                                                    a.$_htmlElem.off("seeked", j);
                                                    setTimeout(function() {
                                                        a._no_adjust = !1;
                                                        f.play()
                                                    }, 1E3 * b)
                                                }
                                        }
                                        a._no_adjust = !0;
                                        f.pause();
                                        h = a._msv.query().pos + a._options.skew + a._options.target + d;
                                        a.$_htmlElem.on("seeked", j);
                                        f.currentTime = h
                                    };
                                k(0.1);
                                return
                            }
                            a.last_update = j;
                            b.target.currentTime = h;
                            a._perfect += 2
                        }
                    } else a._perfect +=
                        1
                }
            }
        });
        this._msv.on("change", k);
        k()
    }
    l.prototype.setSkew = function(l) {
        this._options.skew = l
    };
    p.MediaSync2 = l;
    p.MediaSync = l;
    return p
}(TM || {});
TM = function(p) {
    function l(l, f, e) {
        function k() {
            a._reset();
            var h = a.$_htmlElem[0];
            if (0 == h.readyState) setTimeout(k, 100), console.log("WARNING: Media element not ready");
            else {
                var d = a._msv.query();
                0 == d.vel ? (h.paused || h.pause(), clearInterval(a.timer), a.timer = null, h.currentTime = d.pos + a._auto_skew + a._options.skew) : 1 > Math.abs(d.vel) ? (h.paused || h.pause(), h.currentTime = d.pos + a._auto_skew + a._options.skew) : h.paused && h.play()
            }
        }
        this.$_htmlElem = l;
        this._msv = f;
        if (!this._msv) throw "MISSING MSV";
        this._options = e;
        this._sync =
            "auto";
        this._current_diff = null;
        this.getDiff = function() {
            return this._current_diff
        };
        this._options || (this._options = {});
        this._options.target || (this._options.target = 0.03);
        this._options.original_target = this._options.target;
        this._options.target = 5 * this._options.original_target;
        this._options.refresh || (this._options.refresh = 100);
        this._options.skew || (this._options.skew = 0);
        var a = this;
        this.timer = null;
        this.stats = [];
        this._auto_skew = this._init_skew = 0;
        this._no_adjust = !1;
        this._shaky = this._perfect = this._last_update =
            0;
        this.avg_stats = [];
        this._reset = function() {
            a.stats = [];
            a.avg_stats = [];
            a._auto_skew = 0;
            a.last_update = 0;
            a._perfect = 0;
            a._shaky = 0;
            a._options.target = 5 * a._options.original_target;
            a._no_adjust = !1;
            setTimeout(a._reset_plot_data, 100)
        };
        this._reset_plot_data = function() {
            if (a._options.debug && plot_data)
                for (var h in plot_data) plot_data[h].data = []
        };
        this.$_htmlElem.on("paused", function() {
            1 == a._msv.query().vel && a.$_htmlElem[0].play()
        });
        this.$_htmlElem.on("play", function() {
            1 != a._msv.query().vel && a.$_htmlElem[0].pause()
        });
        this.$_htmlElem.on("error", function(a) {
            console.log("ERROR IN MEDIA ELEMENT");
            console.log(a)
        });
        this.$_htmlElem.on("paused", function() {
            1 == a._msv.query().vel && a.$_htmlElem[0].play()
        });
        var b = null,
            g = null,
            j = 0,
            h = function() {
                var b = a._msv.query(),
                    n = b.pos + a._options.skew - this.currentTime;
                a._current_diff = n;
                if (0 == b.vel || 1 < n) a.$_htmlElem[0].currentTime = b.pos + a._options.skew;
                else try {
                    this.playbackRate = a._msv.query().vel + 0.5 * n;
                    console.log(n + "," + this.playbackRate);
                    var e = Math.abs(n);
                    console.log(Math.abs(e - (g || e)));
                    if (0.01 < Math.abs(e - (g || e))) 10 < j ? (console.log("Variable playback rate seems broken"), $(this).off("timeupdate", h), $(this).on("timeupdate", d), a._sync = "BadPlaybackRate") : j += 1;
                    g = e
                } catch (f) {
                    a._sync = "NoPlaybackRate", console.log("Error setting variable playback speed - seems broken"), $(this).off("timeupdate", h), $(this).on("timeupdate", d)
                }
            },
            d = function(h) {
                if (!a._no_adjust) {
                    var d = a._msv.query(),
                        j = d.pos + a._options.skew;
                    if (1 != d.vel) {
                        var b = d.pos + a._options.skew + a._options.target;
                        h = a.$_htmlElem[0];
                        h.currentTime !=
                            b && (h.currentTime = b)
                    } else {
                        d = j - this.currentTime;
                        a._current_diff = d;
                        a.stats.push(d);
                        10 < a.stats.length && (a.stats = a.stats.splice(a.stats.length - 10, 10));
                        10 < a.avg_stats.length && (a.avg_stats = a.avg_stats.splice(a.avg_stats.length - 10, 10));
                        var e = 1E5,
                            g = 0,
                            f = 0,
                            k;
                        for (k in a.stats) f = a.stats[k], e = Math.min(e, a.stats[k]), g = Math.max(g, a.stats[k]);
                        f ? (f /= 5, a.avg_stats.push(f)) : f = d;
                        if (-2 >= a._perfect) {
                            e = 0;
                            for (k in a.avg_stats) e = Math.max(e, a.avg_stats[k]);
                            a._options.target = Math.min(1, Math.max(0.9 * a._options.target, Math.max(1.4 *
                                e, a._options.original_target)));
                            a._perfect = 0
                        } else if (15 < a._perfect) {
                            e = 0;
                            for (k in a.avg_stats) e = Math.max(e, a.avg_stats[k]);
                            a._options.target = Math.max(1.2 * e, a._options.original_target);
                            a._perfect -= 5
                        }
                        1 < d && (a.last_update = 0);
                        a._options.debug && (plot_data && (plot_data[0].data.push([j, -d]), plot_data[1].data.push([j, a._auto_skew])), $("#diff").html(d.toFixed(3) + ", target:" + a._options.target.toFixed(3) + " perfect: " + a._perfect + " shaky: " + a._shaky), $("#ts").html(j.toFixed(3) + " skew: " + a._auto_skew.toFixed(3) + " avg: " +
                            f.toFixed(3)));
                        if (Math.abs(d) > a._options.target && (a._perfect -= 1, !(0 < a._perfect) && (a.stats = [], !(0.3 > j - a.last_update)))) {
                            b = 0;
                            if (a.last_update) a._auto_skew += 0.5 * f, b = a._msv.query().pos + a._options.skew + a._auto_skew;
                            else if (1 > Math.abs(d)) a._auto_skew += 0.9 * d, b = a._msv.query().pos + a._options.skew + a._options.target;
                            else {
                                var l = this,
                                    B = function(d) {
                                        function h() {
                                            if (!1 != a._no_adjust)
                                                if (0 == a._msv.query().vel) a._no_adjust = !1;
                                                else {
                                                    var j = b - (a._msv.query().pos + a._options.skew);
                                                    if (0 > j) return B(2 * d);
                                                    a.$_htmlElem.off("seeked",
                                                        h);
                                                    setTimeout(function() {
                                                        a._no_adjust = !1;
                                                        l.play()
                                                    }, 1E3 * j)
                                                }
                                        }
                                        a._no_adjust = !0;
                                        l.pause();
                                        b = a._msv.query().pos + a._options.skew + a._options.target + d;
                                        a.$_htmlElem.on("seeked", h);
                                        l.currentTime = b
                                    };
                                B(0.1);
                                return
                            }
                            a.last_update = j;
                            h.target.currentTime = b;
                            a._perfect += 2
                        }
                    }
                }
            },
            B = function() {
                if (1 > this.readyState) b = null, a._sync = "NOTREADY", setTimeout(B, 100);
                else if (!b) {
                    try {
                        if (void 0 === this.playbackRate) {
                            a._sync = "NoPlaybackRate";
                            return
                        }
                        console.log(this.readyState);
                        this.playbackRate = 1.1;
                        this.playbackRate = 1;
                        b = h;
                        console.log("Using variable playback speed");
                        a._sync = "smooth"
                    } catch (j) {
                        a._sync = "v2", b = d, console.log("Variable playbackspeed not supported: " + j)
                    }
                    $(this).on("timeupdate", b)
                }
            };
        l.on("canplay", B);
        this._msv.on("change", k);
        k();
        B.call(l[0])
    }
    l.prototype.setSkew = function(l) {
        this._options.skew = l
    };
    p.MediaSync3 = l;
    return p
}(TM || {});
TM = function(p) {
    p.movingCursor = function(l, m) {
        var f = {},
            e = TM.sequencer(l),
            k = {
                change: [],
                remove: []
            },
            a = function(a, d, j) {
                if (!k.hasOwnProperty(a)) throw "Unsupported event " + a;
                for (var b, e = 0; e < k[a].length; e++) {
                    b = k[a][e];
                    if (void 0 === j) {
                        if (b._immediate_pending) continue
                    } else if (b === j) j._immediate_pending = !1;
                    else continue;
                    try {
                        b.call(f, d)
                    } catch (g) {
                        console.log("Error in " + a + ": " + b + ": " + g)
                    }
                }
            },
            b = function(h, d) {
                var j = m.getItem(h);
                a("change", {
                    key: h,
                    value: j,
                    newValue: j,
                    oldValue: void 0
                }, d)
            },
            g = function(a) {
                "object" === typeof a.value &&
                    (a.value.hasOwnProperty("start") || a.value.hasOwnProperty("end") ? e.setSpan(a.key, a.value.start, a.value.end).type === e.EFFECT_TYPE.NOOP && -1 < e.getActiveSpanKeys().indexOf(a.key) && b(a.key) : e.removeSpan(a.key))
            },
            j = function(a) {
                e.removeSpan(a.key)
            };
        m.hasOwnProperty("on") ? (m.on("change", g), m.on("remove", j)) : setTimeout(function() {
            for (var a, d = m.keys(), j = 0; j < d.length; j++) a = {
                key: d[j],
                value: m.getItem(d[j])
            }, g(a)
        }, 0);
        e.on("event", function(j) {
            for (var d, e = 0; e < j.length; e++) d = j[e], d.verbType === this.VERB_TYPE.ENTER ?
                b(d.key) : d.verbType === this.VERB_TYPE.LEAVE && a("remove", {
                    key: d.key,
                    value: void 0,
                    newValue: void 0,
                    oldValue: void 0
                }, void 0)
        });
        f.keys = e.getActiveSpanKeys;
        f.getItem = function(a) {
            return -1 < e.getActiveSpanKeys().indexOf(a) ? m.getItem(a) : null
        };
        f.on = function(a, j) {
            if (!j || "function" !== typeof j) throw "Illegal handler";
            if (!k.hasOwnProperty(a)) throw "Unsupported event " + a; - 1 === k[a].indexOf(j) && (j._immediate_pending = !0, k[a].push(j), setTimeout(function() {
                if ("change" === a) {
                    var g = e.getActiveSpanKeys();
                    if (0 === g.length) j._immediate_pending = !1;
                    else
                        for (var f = 0; f < g.length; f++) b(g[f], j)
                } else "remove" === a && (j._immediate_pending = !1)
            }, 0));
            return f
        };
        f.off = function(a, j) {
            if (void 0 !== k[a]) {
                var b = k[a].indexOf(j); - 1 < b && k[a].splice(b, 1)
            }
            return f
        };
        return f
    };
    return p
}(TM || {});
TM = function(p) {
    var l = function(a) {
            var b = parseFloat(a);
            return a == b && !isNaN(b)
        },
        m = function(a, b) {
            for (var d = [], e = 0; e < a.length; e++) {
                for (var g = !1, f = 0; f < b.length; f++)
                    if (a[e] === b[f]) {
                        g = !0;
                        break
                    }
                g || d.push(a[e])
            }
            return d
        },
        f = function(a, b, d) {
            var e = {},
                g = null,
                f = 0;
            d = d || {};
            var k = (new Date).getTime();
            d.anchor = d.anchor || k;
            d.early = Math.abs(d.early) || 0;
            var l = d.anchor + b,
                m = function() {
                    if (null !== g) {
                        var b = l - (new Date).getTime();
                        0 >= b ? (D(), a()) : b > d.early ? g = setTimeout(m, b - d.early) : (f++, window.postMessage("smalldelaymsg_" + g, "*"))
                    }
                },
                p = function(a) {
                    a.source == window && 0 == a.data.indexOf("smalldelaymsg_") && (a.stopPropagation(), a = parseInt(a.data.split("_")[1]), null !== g && g === a && m())
                },
                D = function() {
                    null !== g && (clearTimeout(g), g = null, window.removeEventListener("message", p, !0))
                };
            window.addEventListener("message", p, !0);
            b = l - (new Date).getTime();
            g = 4E3 < b ? setTimeout(m, b - 3E3) : setTimeout(m, b - d.early);
            e.cancel = D;
            return e
        },
        e = Object.freeze({
            LOW: "low",
            SINGULAR: "singular",
            HIGH: "high",
            INSIDE: "inside",
            OUTSIDE: "outside",
            toInteger: function(a) {
                if (a === e.LOW) return -1;
                if (a === e.HIGH) return 1;
                if (a === e.INSIDE) return 2;
                if (a === e.OUTSIDE) return 3;
                if (a === e.SINGULAR) return 0;
                throw "illegal string value for point type";
            },
            fromInteger: function(a) {
                if (-1 === a) return e.LOW;
                if (0 === a) return e.SINGULAR;
                if (1 === a) return e.HIGH;
                if (2 === a) return e.INSIDE;
                if (3 === a) return e.OUTSIDE;
                throw "illegal integer value for point type";
            }
        }),
        k = Object.freeze({
            NOOP: "noop",
            CREATE: "create",
            UPDATE: "update",
            REMOVE: "remove"
        }),
        a = function(a) {
            var b = {},
                d = [],
                e = {};
            b.update = function(a, j, g, f) {
                var k = d.indexOf(a); - 1 <
                    k && d.splice(k, 1);
                d.push(a);
                e[a] = {
                    key: a,
                    a: j,
                    b: g,
                    options: f
                };
                return b
            };
            b.send = function() {
                for (var b = [], g = 0; g < d.length; g++) {
                    var f = d[g];
                    e.hasOwnProperty(f) && b.push(e[f])
                }
                e = {};
                d = [];
                return 0 < b.length ? a.multi_update(b) : []
            };
            return b
        },
        b = Object.freeze({
            ENTER: "enter",
            STILL: "still",
            LEAVE: "leave",
            CHANGE: "change",
            toString: function(a) {
                if (a === b.ENTER) return "enter";
                if (a === b.STILL) return "still";
                if (a === b.LEAVE) return "leave";
                if (a === b.CHANGE) return "change";
                throw "illegal string value verb type " + a;
            },
            fromInteger: function(a) {
                if (-1 ===
                    a) return b.LEAVE;
                if (0 === a) return b.STILL;
                if (1 === a) return b.ENTER;
                if (3 === a) return b.CHANGE;
                throw "illegal integer value for direction type " + a;
            }
        }),
        g = Object.freeze({
            BACKWARDS: "backwards",
            FORWARDS: "forwards",
            NODIRECTION: "nodirection",
            toInteger: function(a) {
                if (a === g.BACKWARDS) return -1;
                if (a === g.FORWARDS) return 1;
                if (a === g.NODIRECTION) return 0;
                throw "illegal string value direction type";
            },
            fromInteger: function(a) {
                if (0 === a) return g.NODIRECTION;
                if (-1 === a) return g.BACKWARDS;
                if (1 === a) return g.FORWARDS;
                throw "illegal interger value for direction type";
            }
        });
    p.timeout = f;
    p.sequencer = function(j) {
        var h = {},
            d = {},
            p, t, n = [],
            x = function(a) {
                for (var c = 0, r = n.length - 1, y, b; c <= r;)
                    if (y = (c + r) / 2 | 0, b = n[y], b < a) c = y + 1;
                    else if (b > a) r = y - 1;
                else return y;
                return ~r
            },
            O = function(a) {
                var c = x(a);
                return 0 > c || 0 === c && n[0] !== a ? -1 : c
            },
            M = function() {
                return 0 < n.length ? n[0] : null
            },
            N = function() {
                return 0 < n.length ? n[n.length - 1] : null
            },
            D = function(a) {
                a = x(a);
                a = 0 > a ? Math.abs(a) - 1 : a - 1;
                return 0 <= a ? a : -1
            },
            P = function(a) {
                var c = x(a);
                if (0 < c || 0 === c && n[0] === a) return c;
                c = Math.abs(c) - 1;
                return 0 <= c ? c : -1
            },
            Q = function(a) {
                var c =
                    x(a);
                0 === c ? n[0] === a && (c = 1) : c = 0 > c ? Math.abs(c) : c + 1;
                return c < n.length ? c : -1
            },
            T = function(a) {
                var c = x(a);
                if (0 < c || 0 === c && n[0] === a) return c;
                c = Math.abs(c);
                return c < n.length ? c : -1
            },
            O = function(a) {
                var c = x(a);
                return 0 > c || 0 === c && n[0] !== a ? -1 : c
            };
        t = {
            insert: function(a) {
                var c = x(a);
                (0 > c || 0 === c && n[0] !== a) && n.splice(Math.abs(c), 0, a)
            },
            get_min: M,
            get_max: N,
            remove: function(a) {
                var c = x(a);
                0 > c || 0 === c && n[0] !== a || n.splice(c, 1)
            },
            indexOf: O,
            lookup: function(a, c, r) {
                var y = -1,
                    b = -1;
                r = r || {};
                void 0 === r.start_incl && (r.start_incl = !0);
                void 0 ===
                    r.end_incl && (r.end_incl = !0);
                a = l(a) ? a : M();
                c = l(c) ? c : N();
                y = r.start_incl ? T(a) : Q(a);
                if (-1 === y) return [];
                b = r.end_incl ? P(c) : D(c);
                return -1 === b ? [] : n.slice(y, b + 1)
            },
            hasElement: function(a) {
                var c = x(a);
                return 0 > c || 0 === c && n[0] !== a ? !1 : !0
            },
            le_indexOf: P,
            lt_indexOf: D,
            ge_indexOf: T,
            gt_indexOf: Q,
            get: function(a) {
                return n[a]
            },
            list: function() {
                return n
            }
        };
        var E = {},
            R = function(a) {
                for (var c, r, b = [], d = 0; d < a.length; d++) c = a[d][0], r = a[d][1], t.hasElement(c) || (t.insert(c), E[c] = []), c = E[c], -1 === c.indexOf(r) && (c.push(r), b.push(a[d]));
                return b
            },
            S = function(a) {
                for (var c, r, b = [], d = 0; d < a.length; d++)
                    if (c = a[d][0], r = a[d][1], t.hasElement(c)) {
                        var e = E[c];
                        r = e.indexOf(r); - 1 < r && (e.splice(r, 1), b.push(a[d]), 0 === e.length && (t.remove(c), delete E[c]))
                    }
                return b
            };
        p = {
            insert: function(a, c) {
                return R([
                    [a, c]
                ])
            },
            insert_many: R,
            remove: function(a, c) {
                return S([
                    [a, c]
                ])
            },
            remove_many: S,
            lookup: function(a, c, r) {
                var b = [];
                r = t.lookup(a, c, r);
                for (var d = 0; d < r.length; d++) {
                    c = r[d];
                    a = E[c];
                    for (var e = 0; e < a.length; e++) b.push([c, a[e]])
                }
                return b
            }
        };
        var s = {},
            H = function(a, c) {
                var b;
                b = s[c];
                if (a ===
                    b[0] && a === b[1]) b = e.SINGULAR;
                else if (a === b[0]) b = e.LOW;
                else if (a === b[1]) b = e.HIGH;
                else throw "x does not belong to span";
                return {
                    point: a,
                    pointType: b,
                    key: c
                }
            },
            z = function(a) {
                var c = s[a];
                return {
                    key: a,
                    low: c[0],
                    high: c[1],
                    includeLow: c[2],
                    includeHigh: c[3]
                }
            },
            I = function(a) {
                for (var c = {}, b, y, d = 0; d < a.length; d++) b = a[d], y = Z(b.key, b.a, b.b, b.options), c[b.key] = y;
                a = [];
                for (var e in c) c.hasOwnProperty(e) && a.push(c[e]);
                return a
            },
            Z = function(a, c, b, d) {
                var e, g, j;
                if (void 0 === c && void 0 === b) {
                    if (!s.hasOwnProperty(a)) return {
                        type: k.NOOP,
                        info: void 0
                    };
                    j = z(a);
                    d = j.low;
                    c = j.high;
                    p.remove_many([
                        [d, a],
                        [c, a]
                    ]);
                    delete s[a];
                    return {
                        type: k.REMOVE,
                        info: j
                    }
                }
                void 0 === c && (c = -Infinity);
                void 0 === b && (b = Infinity);
                if (!l(c) || !l(b)) throw "a or b not a number";
                d = d || {};
                e = void 0 !== d.includeLow ? d.includeLow : !0;
                g = void 0 !== d.includeHigh ? d.includeHigh : !1;
                d = Math.min(c, b);
                c = Math.max(c, b);
                if (s.hasOwnProperty(a)) {
                    j = z(a);
                    b = j.low;
                    j = j.high;
                    if (d === b && c === j) return {
                        type: k.NOOP,
                        info: z(a)
                    };
                    s[a] = [d, c, e, g];
                    d !== b && (p.remove(b, a), p.insert(d, a));
                    c !== j && (p.remove(j, a), p.insert(c,
                        a));
                    return {
                        type: k.UPDATE,
                        info: z(a)
                    }
                }
                s[a] = [d, c, e, g];
                p.insert_many([
                    [d, a],
                    [c, a]
                ]);
                return {
                    type: k.CREATE,
                    info: z(a)
                }
            };
        d.get_builder = function() {
            var b = a({
                multi_update: I
            });
            b.create = b.update;
            b.remove = b.update;
            return b
        };
        d.update = function(a, c, b, d) {
            return I([{
                key: a,
                a: c,
                b: b,
                options: d
            }])
        };
        d.create = d.update;
        d.remove = d.update;
        d.multi_update = I;
        d.get_span = function(a) {
            return !s.hasOwnProperty(a) ? null : z(a)
        };
        d.get_point = function(a, c) {
            return !s.hasOwnProperty(c) ? null : H(a, c)
        };
        d.get_keys = function() {
            var a = [],
                c;
            for (c in s) s.hasOwnProperty(c) &&
                a.push(c);
            return a
        };
        d.find_points = function(a, c, b) {
            var d = [];
            b = p.lookup(a, c, b);
            for (var e = 0; e < b.length; e++) a = b[e][0], c = b[e][1], s.hasOwnProperty(c) && d.push(H(a, c));
            return d
        };
        d.find_keys = function(a) {
            var c, b = [],
                d;
            for (d in s)
                if (s.hasOwnProperty(d)) {
                    c = s[d];
                    var e;
                    e = a;
                    if (e === c[0] && e === c[1]) e = !0;
                    else {
                        var g = c[3] ? e <= c[1] : e < c[1];
                        e = (c[2] ? c[0] <= e : c[0] < e) && g
                    }
                    e && b.push(d)
                }
            return b
        };
        d.get_span_info = z;
        d.get_point_info = H;
        var v, G = null,
            A = [],
            U = !0,
            u = {
                event: []
            },
            V = function(a) {
                if (j.readyState === j.STATE.CLOSED) throw "Update failed: Msv closed";
                var c, b, e, g = d.multi_update(a);
                if (!v) return g;
                var f = [];
                for (a = 0; a < g.length; a++) c = g[a], c.type !== k.NOOP && f.push(c);
                var l = MSV.client_clock(),
                    h = MSV.compute_msv(j.getInfo().vector, l),
                    q = h[MSV.P],
                    n = [],
                    m = [];
                for (a = 0; a < f.length; a++) {
                    c = f[a];
                    e = c.info;
                    b = c.info.key;
                    b = -1 < A.indexOf(b);
                    var p = !1;
                    if (c.type === k.CREATE || c.type === k.UPDATE) q === e.low && q === e.high ? c = !0 : (c = e.includeHigh ? q <= e.high : q < e.high, c = (e.includeLow ? e.low <= q : e.low < q) && c), c && (p = !0);
                    b && !p ? m.push(e) : !b && p && n.push(e)
                }
                J(l, h, m, n);
                if (h = MSV.is_moving(h))
                    for (a = 0; a <
                        f.length; a++) c = f[a], b = c.info.key, v.invalidate(b);
                else v.advance(l);
                q = [];
                for (a = 0; a < f.length; a++) c = f[a], e = c.info, b = c.info.key, c.type !== k.REMOVE && h && (c = e.low, n = e.high, m = v.get_pos_interval(), null !== m && (m[0] <= c && c <= m[1] && (e = d.get_point(c, b)) && q.push(e), m[0] <= n && n <= m[1] && n !== c && (e = d.get_point(n, b)) && q.push(e)));
                0 < q.length && K(l, q);
                L(l);
                return g
            },
            L = function(a) {
                null !== G && (G.cancel(), G = null);
                a = a || MSV.client_clock();
                W(a);
                var c = MSV.is_moving(j.getInfo().vector);
                c && v.is_expired(a) && (a = v.get_time_interval()[1],
                    v.advance(a), K(a), W(a));
                c && (a = MSV.client_clock(), c = v.get_delay_next_ts(a), G = f(L, 1E3 * c, {
                    anchor: 1E3 * a,
                    early: 0.5
                }))
            },
            K = function(a, c) {
                if (MSV.is_moving(j.getInfo().vector)) {
                    var b = v.get_time_interval(),
                        g = b[0],
                        f = b[1] - g,
                        k = j.getInfo(),
                        b = MSV.compute_msv(k.vector, g),
                        h = k.range,
                        k = l(h[0]) ? h[0] : -Infinity,
                        h = l(h[1]) ? h[1] : Infinity,
                        w = c;
                    if (!w) {
                        var q = MSV.calculate_interval(b, f),
                            w = Math.max(q[0], k),
                            q = Math.min(q[1], h);
                        v.set_pos_interval(w, q);
                        w = d.find_points(w, q, {
                            start_incl: !0,
                            end_incl: !0
                        })
                    }
                    f = MSV.calculate_solutions_in_interval(b,
                        f, w);
                    b = MSV.calculate_delta(b, k, h)[0];
                    for (k = 0; k < f.length; k++) {
                        h = f[k][0];
                        w = f[k][1];
                        q = !0;
                        0 === h && (q = !1);
                        h > b && (q = !1);
                        h === b && (q = !1);
                        if (w.pointType === e.LOW || w.pointType === e.HIGH) 0 === MSV.compute_msv(j.getInfo().vector, g + h)[MSV.V] && (q = !1);
                        q && v.push(a, g + h, w)
                    }
                }
            },
            W = function(a) {
                for (var c = v.pop(a), f = [], h, k, l, m, w, q = 0; q < c.length; q++)
                    if (k = c[q].ts, l = c[q].task, m = d.get_span(l.key)) directionInt = MSV.compute_direction(j.getInfo().vector, k), directionType = g.fromInteger(directionInt), w = l.pointType, h = e.toInteger(w), w === e.SINGULAR ?
                        (h = C(m, directionType, b.ENTER, l.point, k), f.push(h), h = C(m, directionType, b.LEAVE, l.point, k)) : (h = -1 * h * directionInt, h = b.fromInteger(h), h = C(m, directionType, h, l.point, k)), f.push(h);
                f && X(a, f)
            },
            C = function(a, c, b, d, g) {
                return {
                    directionType: c,
                    verbType: b,
                    point: d,
                    pointType: d === a.low && d === a.high ? e.SINGULAR : d === a.low ? e.LOW : d === a.high ? e.HIGH : a.low < d && d < a.high ? e.INSIDE : e.OUTSIDE,
                    low: a.low,
                    high: a.high,
                    key: a.key,
                    includeLow: a.includeLow,
                    includeHigh: a.includeHigh,
                    ts: g
                }
            },
            F = function(a) {
                for (var c, b = [], e = 0; e < a.length; e++)(c =
                    d.get_span(a[e])) && b.push(c);
                return b
            },
            J = function(a, c, d, e) {
                if (0 !== d.length + e.length) {
                    var f = MSV.compute_direction(c, a),
                        f = g.fromInteger(f),
                        j = [],
                        h, k;
                    for (h = 0; h < d.length; h++) k = d[h], k = C(k, f, b.LEAVE, c[MSV.P], a), j.push(k);
                    for (h = 0; h < e.length; h++) k = e[h], k = C(k, f, b.ENTER, c[MSV.P], a), j.push(k);
                    X(a, j)
                }
            },
            X = function(a, c) {
                for (var d, e = [], g = MSV.client_clock(), f, j = 0; j < c.length; j++) {
                    d = c[j];
                    if (d.verbType === b.LEAVE)
                        if (f = A.indexOf(d.key), -1 < f) A.splice(f, 1);
                        else continue;
                    if (d.verbType === b.ENTER)
                        if (f = A.indexOf(d.key), -1 ===
                            f) A.push(d.key);
                        else continue;
                    d.delay = g - d.ts;
                    e.push(d)
                }
                Y("event", e)
            },
            Y = function(a, c, d) {
                var g;
                if (!u.hasOwnProperty(a)) throw "Unsupported event " + a;
                if (0 !== c.length) {
                    if (!(2 > c.length)) {
                        for (var f, j, k = [], l = {
                                a: [],
                                x: [],
                                b: [],
                                c: [],
                                y: [],
                                d: []
                            }, m = 0; m < c.length; m++) {
                            f = c[m];
                            if (f.point !== g || f.ts !== j) k = k.concat(l.a).concat(l.x).concat(l.b).concat(l.c).concat(l.y).concat(l.d), l = {
                                a: [],
                                x: [],
                                b: [],
                                c: [],
                                y: [],
                                d: []
                            }, g = f.point, j = f.ts;
                            if (f.pointType === e.SINGULAR) f.verbType === b.ENTER ? l.b.push(f) : l.c.push(f);
                            else {
                                var n = !1;
                                g ===
                                    f.low && f.includeLow ? n = !0 : g === f.high && f.includeHigh && (n = !0);
                                f.verbType === b.ENTER ? n ? l.x.push(f) : l.d.push(f) : n ? l.y.push(f) : l.a.push(f)
                            }
                        }
                        c = k.concat(l.a).concat(l.x).concat(l.b).concat(l.c).concat(l.y).concat(l.d)
                    }
                    for (j = 0; j < u[a].length; j++) {
                        g = u[a][j];
                        if (void 0 === d) {
                            if (g._immediate_pending) continue
                        } else if (g === d) d._immediate_pending = !1;
                        else continue;
                        try {
                            g.call(h, c)
                        } catch (p) {
                            console.log("Error in " + a + ": " + g + ": " + p)
                        }
                    }
                }
            };
        h.update = function(a, b, d, e) {
            return V([{
                key: a,
                a: b,
                b: d,
                options: e
            }])[0]
        };
        h.setSpan = h.update;
        h.removeSpan = h.update;
        h.request = function() {
            var b = a({
                multi_update: V
            });
            b.setSpan = b.update;
            b.removeSpan = b.update;
            return b
        };
        h.findPoints = d.find_points;
        h.findSpans = function(a) {
            var b = [];
            a = d.find_keys(a);
            for (var e = 0; e < a.length; e++) b.push(d.get_span_info(a[e]));
            return b
        };
        h.getPoint = d.get_point;
        h.getSpan = d.get_span;
        h.getActiveSpans = function() {
            for (var a = [], b = 0; b < A.length; b++) a.push(d.get_span_info(A[b]));
            return a
        };
        h.getActiveSpanKeys = function() {
            for (var a = [], b = 0; b < A.length; b++) a.push(A[b]);
            return a
        };
        h.on = function(a,
            c) {
            if (!c || "function" !== typeof c) throw "Illegal handler";
            if (!u.hasOwnProperty(a)) throw "Unsupported event " + a;
            if (j.readyState === j.STATE.CLOSED) throw "Msv closed"; - 1 === u[a].indexOf(c) && (u[a].push(c), c._immediate_pending = !0, setTimeout(function() {
                var a;
                if (j.readyState !== j.STATE.INIT) {
                    a = MSV.client_clock();
                    for (var d = j.getInfo().vector, d = MSV.compute_msv(d, a), e = F(A), f = MSV.compute_direction(d, a), f = g.fromInteger(f), h = [], k = 0; k < e.length; k++) {
                        var l = C(e[k], f, b.ENTER, d[MSV.P], a);
                        l.delay = MSV.client_clock() - l.ts;
                        h.push(l)
                    }
                    0 ===
                        h.length ? a = !1 : (Y("event", h, c), a = !0)
                } else a = !1;
                a || (c._immediate_pending = !1)
            }, 0));
            return h
        };
        h.off = function(a, b) {
            if (void 0 !== u[a]) {
                var d = u[a].indexOf(b); - 1 < d && u[a].splice(d, 1)
            }
            return h
        };
        h.EFFECT_TYPE = k;
        h.VERB_TYPE = b;
        h.DIRECTION_TYPE = g;
        h.POINT_TYPE = e;
        j.on("change", function() {
            var a, b = j.getInfo().vector;
            if (U) {
                U = !1;
                var f = void 0;
                a = {};
                var g = [],
                    f = f || {};
                f.lookahead = f.lookahead || 5;
                var h = MSV.client_clock(),
                    k = [h, h + f.lookahead],
                    l = null,
                    n = function(a, b) {
                        return a.ts - b.ts
                    };
                a.get_time_interval = function() {
                    return k
                };
                a.get_pos_interval =
                    function() {
                        return l
                    };
                a.set_pos_interval = function(a, b) {
                    l = [a, b]
                };
                a.get_delay_next_ts = function(a) {
                    return 0 < g.length ? Math.max(0, g[0].ts - a) : Math.max(0, k[1] - a)
                };
                a.is_expired = function(a) {
                    return a > k[1]
                };
                a.advance = function(a) {
                    a < k[0] && console.log("advancing backward " + (a - k[0]));
                    var b = a + f.lookahead;
                    g = [];
                    k = [a, b];
                    position_interval = null
                };
                a.push = function(a, b, c) {
                    if (k[0] <= b && b <= k[1]) {
                        c = {
                            ts: b,
                            task: c,
                            push_ts: a
                        };
                        if (b >= a) return g.push(c), g.sort(n), !0;
                        console.log("push a bit too late, ts < now " + (b - a))
                    }
                    return !1
                };
                a.pop =
                    function(a) {
                        for (var b = []; 0 < g.length && g[0].ts <= a;) {
                            var c = g.shift();
                            b.push({
                                task: c.task,
                                pop_ts: a,
                                push_ts: c.push_ts,
                                ts: c.ts
                            })
                        }
                        return b
                    };
                a.invalidate = function(a) {
                    var b, c, d = [];
                    for (b = 0; b < g.length; b++) c = g[b], c.task.key === a && d.push(c);
                    for (b = 0; b < d.length; b++) c = d[b], a = g.indexOf(c), -1 < a && g.splice(a, 1)
                };
                v = a;
                a = MSV.client_clock()
            } else a = b[MSV.T];
            var h = MSV.compute_msv(b, a),
                q = d.find_keys(h[MSV.P]),
                p = m(A, q),
                q = m(q, A),
                p = F(p),
                q = F(q);
            J(a, h, p, q);
            q = [];
            p = [];
            if (MSV.is_moving(b))
                for (var t = h[MSV.P], t = d.find_points(t, t, {
                        start_incl: !0,
                        end_incl: !0
                    }), s, x = 0; x < t.length; x++)
                    if (s = t[x], s.pointType === e.SINGULAR) p.push(s.key);
                    else {
                        var u = d.get_span_info(s.key),
                            z = !1;
                        s.pointType === e.LOW && u.includeLow ? z = !0 : s.pointType === e.HIGH && u.includeHigh && (z = !0);
                        var u = MSV.compute_direction(b, a),
                            B = !0;
                        s.pointType === e.LOW && -1 === u && (B = !1);
                        s.pointType === e.HIGH && 1 === u && (B = !1);
                        !B && z && p.push(s.key);
                        B && !z && q.push(s.key)
                    }
            q = F(q);
            p = F(p);
            J(a, h, p, q);
            v.advance(a);
            K(a);
            L(a)
        });
        return h
    };
    return p
}(TM || {});
TM = function(p) {
    p.switcher = function() {
        var l = {},
            m = {},
            f = {
                readystatechange: [],
                change: [],
                timeupdate: [],
                error: []
            },
            e = null,
            k = null,
            a = function(a) {
                if (!m.hasOwnProperty(a)) throw "Bad MSV '" + a + "', expect one of " + JSON.stringify(m);
                for (var g in f)
                    for (var j in f[g]) k.off(g, f[g][j]);
                e = a;
                k = m[a];
                for (g in f)
                    for (j in f[g]) k.on(g, f[g][j])
            };
        l.register = function(b, e) {
            m[b] = e;
            null === k && a(b)
        };
        l.switchto = a;
        l.msv = function() {
            return k
        };
        l.key = function() {
            if (null === k) throw "Current msv not set yet";
            return e
        };
        l.on = function(a, e) {
            void 0 !=
                f[a] && (f[a].push(e), k.on(a, e))
        };
        l.off = function(a, e) {
            void 0 != f[a] && (-1 < f[a].indexOf(e) && f[a].splice(f[a].indexOf(e), 1), k.off(a, e))
        };
        l.__defineGetter__("pos", function() {
            return query().pos
        });
        l.__defineGetter__("vel", function() {
            return query().vel
        });
        l.__defineGetter__("acc", function() {
            return query().acc
        });
        l.__defineSetter__("pos", function(a) {
            update(a, null, null)
        });
        l.__defineSetter__("vel", function(a) {
            update(null, a, null)
        });
        l.__defineSetter__("acc", function(a) {
            update(null, null, a)
        });
        l.query = function() {
            return k.query()
        };
        l.update = function(a, e, f) {
            return k.update(a, e, f)
        };
        l.isMoving = function() {
            return k.isMoving()
        };
        l.getState = function() {
            return k.getState()
        };
        l.get_vector = function() {
            return k.get_vector()
        };
        l.get_before_vector = function() {
            return k.get_before_vector()
        };
        return l
    };
    return p
}(TM || {});
TM = function(p) {
    p.setSync = function(l, m, f) {
        var e = f.query();
        if (0 == e.vel) {
            var k = function() {
                TM.setSync(l, m, f)
            };
            f.on("change", function() {
                0 != this.query().vel && (f.off("change", k), k())
            });
            return this
        }
        var a = Math.abs(m - e.pos);
        if (0.05 < a) return setTimeout(function() {
            TM.setSync(l, m, f)
        }, Math.abs(a / 2 / e.vel)), this;
        for (;;) {
            e = f.query();
            if (0 == e.vel) return TM.setSync(l, m, f);
            a = Math.abs(m - e.pos);
            if (0.001 > a) break;
            if (0.055 < a) break
        }
        l.call();
        return null
    };
    p.setInterval = function(l, m, f) {
        function e(b) {
            if (!1 != a) {
                var g = f.query();
                if (0 != g.vel) {
                    var j = b - g.pos;
                    if (0.04 < j && 0 < g.vel || 0.04 > j && 0 > g.vel) timer = setTimeout(function() {
                        e(b)
                    }, Math.abs(j / 2 / g.vel));
                    else {
                        if (0.05 > Math.abs(j)) {
                            for (;;) {
                                g = f.query();
                                if (0 == g.vel) {
                                    setTimeout(e(b), 0);
                                    return
                                }
                                j = b - g.pos;
                                if (0 < g.vel && 0 > j) break;
                                if (0 > g.vel && 0 < j) break
                            }
                            l.call()
                        }
                        next_time = isNaN(m) ? m.call(f) : 0 < f.query().vel ? next_time + m : next_time - m;
                        e(next_time)
                    }
                }
            }
        }

        function k() {
            next_time = isNaN(m) ? m.call(f) : 0 < f.query().vel ? f.query().pos + (m - f.query().pos % m) : f.query().pos - f.query().pos % m;
            e(next_time)
        }
        var a = !0;
        f.on("change",
            function() {
                clearTimeout(null)
            });
        f.on("change", function() {
            0 != this.query().vel && (f.off("change", k), k())
        });
        return {
            cancel: function() {
                a = !1
            }
        }
    };
    return p
}(TM || {});
