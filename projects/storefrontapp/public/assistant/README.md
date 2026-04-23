# Assistant Widget

A self-contained, framework-agnostic AI chat assistant delivered as a Web Component. It uses Shadow DOM for style isolation and an `<iframe>` for the chat UI, so it drops into any webpage with a single `<script>` tag.

---

## Quick Start

```html
<!-- 1. Load the widget script -->
<script src="assets/assistant/assistant-widget.js" defer></script>

<!-- 2. Place the element anywhere in <body> -->
<assistant-widget
  id="my-assistant"
  api-url="https://your-backend.com"
  skill="merchandising-assistant"
  title="Shopping Assistant"
  theme-color="#0064d9">
</assistant-widget>
```

The widget renders a fixed floating button (FAB) in the bottom-right corner. Clicking it opens the chat panel.

---

## Attributes

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `api-url` | `string` (URL) | `""` *(required)* | Base URL of the backend chat server. Used for all API calls from the iframe. |
| `mode` | `"fab"` \| `"inline"` | `"fab"` | **fab** — fixed floating button, chat panel expands on click. **inline** — widget fills its container, always visible. |
| `skill` | `string` | `"merchandising-assistant"` | Skill name passed to the backend on every chat request. |
| `title` | `string` | `"Virtual Assistant"` | Display name shown in the chat header and welcome screen. |
| `theme-color` | CSS color | `"#0064d9"` | Accent color applied to the FAB button and chat header elements. |
| `show-unread-count` | `"true"` \| `"false"` | `"false"` | When `"true"`, a red badge on the FAB shows how many proactive messages have arrived while the panel was closed. |
| `auto-bubble-show-up` | `"true"` \| `"false"` | `"true"` | When `"false"`, disables the automatic proactive speech bubbles. Bubbles can still be shown manually via `alert()`. |

### Example with all attributes

```html
<assistant-widget
  api-url="https://api.example.com"
  mode="fab"
  skill="promotion-assistant"
  title="Deal Finder"
  theme-color="#e67e22"
  show-unread-count="true"
  auto-bubble-show-up="false">
</assistant-widget>
```

---

## JavaScript API

Once the element is in the DOM and the script has loaded, retrieve it and call methods directly:

```js
const assistant = document.getElementById('my-assistant');
```

### `assistant.show()`

Opens the chat panel programmatically.

```js
assistant.show();
```

### `assistant.hide()`

Closes the chat panel programmatically.

```js
assistant.hide();
```

### `assistant.alert(message, options?)`

Shows a speech bubble above the FAB with a custom message. Use this to proactively surface contextual prompts based on user behavior.

```js
assistant.alert(message, {
  onClickPrompt: string, // optional — auto-sent to the chat when the bubble is clicked
  duration: number,      // optional — ms before auto-dismiss (default: 7000)
});
```

#### Parameters

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `message` | `string` | — | Text displayed in the speech bubble. |
| `options.onClickPrompt` | `string` | `null` | If provided, clicking the bubble opens the chat panel and automatically sends this text as the user's first message, triggering an immediate agent response. |
| `options.duration` | `number` | `7000` | How long (ms) the bubble stays visible before auto-dismissing. |

#### Example — proactive product recommendation

```js
// Trigger after user has been on a product page for 30 seconds
assistant.alert(
  'Interested in this product? I can build you a savings plan 🎯',
  {
    onClickPrompt: "I've been looking at this product. Can you help me get the best deal?",
    duration: 10_000,
  }
);
```

When the user clicks the bubble:

1. The chat panel opens.
2. The `onClickPrompt` text is sent as a user message.
3. The agent responds immediately with a streaming reply.

---

## Backend Requirements

The `api-url` server must expose two endpoints:

### `POST /api/chat/stream` (primary)a

Server-Sent Events streaming endpoint.

Request body:

```json
{ "message": "string", "contextId": "string | null", "skill": "string" }
```

Response — `Content-Type: text/event-stream`. Each event must be a JSON line:

```text
data: {"content": "chunk of text"}
data: {"contextId": "abc123"}
```

### `POST /api/chat` (fallback)

Non-streaming endpoint used if SSE is unavailable.

```json
// Request
{ "message": "string", "contextId": "string | null", "skill": "string" }

// Response
{ "reply": "string", "contextId": "string" }
```

### CORS

Both endpoints must allow the origin of the host application:

```js
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
```

---

## postMessage Protocol

The widget and its iframe communicate via `window.postMessage`. This is internal to the widget but documented here for advanced integrations.

| Direction | `type` | Payload | Effect |
| --- | --- | --- | --- |
| iframe → widget | `assistant-close` | — | Closes the chat panel. |
| iframe → widget | `assistant-expand` | `{ expanded: boolean }` | Toggles the panel between compact and full-page modal. |
| widget → iframe | `assistant-prompt` | `{ prompt: string }` | Auto-sends `prompt` as a user message. |

---

## Angular Integration

When embedding in a Spartacus / Angular app, use `AssistantWidgetService` to drive the widget from Angular code rather than accessing the DOM element directly.

```typescript
import { AssistantWidgetService } from './assistant-widget.service';

@Injectable()
export class MyBehaviorService {
  constructor(private assistant: AssistantWidgetService) {}

  onProductDwellTimeout(): void {
    this.assistant.alert(
      'Interested in this product? I can build you a savings plan 🎯',
      { onClickPrompt: "Help me get the best deal on this product." }
    );
  }
}
```

---

## Files

| File | Purpose |
| --- | --- |
| `assistant-widget.js` | Web Component definition. Handles FAB rendering, speech bubble, panel open/close, and the public JS API. |
| `assistant-frame.html` | Chat UI loaded inside the `<iframe>`. Handles message input, streaming responses, markdown rendering, and expand/collapse. |
| `templates/new-user-discount.js` | Display template for new-user discount card. Self-contained (CSS + render function). |
| `test.html` | Interactive test page for verifying all widget features — no backend required for most tests. |

---

## Complex Speech Bubbles

The `alert()` method accepts either a plain string (legacy) or a `ComplexBubbleOptions` object for rich bubble cards.

### Plain string (backward compatible)

```js
assistant.alert('Need help? I am here!');
assistant.alert('Left something in your cart?', { onClickPrompt: 'Help me check out', duration: 10000 });
```

### ComplexBubbleOptions

```typescript
interface BubbleAction {
  actionType: 'sendMessage' | 'cancel';
  variant?: 'primary' | 'secondary'; // default 'secondary'
  content: string;   // button label
  value?: string;    // text auto-sent to AI (sendMessage only)
}

interface ComplexBubbleOptions {
  alert?: string;       // badge text, e.g. "🎉 NEW USER"
  alertColor?: string;  // badge background color (default #7c3aed)
  title?: string;       // bold heading
  content: string;      // body text (required)
  actions?: BubbleAction[];
  duration?: number;    // ms before auto-dismiss; 0 = never (default 7000)
}
```

### Example — new user welcome bubble

```js
assistant.alert({
  alert: '🎉 NEW USER',
  alertColor: '#7c3aed',
  title: 'Welcome, New Member! 🎉',
  content: 'Enjoy an exclusive 10% welcome discount on your first order!',
  duration: 0,
  actions: [
    {
      actionType: 'sendMessage',
      variant: 'primary',
      content: 'Claim my welcome offer ✨',
      value: 'I want to claim my 10% new user discount',
    },
    {
      actionType: 'cancel',
      variant: 'secondary',
      content: "No thanks, I'll continue browsing",
    },
  ],
});
```

### Angular usage via `AssistantWidgetService`

```typescript
import { AssistantWidgetService, ComplexBubbleOptions } from './assistant-widget.service';

@Injectable()
export class PromotionService {
  constructor(private assistant: AssistantWidgetService) {}

  showWelcomeOffer(): void {
    this.assistant.alert({
      alert: '🎉 NEW USER',
      title: 'Welcome, New Member!',
      content: 'Enjoy 10% off your first order.',
      actions: [
        { actionType: 'sendMessage', variant: 'primary', content: 'Claim offer ✨', value: 'I want my welcome discount' },
        { actionType: 'cancel', content: 'No thanks' },
      ],
    });
  }
}
```

---

## Display Templates

The backend can return a structured UI card instead of streaming markdown text by sending a special SSE event:

```text
data: {"displayTemplateId": "new-user-discount", "data": { ... }}
```

The chat UI lazy-loads `templates/{displayTemplateId}.js` on first use, renders the card, and discards any partially streamed text for that turn.

### Bundled templates

| Template ID | File | Description |
| --- | --- | --- |
| `new-user-discount` | `templates/new-user-discount.js` | Discount summary card with order breakdown and CTA |

### `new-user-discount` — data shape

```json
{
  "memberSince": "Apr 19, 2026",
  "discounts": [
    { "label": "10% Welcome Discount", "note": "First order only" }
  ],
  "items": [
    { "name": "Athleisure Cap", "qty": 1, "price": 34.99 }
  ],
  "subtotal": 34.99,
  "lineDiscounts": [
    { "label": "Promotional Discount (5%)", "amount": -1.75 },
    { "label": "New User Discount (10%)", "amount": -3.50 }
  ],
  "tax": 2.38,
  "taxRate": "8%",
  "totalSavings": -5.25,
  "total": 32.12,
  "ctaLabel": "PLACE ORDER",
  "ctaPrompt": "Place my order"
}
```

`ctaLabel` / `ctaPrompt` are optional. When present, a CTA button is rendered; clicking it sends `ctaPrompt` as the next user message.

### Adding a new template

1. Create `templates/{template-id}.js`.

2. Inject template-scoped CSS once at the top (ID guard prevents duplicates):

   ```js
   if (!document.getElementById('tpl-style-my-template')) {
     const s = document.createElement('style');
     s.id = 'tpl-style-my-template';
     s.textContent = `/* template CSS */`;
     document.head.appendChild(s);
   }
   ```

3. Call `registerTemplate` with a render function that returns an HTML string. All user data **must** be escaped before interpolation — `DOMPurify` provides a second layer but is not a substitute for escaping:

   ```js
   registerTemplate('my-template', function(data) {
     function esc(s) {
       return String(s ?? '')
         .replace(/&/g, '&amp;').replace(/</g, '&lt;')
         .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
     }
     return `<div class="template-card">...</div>`;
   });
   ```

4. **No other files need to change.** The frame lazy-loads `templates/{id}.js` automatically when the backend sends that `displayTemplateId`.

### Template CTA actions

Templates support two types of CTA interaction via data attributes (event handlers are wired by the frame — no inline `onclick`):

| Data attribute | Effect |
| --- | --- |
| `data-cta-prompt="..."` | Opens chat and auto-sends the value as a user message |
| `data-action-id="..." data-action-payload='{"key":"val"}'` | Fires `assistant-action` CustomEvent on `<assistant-widget>` for Angular to handle |

Angular handling for custom actions:

```typescript
const widgetEl = document.getElementById('cx-assistant-widget');
widgetEl?.addEventListener('assistant-action', (e: Event) => {
  const { actionId, payload } = (e as CustomEvent).detail;
  // handle navigation, cart updates, analytics, etc.
});
// or with RxJS:
fromEvent<CustomEvent>(widgetEl, 'assistant-action').subscribe(({ detail }) => { ... });
```

---

## Testing

A self-contained test page covers all new features without requiring a running backend.

**Start the dev server, then open:**

```
http://localhost:4200/assistant/test.html
```

| Test section | What it verifies | Backend needed? |
| --- | --- | --- |
| Bubble — Legacy API | `alert(string)` and `alert(string, {onClickPrompt})` still work identically | No |
| Bubble — Complex API | Badge, title, body, primary/secondary action buttons render correctly | No |
| `assistant-action` relay | Fires a mock postMessage from the iframe — checks `CustomEvent` is dispatched on `<assistant-widget>` | No |
| Template render function | Calls `TEMPLATES['new-user-discount']()` directly in the iframe context; injects rendered HTML for visual comparison | No |
| Full SSE flow | Injects a `fetch` mock into the iframe that returns a `displayTemplateId` SSE event; open the FAB and send any message | No |

For the **full SSE flow** test:

1. Click **Mock SSE → new-user-discount card**.
2. Open the chat widget (FAB button) and send any message.
3. The discount summary card renders instead of streamed text.
4. Click **Restore real fetch** to resume normal chat behaviour.

To verify **lazy loading**, watch the Network tab — `templates/new-user-discount.js` should appear exactly once regardless of how many template cards are rendered.
