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
