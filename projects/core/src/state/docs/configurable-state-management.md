# Configurable state persistence and rehydration

## Storage Synchronization

You can configure state synchronization with session or local storage like in the following example:

```typescript
ConfigModule.withConfig({
  state: {
    storageSync: {
      keys: [{ auth: ['userToken', 'clientToken'] }]
    }
  }
});
```

## SSR Transfer State

The application runs XHR requests on the server & once again on the Client-side (when the application bootstraps). To prevent unnecessary backend calls for the state that was already populated on the server, we include part of the NgRX state with SSR rendered html.

You can configure transfer of cms and products state (from NgRx store) like in the following example:
 
```typescript
ConfigModule.withConfig({
  state: { 
    ssrTransfer: { 
      keys: { 
        products: true,
        cms: true 
      } 
    } 
  }
});
```

You can also narrow configuration to specific state subparts:

```typescript
ConfigModule.withConfig({
  state: { 
    ssrTransfer: { 
      keys: { 
        products: true,
        cms: {
          page: true,
          navigation: true
        } 
      } 
    } 
  }
});
```
