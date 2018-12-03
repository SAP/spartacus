/*
 * [y] hybris Platform
 *
 * Copyright (c) 2018 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */

 
!!1; // jshint ignore:line
(function(global) { 

	/*
	 * Only allow wildcard 2 levels deep.
	 * See webApplicationInjectorTest.js for more details
	 */
    var createAllowOriginRegex = function() {
        // to not expose validAllowOriginPattern
        return new RegExp(/^(([-*a-zA-Z0-9]+[.])*([-a-zA-Z0-9]+[.]))?[-a-zA-Z0-9]+(:[0-9]{1,5})?$/);
    };

    /*
     * START of Whitelisting: expected CSV of ant-like wildcards with "*"
     * to be found in either data-smartedit-allow-origin attribute or allow-origin query parameter (for smarteditaddon support)
     */
	var whiteListedOrigins = [global.location.host];

    // document.currentScript is not supported in IE
    var webappScript = document.currentScript || document.querySelector('script#smartedit-injector');
    if (webappScript){
        var allowOrigin = webappScript.getAttribute('data-smartedit-allow-origin');

        if (!allowOrigin) {
			var url = global.document.createElement('a');
			url.href = webappScript.src;
			var encodedAllowOrigin = extractQueryParameter(url.search, "allow-origin");
            if (encodedAllowOrigin){
                allowOrigin = decodeURI(encodedAllowOrigin);
            }
        }

        if (allowOrigin){
            whiteListedOrigins = whiteListedOrigins.concat(allowOrigin.split(','));
        }
    }
    
    var whiteListedOriginRegexes = whiteListedOrigins.map(function(origins){
        var trimmed = origins.trim();
        if (createAllowOriginRegex().test(trimmed)){
            var regexpKey = ['^', '$'].join(trimmed.replace(/\./g, '\\.').replace(/\*/g, '[-a-zA-Z0-9]*'));
            return new RegExp(regexpKey);
        }
        throw new Error("Allowed whitelist characters are a-Z, A-Z, 0-9, - or period. " +
			"A wildcard * can be used to represent a prefixed domain. E.g.: *.domain.com can be used for subdomain.domain.com.");
    });

    function isAllowed(originUrl, currentOriginLocation) {
		if (!/^(https?:)\/\/([-.a-zA-Z0-9]+(:[0-9]{1,5})?)$/.test(originUrl)) {
		    return false;
        }

		var originLocation = global.document.createElement('a');
		originLocation.href = originUrl;

		if (currentOriginLocation.protocol === 'https:' && originLocation.protocol !== 'https:') {
			return false;
		}

        return whiteListedOriginRegexes.some(function(regex){
            regex.lastIndex = 0;
            return regex.test(originLocation.host);
        });
    }
    // END of Whitelisting

    var smartEditBootstrapGatewayId = 'smartEditBootstrap';
    parent.postMessage({
        pk: Math.random(),
        gatewayId: smartEditBootstrapGatewayId,
        eventId: 'loading',
        data: {
            location: document.location.href
        }
    }, '*');

    function _onbeforeunload() {
        parent.postMessage({
            pk: Math.random(),
            gatewayId: smartEditBootstrapGatewayId,
            eventId: 'unloading',
            data: {
                location: document.location.href
            }
        }, '*'); 
	}

	global.onbeforeunload = _onbeforeunload;
	
	(function startSendingHeartBeatToIframe() {
		var HEART_BEAT_PERIOD = getHeartBeatInterval();
		var HEART_BEAT_GATEWAY_ID = "heartBeatGateway";
		var HEART_BEAT_MSG_ID = 'heartBeat';
		parent.postMessage({
			pk: Math.random(),
			gatewayId: HEART_BEAT_GATEWAY_ID,
			eventId: HEART_BEAT_MSG_ID,
			data: {
				location: document.location.href
			}
		}, '*');
		setTimeout(startSendingHeartBeatToIframe, HEART_BEAT_PERIOD);
	})();

	function getHeartBeatInterval() {
		var heartBeatIntervalQueryParameter = extractQueryParameter(webappScript.src, "heart-beat-interval");
		var heartBeatIntervalHTMLArgument = webappScript.getAttribute('data-smartedit-heart-beat-interval');
		var passedParmeter = heartBeatIntervalQueryParameter || heartBeatIntervalHTMLArgument;
		return parseInt(passedParmeter) || 500;
	}
	
	function extractQueryParameter(url, queryParameterName) {
		var queryParameters = {};
		url.replace(/([?&])([^&=]+)=([^&]*)?/g, function($0, $1, parameterKey, parameterValue) {
			queryParameters[parameterKey] = parameterValue;
		});
		return queryParameters[queryParameterName];
	}

    global.addEventListener('load', function() {
        parent.postMessage({
            pk: Math.random(),
            gatewayId: smartEditBootstrapGatewayId,
            eventId: 'bootstrapSmartEdit',
            data: {
                location: document.location.href
            }
        }, '*');
    });

    var injectJS = function(head, srcs, index) {
        if (index < srcs.length) {
            $script(srcs[index], function() {
                injectJS(head, srcs, index + 1);
            });
        }
    };

    var injectCSS = function(head, cssPaths, index) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssPaths[index];
        head.appendChild(link);

        if (index + 1 < cssPaths.length) {
            injectCSS(head, cssPaths, index + 1);
        }
	};

    // Listen to message from child window
    global.addEventListener('message', function(e) {

    	// Do not remove the line below as it will expose XSS vulnerabilities.
        if(!isAllowed(e.origin, global.location)){
            throw new Error(e.origin + ' is not allowed to override this storefront.');
        }
 
        var event = e.data;
        if (event.gatewayId === smartEditBootstrapGatewayId && event.eventId === 'bundle') {

            var data = event.data;

            global.smartedit = global.smartedit || {};
            if (data.resources && data.resources.properties) {
                for (var i in data.resources.properties) { // jshint ignore:line
                    global.smartedit[i] = data.resources.properties[i];
                }
            }

            var head = document.getElementsByTagName('head')[0];

            //JS Files
            if (data.resources && data.resources.js && data.resources.js.length > 0) {
                injectJS(head, data.resources.js, 0);
            }

            //CSS Files
            if (data.resources && data.resources.css && data.resources.css.length > 0) {
                injectCSS(head, data.resources.css, 0);
            }
        }

	}, false);

	global.SmarteditWAI = {};
	global.SmarteditWAI.isAllowed = isAllowed;
	global.SmarteditWAI.createAllowOriginRegex = createAllowOriginRegex;
	Object.freeze(global.SmarteditWAI);

})(window);