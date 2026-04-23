/**
 * assistant-widget.js
 *
 * Embeddable AI assistant as a Web Component.
 *
 * Usage:
 *   <script src="assistant-widget.js"></script>
 *   <assistant-widget api-url="https://my-backend.com" skill="my-skill"></assistant-widget>
 *
 * Attributes:
 *   mode               "fab" (default) | "inline"
 *   api-url            Backend base URL (required)
 *   skill              Skill name (default: "merchandising-assistant")
 *   title              Widget title (default: "Virtual Assistant")
 *   theme-color        Header / accent color (default: "#0064d9")
 *   show-unread-count    Show badge with unread message count (default: "false")
 *   auto-bubble-show-up  Show proactive speech bubbles on a timer (default: "true")
 *
 * JavaScript API (call on the element instance):
 *   el.show()                       Open the chat panel
 *   el.hide()                       Close the chat panel
 *   el.alert(message, options?)     Show a speech bubble
 *     options.onClickPrompt  string   Auto-sent to chat when bubble is clicked
 *     options.duration       number   Auto-dismiss ms (default 7000)
 */

// Capture script base URL at parse time — document.currentScript is only
// available during synchronous script execution, not inside callbacks.
(() => {
  const scriptSrc = document.currentScript?.src || '';
  const baseUrl   = new URL('.', scriptSrc || location.href).href;

class AssistantWidget extends HTMLElement {
  static get observedAttributes() {
    return ['mode', 'api-url', 'skill', 'title', 'theme-color', 'show-unread-count', 'auto-bubble-show-up'];
  }

  connectedCallback() {
    if (this._mounted) return;
    this._mounted = true;
    this._render();
  }

  attributeChangedCallback() {
    // Re-render on attribute changes (e.g. SPA route changes)
    if (this._mounted) {
      this._mounted = false;
      this.shadowRoot.innerHTML = '';
      this._render();
    }
  }

  _config() {
    return {
      mode:           this.getAttribute('mode')             || 'fab',
      apiUrl:         this.getAttribute('api-url')           || '',
      skill:          this.getAttribute('skill')             || 'merchandising-assistant',
      title:          this.getAttribute('title')             || 'Virtual Assistant',
      themeColor:     this.getAttribute('theme-color')       || '#0064d9',
      showUnreadCount:   this.getAttribute('show-unread-count')   === 'true',
      autoBubbleShowUp:  this.getAttribute('auto-bubble-show-up') !== 'false',
    };
  }

  _frameUrl(cfg) {
    const url = new URL('assistant-frame.html', baseUrl);
    url.searchParams.set('apiUrl',      cfg.apiUrl);
    url.searchParams.set('skill',       cfg.skill);
    url.searchParams.set('title',       cfg.title);
    url.searchParams.set('themeColor',  cfg.themeColor);
    return url.toString();
  }

  _render() {
    const cfg      = this._config();
    const frameUrl = this._frameUrl(cfg);
    const shadow   = this.shadowRoot ?? this.attachShadow({ mode: 'open' });

    if (cfg.mode === 'inline') {
      this._renderInline(shadow, frameUrl, cfg);
    } else {
      this._renderFab(shadow, frameUrl, cfg);
    }
  }

  // ── Inline mode ───────────────────────────────────────────────────────────

  _renderInline(shadow, frameUrl, cfg) {
    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 500px;  /* sensible default; host app can override with CSS */
        }
        iframe {
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 16px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.15);
          display: block;
        }
      </style>
      <iframe
        src="${frameUrl}"
        title="${this._esc(cfg.title)}"
        allow="fullscreen"
        loading="lazy"
      ></iframe>`;
  }

  // ── FAB mode ──────────────────────────────────────────────────────────────

  _renderFab(shadow, frameUrl, cfg) {
    shadow.innerHTML = `
      <style>
        :host { display: contents; }

        /* ── FAB button ── */
        .fab {
          position: fixed;
          bottom: 28px;
          right: 28px;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: none;
          background: ${cfg.themeColor};
          cursor: pointer;
          z-index: 2147483640;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          box-shadow: 0 4px 20px rgba(0,0,0,0.30);
          animation: fab-pulse 3s ease-in-out infinite;
          transition: background 0.2s, transform 0.15s;
        }
        .fab:hover  { transform: scale(1.08); animation: none; }
        .fab:active { transform: scale(0.95); }
        .fab.is-open {
          background: #d8e4f5;
          animation: none;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }
        .fab.is-open .fab-svg { opacity: 0.5; transform: scale(0.85); }

        @keyframes fab-pulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(0,0,0,0.30); }
          50%       { box-shadow: 0 4px 32px rgba(0,0,0,0.45), 0 0 0 10px rgba(0,0,0,0.06); }
        }

        .fab-svg {
          width: 42px;
          height: 42px;
          transition: opacity 0.2s, transform 0.2s;
        }

        /* Badge */
        .fab-badge {
          position: absolute;
          top: 3px;
          right: 3px;
          min-width: 20px;
          height: 20px;
          padding: 0 4px;
          border-radius: 10px;
          background: #b71c1c;
          color: #fff;
          font-size: 0.65rem;
          font-weight: 700;
          font-family: -apple-system, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #fff;
          pointer-events: none;
        }
        .fab-badge[hidden] { display: none; }

        /* ── Speech bubble ── */
        .speech-bubble {
          position: fixed;
          bottom: 104px;
          right: 28px;
          width: 330px;
          background: #fff;
          border-radius: 18px;
          padding: 20px 16px 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          z-index: 2147483639;
          display: flex;
          flex-direction: column;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          animation: bubble-in 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .speech-bubble[hidden] { display: none; }
        .speech-bubble p:not(.speech-title) {
          flex: 1;
          font-size: 0.88rem;
          line-height: 1.5;
          color: #1c1e21;
          margin: 0;
        }
        .speech-badge {
          position: absolute;
          top: -14px;
          right: 14px;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #fff;
          background: var(--bubble-badge-bg, linear-gradient(135deg, #c026d3 0%, #7c3aed 100%));
          white-space: nowrap;
          pointer-events: none;
          letter-spacing: 0.02em;
        }
        .speech-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1c1e21;
          margin: 0 0 12px;
          line-height: 1.3;
        }
        .speech-text { margin-top: 0; }
        .speech-title + .speech-text { margin-top: 0; }
        .speech-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 14px;
          width: 100%;
        }
        .speech-action-btn {
          width: 100%;
          padding: 12px 14px;
          border-radius: 12px;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          border: 1.5px solid #d8d8d8;
          background: #fff;
          color: #1c1e21;
          text-align: center;
          transition: background 0.15s, border-color 0.15s;
        }
        .speech-action-btn:hover { background: #f5f5f5; border-color: #bbb; }
        .speech-action-btn[data-action-type="cancel"] { font-weight: 400; }
        .speech-action-btn[data-variant="primary"] {
          font-weight: 700;
          border-color: #c0c0c0;
        }
        .speech-action-btn[data-variant="primary"]:hover { background: #f5f5f5; border-color: #aaa; }
        @keyframes bubble-in {
          from { opacity: 0; transform: translateY(12px) scale(0.93); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes bubble-out {
          from { opacity: 1; transform: translateY(0)    scale(1); }
          to   { opacity: 0; transform: translateY(12px) scale(0.93); }
        }
        .speech-bubble.dismissing { animation: bubble-out 0.22s ease-in forwards; }

        /* ── Panel ── */
        .panel {
          position: fixed;
          bottom: 104px;
          right: 28px;
          width: 400px;
          height: 600px;
          z-index: 2147483641;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 40px rgba(0,0,0,0.20);

          /* Closed state */
          visibility: hidden;
          opacity: 0;
          transform: translateY(20px) scale(0.97);
          pointer-events: none;
          transition:
            transform 0.32s cubic-bezier(0.175, 0.885, 0.32, 1.275),
            opacity 0.25s ease,
            visibility 0s linear 0.32s;
        }
        .panel.is-open {
          visibility: visible;
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
          transition:
            transform 0.32s cubic-bezier(0.175, 0.885, 0.32, 1.275),
            opacity 0.25s ease,
            visibility 0s linear 0s;
        }
        .panel.is-expanded {
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          border-radius: 0;
        }
        .panel iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }

        @media (max-width: 420px) {
          .panel        { width: calc(100vw - 16px); right: 8px; bottom: 96px; height: 70vh; }
          .fab          { right: 16px; bottom: 16px; }
          .speech-bubble { right: 8px; width: calc(100vw - 16px); }
        }
      </style>

      <!-- Speech bubble -->
      <div class="speech-bubble" hidden>
        <div class="speech-badge" hidden></div>
        <p class="speech-title" hidden></p>
        <p class="speech-text"></p>
        <div class="speech-actions" hidden></div>
      </div>

      <!-- FAB -->
      <button class="fab" aria-label="Open ${this._esc(cfg.title)}" aria-expanded="false">
        <svg class="fab-svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="13.5" y="2" width="2.5" height="6" rx="1.2" fill="rgba(255,255,255,0.7)"/>
          <circle cx="14.75" cy="2.2" r="2" fill="#7ec8ff"/>
          <rect x="24" y="2" width="2.5" height="6" rx="1.2" fill="rgba(255,255,255,0.7)"/>
          <circle cx="25.25" cy="2.2" r="2" fill="#7ec8ff"/>
          <rect x="5" y="7" width="30" height="25" rx="9" fill="rgba(255,255,255,0.93)"/>
          <rect x="2" y="13" width="4" height="9" rx="2" fill="rgba(255,255,255,0.75)"/>
          <rect x="34" y="13" width="4" height="9" rx="2" fill="rgba(255,255,255,0.75)"/>
          <circle cx="14" cy="17.5" r="5" fill="white"/>
          <ellipse cx="14" cy="18" rx="2.5" ry="2.5" fill="#0064d9"
                   style="transform-origin:14px 18px;animation:eye-blink 4s ease-in-out infinite"/>
          <circle cx="15.2" cy="16.8" r="0.8" fill="white"/>
          <circle cx="26" cy="17.5" r="5" fill="white"/>
          <ellipse cx="26" cy="18" rx="2.5" ry="2.5" fill="#0064d9"
                   style="transform-origin:26px 18px;animation:eye-blink 4s ease-in-out infinite 0.05s"/>
          <circle cx="27.2" cy="16.8" r="0.8" fill="white"/>
          <path d="M 13 24.5 Q 20 29.5 27 24.5" stroke="#0064d9" stroke-width="1.8" stroke-linecap="round" fill="none"/>
          <rect x="15" y="28" width="10" height="2" rx="1" fill="rgba(0,100,217,0.15)"/>
          <style>
            @keyframes eye-blink {
              0%, 90%, 100% { transform: scaleY(1); }
              95%           { transform: scaleY(0.08); }
            }
          </style>
        </svg>
        <span class="fab-badge" hidden>1</span>
      </button>

      <!-- Chat panel -->
      <div class="panel" aria-label="${this._esc(cfg.title)} chat panel">
        <iframe
          src="${frameUrl}"
          title="${this._esc(cfg.title)}"
          allow="fullscreen"
          loading="lazy"
        ></iframe>
      </div>`;

    this._wireFab(shadow, cfg);
  }

  _wireFab(shadow, cfg) {
    const fab         = shadow.querySelector('.fab');
    const panel       = shadow.querySelector('.panel');
    const iframe      = shadow.querySelector('.panel iframe');
    const badge       = shadow.querySelector('.fab-badge');
    const bubble        = shadow.querySelector('.speech-bubble');
    const bubbleText    = shadow.querySelector('.speech-text');
    const bubbleBadge   = shadow.querySelector('.speech-badge');
    const bubbleTitle   = shadow.querySelector('.speech-title');
    const bubbleActions = shadow.querySelector('.speech-actions');

    // Expose theme color to shadow DOM for primary action button
    shadow.host.style.setProperty('--theme-color', cfg.themeColor);

    let panelOpen    = false;
    let unreadCount  = 0;
    let dismissTimer = null;

    const PROACTIVE_MESSAGES = [
      `Hi there! I'm ${cfg.title} — ask me anything 💬`,
      "Need help? I'm here for you ✨",
      "Have a question? Let's chat 🤝",
    ];
    let proactiveIndex = 0;

    // ── Open / close ──
    const openPanel = () => {
      if (panelOpen) return;
      panelOpen = true;
      fab.setAttribute('aria-expanded', 'true');
      fab.classList.add('is-open');
      panel.classList.add('is-open');
      dismissBubble();
      clearBadge();
    };

    const closePanel = () => {
      if (!panelOpen) return;
      panelOpen = false;
      fab.setAttribute('aria-expanded', 'false');
      fab.classList.remove('is-open');
      panel.classList.remove('is-open', 'is-expanded');
      fab.focus();
    };

    fab.addEventListener('click', () => panelOpen ? closePanel() : openPanel());

    // Close button inside the iframe sends a postMessage — handle it here.
    // Verify both origin and source so only our own iframe can trigger closePanel().
    const frameOrigin = new URL(baseUrl).origin;
    window.addEventListener('message', (e) => {
      if (e.origin !== frameOrigin || e.source !== iframe.contentWindow) return;
      if (e.data?.type === 'assistant-close')  closePanel();
      if (e.data?.type === 'assistant-expand') panel.classList.toggle('is-expanded', e.data.expanded);
      if (e.data?.type === 'assistant-action') {
        this.dispatchEvent(new CustomEvent('assistant-action', {
          detail: { actionId: e.data.actionId, payload: e.data.payload },
          bubbles: true,
        }));
      }
      if (e.data?.type === 'assistant-send') {
        this.dispatchEvent(new CustomEvent('assistant-send', {
          detail: { message: e.data.message, contextId: e.data.contextId },
          bubbles: true,
        }));
      }
    });

    // Forward agent replies from Angular back into the iframe
    this._relayToFrame = (payload) => {
      iframe.contentWindow?.postMessage(payload, frameOrigin);
    };

    // Click outside closes panel.
    // Must use composedPath() — e.target is retargeted to the host element
    // for events originating inside Shadow DOM, making shadow.contains() unusable.
    document.addEventListener('click', (e) => {
      if (!panelOpen) return;
      if (e.composedPath().includes(this)) return;
      closePanel();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panelOpen) { e.preventDefault(); closePanel(); }
    });

    // ── Badge ──
    const clearBadge = () => {
      unreadCount = 0;
      badge.setAttribute('hidden', '');
    };

    // ── Proactive bubble ──
    const dismissBubble = () => {
      clearTimeout(dismissTimer);
      if (bubble.hasAttribute('hidden')) return;
      bubble.classList.add('dismissing');
      bubble.addEventListener('animationend', () => {
        bubble.setAttribute('hidden', '');
        bubble.classList.remove('dismissing');
      }, { once: true });
    };

    const showBubble = () => {
      if (panelOpen) return;
      clearTimeout(dismissTimer);
      // Reset complex fields for plain proactive bubbles
      bubbleBadge.setAttribute('hidden', '');
      bubbleTitle.setAttribute('hidden', '');
      bubbleActions.setAttribute('hidden', '');
      bubbleActions.innerHTML = '';
      bubbleText.textContent = PROACTIVE_MESSAGES[proactiveIndex % PROACTIVE_MESSAGES.length];
      proactiveIndex++;
      bubble.classList.remove('dismissing');
      bubble.removeAttribute('hidden');
      unreadCount++;
      if (cfg.showUnreadCount) {
        badge.textContent = String(unreadCount);
        badge.removeAttribute('hidden');
      }
      dismissTimer = setTimeout(dismissBubble, 7000);
    };

    bubble.addEventListener('click', dismissBubble);

    // First bubble after 8 s, then every 30 s
    if (cfg.autoBubbleShowUp) {
      setTimeout(() => { showBubble(); setInterval(showBubble, 30_000); }, 8_000);
    }

    // ── Public API backing ────────────────────────────────────────────────
    this._openPanel  = openPanel;
    this._closePanel = closePanel;

    this._alertBubble = (messageOrOptions, legacyOptions = {}) => {
      const isComplex = messageOrOptions !== null && typeof messageOrOptions === 'object';
      const opts = isComplex ? messageOrOptions : { content: String(messageOrOptions), ...legacyOptions };
      const duration = opts.duration ?? -1;
      const actions  = [...(opts.actions ?? [])];

      clearTimeout(dismissTimer);
      bubble._promptHandler && bubble.removeEventListener('click', bubble._promptHandler);
      bubble._promptHandler = null;
      bubbleActions.innerHTML = '';

      // Badge
      if (opts.alert) {
        bubbleBadge.textContent = opts.alert;
        bubbleBadge.removeAttribute('hidden');
      } else { bubbleBadge.setAttribute('hidden', ''); }

      // Title
      if (opts.title) {
        bubbleTitle.textContent = opts.title;
        bubbleTitle.removeAttribute('hidden');
      } else { bubbleTitle.setAttribute('hidden', ''); }

      // Body
      bubbleText.textContent = opts.content ?? '';

      // Actions
      if (actions.length > 0) {
        bubbleActions.removeAttribute('hidden');
        for (const action of actions) {
          const btn = document.createElement('button');
          btn.className = 'speech-action-btn';
          btn.dataset.variant    = action.variant ?? 'secondary';
          btn.dataset.actionType = action.actionType;
          btn.textContent = action.content;
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            dismissBubble();
            if (action.actionType === 'sendMessage' && action.value) {
              openPanel();
              iframe.contentWindow.postMessage({ type: 'assistant-prompt', prompt: action.value }, frameOrigin);
            }
          });
          bubbleActions.appendChild(btn);
        }
      } else {
        bubbleActions.setAttribute('hidden', '');
        // Legacy: whole-bubble click opens + sends
        if (!isComplex && opts.onClickPrompt) {
          bubble._promptHandler = () => {
            dismissBubble();
            openPanel();
            iframe.contentWindow.postMessage({ type: 'assistant-prompt', prompt: opts.onClickPrompt }, frameOrigin);
          };
          bubble.addEventListener('click', bubble._promptHandler, { once: true });
        }
      }

      bubble.classList.remove('dismissing');
      bubble.removeAttribute('hidden');
      unreadCount++;
      if (cfg.showUnreadCount) {
        badge.textContent = String(unreadCount);
        badge.removeAttribute('hidden');
      }
      if (duration > 0) dismissTimer = setTimeout(dismissBubble, duration);
    };
  }

  // ── Public API ────────────────────────────────────────────────────────────
  show()                  { this._openPanel?.(); }
  hide()                  { this._closePanel?.(); }
  alert(message, options) { this._alertBubble?.(message, options); }
  relayToFrame(payload)   { this._relayToFrame?.(payload); }

  // ── Utility ───────────────────────────────────────────────────────────────
  _esc(str) {
    return str.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
  }
}

customElements.define('assistant-widget', AssistantWidget);
})();
