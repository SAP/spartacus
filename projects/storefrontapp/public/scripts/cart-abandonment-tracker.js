/**
 * Cart Abandonment Tracker
 * Detects user abandonment behavior on cart pages and notifies the shopping assistant module via custom events
 *
 * @version 1.0.0
 * @author Flora Rong
 */

(function(window) {
  'use strict';

  /**
   * Cart Abandonment Tracker Class
   */
  class CartAbandonmentTracker {
    constructor(options = {}) {
      // Configuration options
      this.config = {
        cartUrlPattern: options.cartUrlPattern || '/cart',           // Cart page URL pattern
        checkoutUrlPattern: options.checkoutUrlPattern || '/checkout', // Checkout page URL pattern
        inactivityTimeout: options.inactivityTimeout || 15000,       // Inactivity timeout (ms)
        debug: options.debug || false,                                // Debug mode
        eventName: options.eventName || 'cart:abandoned'              // Custom event name
      };

      // State variables
      this.isActive = false;              // Whether tracker is active
      this.isOnCartPage = false;          // Whether currently on cart page
      this.cartPageEntryTime = 0;         // Time entered cart page
      this.interactionCount = 0;          // User interaction count
      this.lastInteractionTime = 0;       // Last interaction time
      this.inactivityTimer = null;        // Inactivity timer

      // Interaction events to monitor
      this.interactionEvents = [
        'click',
        'mousemove',
        'keydown',
        'scroll',
        'touchstart'
      ];

      // Bind method contexts
      this.handleClick = this.handleClick.bind(this);
      this.handleInteraction = this.handleInteraction.bind(this);
      this.handleBeforeUnload = this.handleBeforeUnload.bind(this);
    }

    /**
     * Start tracker
     */
    start() {
      if (this.isActive) {
        this.log('Tracker already running');
        return;
      }

      this.isActive = true;
      this.checkCurrentPage();
      this.attachEventListeners();
      this.log('Tracker started', this.config);
    }

    /**
     * Stop tracker
     */
    stop() {
      if (!this.isActive) {
        return;
      }

      this.isActive = false;
      this.detachEventListeners();
      this.clearInactivityTimer();
      this.resetState();
      this.log('Tracker stopped');
    }

    /**
     * Check if current page is cart page
     */
    checkCurrentPage() {
      const currentUrl = window.location.href;
      const isCart = this.matchUrl(currentUrl, this.config.cartUrlPattern);

      if (isCart && !this.isOnCartPage) {
        this.enterCartPage();
      } else if (!isCart && this.isOnCartPage) {
        // May have left via browser back/forward button or other means
        // Check if going to checkout page
        this.leaveCartPage(currentUrl, 'url_change');
      }
    }

    /**
     * Enter cart page
     */
    enterCartPage() {
      this.isOnCartPage = true;
      this.cartPageEntryTime = Date.now();
      this.interactionCount = 0;
      this.lastInteractionTime = Date.now();
      this.startInactivityTimer();

      this.log('Entered cart page', {
        url: window.location.href,
        time: new Date(this.cartPageEntryTime).toISOString()
      });
    }

    /**
     * Leave cart page
     */
    leaveCartPage(targetUrl, trigger = 'click') {
      const isCheckout = this.matchUrl(targetUrl, this.config.checkoutUrlPattern);

      this.log('Attempting to leave cart page', {
        targetUrl,
        isCheckout,
        trigger
      });

      // Only trigger abandonment event when not going to checkout
      if (!isCheckout) {
        this.dispatchAbandonmentEvent('navigation', {
          fromUrl: window.location.href,
          toUrl: targetUrl,
          trigger
        });
      } else {
        this.log('User going to checkout, not triggering abandonment event');
      }

      this.resetState();
    }

    /**
     * Start inactivity timer
     */
    startInactivityTimer() {
      this.clearInactivityTimer();

      this.inactivityTimer = setTimeout(() => {
        if (this.isOnCartPage) {
          this.log('Detected timeout with no interaction');
          this.dispatchAbandonmentEvent('timeout', {
            fromUrl: window.location.href
          });
          this.resetState();
        }
      }, this.config.inactivityTimeout);
    }

    /**
     * Clear inactivity timer
     */
    clearInactivityTimer() {
      if (this.inactivityTimer) {
        clearTimeout(this.inactivityTimer);
        this.inactivityTimer = null;
      }
    }

    /**
     * Handle click events (for navigation detection)
     */
    handleClick(event) {
      if (!this.isOnCartPage) {
        return;
      }

      // Find clicked link element
      let target = event.target;
      while (target && target !== document) {
        if (target.tagName === 'A' && target.href) {
          const targetUrl = target.href;

          // Check if external link or navigation link
          if (this.isNavigationLink(targetUrl)) {
            this.log('Detected navigation click', { targetUrl });
            this.leaveCartPage(targetUrl, 'click');
          }
          break;
        }
        target = target.parentElement;
      }
    }

    /**
     * Check if link is navigation link
     */
    isNavigationLink(url) {
      try {
        const targetUrl = new URL(url, window.location.href);
        const currentUrl = new URL(window.location.href);

        // Check if same domain
        if (targetUrl.origin !== currentUrl.origin) {
          return false; // Don't handle external links
        }

        // Check if path or hash is different
        const pathChanged = targetUrl.pathname !== currentUrl.pathname;
        const hashChanged = targetUrl.hash !== currentUrl.hash;

        return pathChanged || hashChanged;
      } catch (e) {
        return false;
      }
    }

    /**
     * Handle user interaction events
     */
    handleInteraction() {
      if (!this.isOnCartPage) {
        return;
      }

      this.interactionCount++;
      this.lastInteractionTime = Date.now();

      // Reset inactivity timer
      this.startInactivityTimer();
    }

    /**
     * Handle page unload event
     */
    handleBeforeUnload() {
      // Clean up state when page unloads
      if (this.isOnCartPage) {
        this.log('Page unloading');
      }
    }

    /**
     * Dispatch cart abandonment event
     */
    dispatchAbandonmentEvent(type, additionalData = {}) {
      const eventData = {
        type,                                           // 'navigation' or 'timeout'
        timestamp: Date.now(),                          // Event timestamp
        fromUrl: additionalData.fromUrl || window.location.href,  // Source URL
        toUrl: additionalData.toUrl || null,           // Target URL (for navigation type)
        duration: Date.now() - this.cartPageEntryTime, // Duration (ms)
        interactionCount: this.interactionCount,        // Interaction count
        lastInteractionTime: this.lastInteractionTime,  // Last interaction time
        userAgent: navigator.userAgent,                 // Browser info
        timestamp_iso: new Date().toISOString()         // ISO format time
      };

      this.log('Dispatching cart abandonment event', eventData);

      // Dispatch custom event
      const customEvent = new CustomEvent(this.config.eventName, {
        detail: eventData,
        bubbles: true,
        cancelable: false
      });

      window.dispatchEvent(customEvent);
    }

    /**
     * Reset state
     */
    resetState() {
      this.isOnCartPage = false;
      this.cartPageEntryTime = 0;
      this.interactionCount = 0;
      this.lastInteractionTime = 0;
      this.clearInactivityTimer();
    }

    /**
     * URL matching
     */
    matchUrl(url, pattern) {
      if (pattern instanceof RegExp) {
        return pattern.test(url);
      }
      return url.includes(pattern);
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
      // Listen for click events (for navigation detection)
      document.addEventListener('click', this.handleClick, true);

      // Listen for user interaction events (to reset timeout timer)
      this.interactionEvents.forEach(eventType => {
        document.addEventListener(eventType, this.handleInteraction, {
          passive: true,
          capture: false
        });
      });

      // Listen for page unload
      window.addEventListener('beforeunload', this.handleBeforeUnload);
    }

    /**
     * Detach event listeners
     */
    detachEventListeners() {
      document.removeEventListener('click', this.handleClick, true);

      this.interactionEvents.forEach(eventType => {
        document.removeEventListener(eventType, this.handleInteraction);
      });

      window.removeEventListener('beforeunload', this.handleBeforeUnload);
    }

    /**
     * Debug logging
     */
    log(message, data) {
      if (this.config.debug) {
        const timestamp = new Date().toISOString();
        console.log(`[CartAbandonmentTracker ${timestamp}] ${message}`, data || '');
      }
    }

    /**
     * Get current state (for debugging)
     */
    getState() {
      return {
        isActive: this.isActive,
        isOnCartPage: this.isOnCartPage,
        cartPageEntryTime: this.cartPageEntryTime,
        interactionCount: this.interactionCount,
        lastInteractionTime: this.lastInteractionTime,
        currentUrl: window.location.href,
        config: this.config
      };
    }
  }

  // Export to global object
  window.CartAbandonmentTracker = CartAbandonmentTracker;

  // Also provide default export if ES6 modules are supported
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = CartAbandonmentTracker;
  }

})(window);
