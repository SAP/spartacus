# OPF Context Injection Implementation

## Overview

This implementation provides a **session-scoped context injection** solution that allows PSP scripts to access backend context data without modifications. PSP scripts can simply use `OpfContext.orderId`, `OpfContext.amount`, etc.


## Implementation

### 1. Spartacus Context Injection

```typescript
// OpfResourceLoaderService
executeScriptFromHtml(html: string | undefined, dynamicContext?: string): void {
  if (!isPlatformServer(this.platformId) && html) {
    const element = new DOMParser().parseFromString(html, 'text/html');
    const script = element.getElementsByTagName('script');
    
    if (!script?.[0]?.innerText) {
      return;
    }
    
    const originalScript = script[0].innerText;
    const sessionId = this.generateSessionId();
    
    let wrappedScript: string;
    
    if (dynamicContext) {
      try {
        const contextData = JSON.parse(dynamicContext);
        wrappedScript = this.createSessionScopedScript(originalScript, contextData, sessionId);
      } catch (error) {
        console.warn('Failed to parse dynamic context:', error);
        wrappedScript = this.createSecureScript(originalScript, sessionId);
      }
    } else {
      wrappedScript = this.createSecureScript(originalScript, sessionId);
    }
    
    this.executeScriptWithSession(wrappedScript, sessionId);
  }
}
```

### 2. Session-Scoped Script Creation

```typescript
private createSessionScopedScript(originalScript: string, contextData: any, sessionId: string): string {
  return `
    (function() {
      'use strict';
      
      // Session-isolated context (no global pollution)
      const OpfContext = ${JSON.stringify(contextData)};
      const SessionId = '${sessionId}';
      
      // Context is immediately available - no async waiting
      console.log('PSP: Session', SessionId, 'Context:', OpfContext);
      
      // Original PSP script runs with context available immediately
      ${originalScript}
      
    })();
  `;
}
```

### 3. PSP Script Usage

```javascript
// PSP Script - No modifications needed!
(function() {
  'use strict';
  
  // Context is immediately available
  console.log('PSP: Order ID:', OpfContext.orderId);
  console.log('PSP: Amount:', OpfContext.amount);
  console.log('PSP: Session:', SessionId);
  
  // Use context data for PSP operations
  const paymentData = {
    orderId: OpfContext.orderId,
    amount: OpfContext.amount || 0,
    currency: OpfContext.currency || 'USD',
    billingAddress: OpfContext.billingAddress
  };
  
  // Initialize PSP with context data
  initializePaymentForm(paymentData);
  
})();
```

## Complete Flow Example

### 1. OPF Backend Response

```json
{
  "dynamicScript": {
    "dynamicContext": "{\"orderId\":\"12345\",\"billingAddress\":{\"addressLine1\":\"test street\"},\"amount\":99.99,\"currency\":\"USD\"}",
    "html": "<script>/* PSP script content */</script>"
  }
}
```

### 2. Spartacus Processing

```typescript
// 1. Parse context
const contextData = JSON.parse(dynamicContext);
// contextData = { orderId: "12345", billingAddress: {...}, amount: 99.99, currency: "USD" }

// 2. Generate session ID
const sessionId = "opf-session-1703123456789-abc123";

// 3. Wrap PSP script with context
const wrappedScript = `
  (function() {
    'use strict';
    
    const OpfContext = ${JSON.stringify(contextData)};
    const SessionId = '${sessionId}';
    
    // Original PSP script content
    // ... PSP script code ...
    
  })();
`;

// 4. Execute wrapped script
executeScriptWithSession(wrappedScript, sessionId);
```

### 3. PSP Script Execution

```javascript
// PSP script runs with context immediately available
console.log('PSP: Session', SessionId); // "opf-session-1703123456789-abc123"
console.log('PSP: Order ID:', OpfContext.orderId); // "12345"
console.log('PSP: Amount:', OpfContext.amount); // 99.99

// No async waiting, no event listeners needed
initializePaymentForm();
```

## CSP Compliance

### With Nonce Support

```typescript
// CSP-compliant version with nonce
private createNonceSecuredScript(originalScript: string, contextData: any, nonce: string, sessionId: string): string {
  return `
    (function() {
      'use strict';
      
      // Validate nonce for security
      if (!'${nonce}' || '${nonce}'.length < 16) {
        throw new Error('Invalid nonce provided');
      }
      
      // Session-isolated context
      const OpfContext = ${JSON.stringify(contextData)};
      const SessionId = '${sessionId}';
      const Nonce = '${nonce}';
      
      // Original PSP script runs with context available immediately
      ${originalScript}
      
    })();
  `;
}
```

### CSP Headers

```http
Content-Security-Policy: 
  script-src 'self' 'nonce-{random-nonce}' https://trusted-psp.com;
  object-src 'none';
  base-uri 'self';
  default-src 'self';
```

## Usage

PSP scripts can now simply use:

```javascript
// Access order information
const orderId = OpfContext.orderId;
const amount = OpfContext.amount;
const currency = OpfContext.currency;

// Access billing information
const billingAddress = OpfContext.billingAddress;
const customerEmail = OpfContext.customerEmail;

// Access session information
const sessionId = SessionId;

// Use in PSP operations
const paymentData = {
  orderId: OpfContext.orderId,
  amount: OpfContext.amount,
  currency: OpfContext.currency,
  billingAddress: OpfContext.billingAddress
};
```

This approach provides the **easiest integration** for PSP customers while maintaining **maximum security** and **CSP compliance**.
