/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
!(function(t) {
    var e = {};
    function n(r) {
        if (e[r]) return e[r].exports;
        var o = (e[r] = { i: r, l: !1, exports: {} });
        return t[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
    }
    (n.m = t),
        (n.c = e),
        (n.d = function(t, e, r) {
            n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
        }),
        (n.r = function(t) {
            'undefined' != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
                Object.defineProperty(t, '__esModule', { value: !0 });
        }),
        (n.t = function(t, e) {
            if ((1 & e && (t = n(t)), 8 & e)) return t;
            if (4 & e && 'object' == typeof t && t && t.__esModule) return t;
            var r = Object.create(null);
            if (
                (n.r(r),
                Object.defineProperty(r, 'default', { enumerable: !0, value: t }),
                2 & e && 'string' != typeof t)
            )
                for (var o in t)
                    n.d(
                        r,
                        o,
                        function(e) {
                            return t[e];
                        }.bind(null, o)
                    );
            return r;
        }),
        (n.n = function(t) {
            var e =
                t && t.__esModule
                    ? function() {
                          return t.default;
                      }
                    : function() {
                          return t;
                      };
            return n.d(e, 'a', e), e;
        }),
        (n.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e);
        }),
        (n.p = ''),
        n((n.s = 1));
})([
    function(t, e, n) {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 });
        var r = n(2),
            o = (function() {
                function t() {}
                return (
                    (t.getWebappScriptElementFromDocument = function(e) {
                        if (e.currentScript) {
                            if (!(e.currentScript instanceof HTMLScriptElement))
                                throw new Error(
                                    'getWebappScriptElementFromDocument() found non htlm script element'
                                );
                            return e.currentScript;
                        }
                        var n = e.querySelector('script#' + t.webappScriptId);
                        if (n) return n;
                        var r = e.querySelectorAll('script[src*=' + t.webappScriptName + ']');
                        if (1 !== r.length)
                            throw new Error(
                                'SmartEdit unable to load - invalid ' +
                                    t.webappScriptName +
                                    ' script tag'
                            );
                        return r.item(0);
                    }),
                    (t.extractQueryParameter = function(t, e) {
                        var n = {};
                        return (
                            t.replace(/([?&])([^&=]+)=([^&]*)?/g, function(t, e, r, o) {
                                return (n[r] = o), '';
                            }),
                            n[e]
                        );
                    }),
                    (t.injectJS = function(e, n) {
                        void 0 === n && (n = 0),
                            e.length &&
                                n < e.length &&
                                t.getScriptJs()(e[n], function() {
                                    t.injectJS(e, n + 1);
                                });
                    }),
                    (t.injectCSS = function(e, n, r) {
                        if ((void 0 === r && (r = 0), n && 0 !== n.length)) {
                            var o = document.createElement('link');
                            (o.rel = 'stylesheet'),
                                (o.href = n[r]),
                                e.appendChild(o),
                                r + 1 < n.length && t.injectCSS(e, n, r + 1);
                        }
                    }),
                    (t.getScriptJs = function() {
                        return r;
                    }),
                    (t.webappScriptId = 'smartedit-injector'),
                    (t.webappScriptName = 'webApplicationInjector'),
                    t
                );
            })();
        e.default = o;
    },
    function(t, e, n) {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 });
        var r = n(0),
            o = n(3),
            a = n(4),
            i = 'smartEditBootstrap',
            c = r.default.getWebappScriptElementFromDocument(document);
        if (!c) throw new Error('Unable to location webappInjector script');
        var u = o.default.getWhitelistFromScriptElement(c, window),
            l = o.default.convertWhitelistingToRegexp(u);
        parent.postMessage(
            {
                pk: Math.random(),
                gatewayId: i,
                eventId: 'loading',
                data: { location: document.location.href }
            },
            '*'
        ),
            window.addEventListener('load', function() {
                parent.postMessage(
                    {
                        pk: Math.random(),
                        gatewayId: i,
                        eventId: 'bootstrapSmartEdit',
                        data: { location: document.location.href }
                    },
                    '*'
                );
            }),
            window.addEventListener(
                'message',
                function(t) {
                    if (t.data.gatewayId !== i || 'bundle' !== t.data.eventId) return;
                    if (!o.default.isAllowed(t.origin, window, l))
                        throw new Error(t.origin + ' is not allowed to override this storefront.');
                    !(function(t, e) {
                        if (
                            ((window.smartedit = window.smartedit || {}),
                            parent.postMessage(
                                {
                                    gatewayId: i,
                                    eventId: 'promiseAcknowledgement',
                                    data: { pk: t }
                                },
                                '*'
                            ),
                            e)
                        ) {
                            if (e.properties)
                                for (var n in e.properties)
                                    e.properties.hasOwnProperty(n) &&
                                        (window.smartedit[n] = e.properties[n]);
                            var o = document.getElementsByTagName('head')[0];
                            if (e.js && e.js.length > 0) {
                                var a = void 0;
                                (a =
                                    'string' == typeof e.js[0]
                                        ? e.js
                                        : e.js
                                              .filter(function(t) {
                                                  return (
                                                      !t.namespaceToCheck ||
                                                      !window[t.namespaceToCheck]
                                                  );
                                              })
                                              .map(function(t) {
                                                  return t.src;
                                              })),
                                    r.default.injectJS(a);
                            }
                            e.css && e.css.length > 0 && r.default.injectCSS(o, e.css);
                        }
                        parent.postMessage(
                            {
                                gatewayId: i,
                                eventId: 'promiseReturn',
                                data: { pk: t, type: 'success' }
                            },
                            '*'
                        );
                    })(t.data.pk, t.data.data.resources);
                },
                !1
            ),
            (window.onbeforeunload = function() {
                parent.postMessage(
                    {
                        pk: Math.random(),
                        gatewayId: i,
                        eventId: 'unloading',
                        data: { location: document.location.href }
                    },
                    '*'
                );
            }),
            a.Heartbeat.startSendingHeartBeatToIframe(c);
    },
    function(t, e, n) {
        var r, o, a;
        /*!
         * $script.js JS loader & dependency manager
         * https://github.com/ded/script.js
         * (c) Dustin Diaz 2014 | License MIT
         */
        /*!
         * $script.js JS loader & dependency manager
         * https://github.com/ded/script.js
         * (c) Dustin Diaz 2014 | License MIT
         */
        (a = function() {
            var t,
                e,
                n = document,
                r = n.getElementsByTagName('head')[0],
                o = !1,
                a = 'push',
                i = 'readyState',
                c = 'onreadystatechange',
                u = {},
                l = {},
                s = {},
                d = {};
            function f(t, e) {
                for (var n = 0, r = t.length; n < r; ++n) if (!e(t[n])) return o;
                return 1;
            }
            function p(t, e) {
                f(t, function(t) {
                    return e(t), 1;
                });
            }
            function m(e, n, r) {
                e = e[a] ? e : [e];
                var o = n && n.call,
                    i = o ? n : r,
                    c = o ? e.join('') : n,
                    h = e.length;
                function w(t) {
                    return t.call ? t() : u[t];
                }
                function v() {
                    if (!--h)
                        for (var t in ((u[c] = 1), i && i(), s))
                            f(t.split('|'), w) && !p(s[t], w) && (s[t] = []);
                }
                return (
                    setTimeout(function() {
                        p(e, function e(n, r) {
                            return null === n
                                ? v()
                                : (r ||
                                      /^https?:\/\//.test(n) ||
                                      !t ||
                                      (n = -1 === n.indexOf('.js') ? t + n + '.js' : t + n),
                                  d[n]
                                      ? (c && (l[c] = 1),
                                        2 == d[n]
                                            ? v()
                                            : setTimeout(function() {
                                                  e(n, !0);
                                              }, 0))
                                      : ((d[n] = 1), c && (l[c] = 1), void g(n, v)));
                        });
                    }, 0),
                    m
                );
            }
            function g(t, o) {
                var a,
                    u = n.createElement('script');
                (u.onload = u.onerror = u[c] = function() {
                    (u[i] && !/^c|loade/.test(u[i])) ||
                        a ||
                        ((u.onload = u[c] = null), (a = 1), (d[t] = 2), o());
                }),
                    (u.async = 1),
                    (u.src = e ? t + (-1 === t.indexOf('?') ? '?' : '&') + e : t),
                    r.insertBefore(u, r.lastChild);
            }
            return (
                (m.get = g),
                (m.order = function(t, e, n) {
                    !(function r(o) {
                        (o = t.shift()), t.length ? m(o, r) : m(o, e, n);
                    })();
                }),
                (m.path = function(e) {
                    t = e;
                }),
                (m.urlArgs = function(t) {
                    e = t;
                }),
                (m.ready = function(t, e, n) {
                    t = t[a] ? t : [t];
                    var r,
                        o = [];
                    return (
                        !p(t, function(t) {
                            u[t] || o[a](t);
                        }) &&
                        f(t, function(t) {
                            return u[t];
                        })
                            ? e()
                            : ((r = t.join('|')), (s[r] = s[r] || []), s[r][a](e), n && n(o)),
                        m
                    );
                }),
                (m.done = function(t) {
                    m([null], t);
                }),
                m
            );
        }),
            t.exports
                ? (t.exports = a())
                : void 0 === (o = 'function' == typeof (r = a) ? r.call(e, n, e, t) : r) ||
                  (t.exports = o);
    },
    function(t, e, n) {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 });
        var r = n(0),
            o = (function() {
                function t() {}
                return (
                    (t.convertWhitelistingToRegexp = function(e) {
                        return (e = e || []).map(function(e) {
                            var n = e.trim();
                            if (t.whitelistingConfigRegex.test(n)) {
                                var r = ['^', '$'].join(
                                    n.replace(/\./g, '\\.').replace(/\*/g, '[-a-zA-Z0-9]*')
                                );
                                return new RegExp(r);
                            }
                            throw new Error(t.whitelistingErrorMsg);
                        });
                    }),
                    (t.getWhitelistFromScriptElement = function(e, n) {
                        var o = [t.getSanitizedHostFromLocation(n.location)],
                            a = e.getAttribute(t.allowOriginAttributeName) || '';
                        a && (o = o.concat(a.split(',')));
                        var i = '',
                            c = n.document.createElement('a');
                        c.href = e.src;
                        var u = r.default.extractQueryParameter(
                            c.search,
                            t.allowOriginQueryParamName
                        );
                        return (
                            u &&
                                (i = decodeURI(u)) &&
                                i.split(',').forEach(function(t) {
                                    return o.push(t);
                                }),
                            o
                        );
                    }),
                    (t.isAllowed = function(e, n, r) {
                        if (!/^(https?:)\/\/([-.a-zA-Z0-9]+(:[0-9]{1,5})?)$/.test(e)) return !1;
                        var o = n.document.createElement('a');
                        return (
                            (o.href = e),
                            ('https:' !== n.location.protocol || 'https:' === o.protocol) &&
                                r.some(function(e) {
                                    return (
                                        (e.lastIndex = 0), e.test(t.getSanitizedHostFromLocation(o))
                                    );
                                })
                        );
                    }),
                    (t.getSanitizedHostFromLocation = function(t) {
                        var e = t.port || ('https' === t.protocol.replace(/:/g, '') ? '443' : '80');
                        return t.hostname + ':' + e;
                    }),
                    (t.whitelistingConfigRegex = new RegExp(
                        /^(([-*a-zA-Z0-9]+[.])*([-a-zA-Z0-9]+[.]))?[-a-zA-Z0-9]+(:[0-9]{1,5})$/
                    )),
                    (t.allowOriginAttributeName = 'data-smartedit-allow-origin'),
                    (t.allowOriginQueryParamName = 'allow-origin'),
                    (t.whitelistingErrorMsg =
                        '\n\t\tAllowed whitelist characters are a-z, A-Z, 0-9, -, period, or *\n\t\tThe wildcard * can be used to represent a prefixed domain, Good example: *.domain.com:80\n\t\tbut not a suffix or port, Bad examples: subdomain.*.com subdomain.domain.com:*.\n\t\tEvery whitelisting must contain a specific port.\n\t'),
                    t
                );
            })();
        e.default = o;
    },
    function(t, e, n) {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 });
        var r = (function() {
            function t() {}
            return (
                (t.startSendingHeartBeatToIframe = function(e) {
                    var n = t.getHeartBeatInterval(e);
                    setInterval(function() {
                        parent.postMessage(
                            {
                                pk: Math.random(),
                                gatewayId: 'heartBeatGateway',
                                eventId: 'heartBeat',
                                data: { location: document.location.href }
                            },
                            '*'
                        );
                    }, n);
                }),
                (t.getHeartBeatInterval = function(e) {
                    return parseInt(
                        e.getAttribute('data-smartedit-heart-beat-interval') ||
                            t.DEFAULT_HEARTBEAT_INTERVAL,
                        10
                    );
                }),
                (t.DEFAULT_HEARTBEAT_INTERVAL = '500'),
                t
            );
        })();
        e.Heartbeat = r;
    }
]);
