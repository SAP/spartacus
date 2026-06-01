# Configurable State Rehydration

## SSR Transfer State

The application runs XHR requests on the server and then again on the client-side (when the application bootstraps). To prevent unnecessary back end calls for the state that was already populated on the server, we include part of the NgRX state with the server-side rendered HTML.

You can configure the transfer of CMS and products state (from NgRx store), as shown in the following example:
 
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

You can also narrow the configuration to specific state sub-parts:

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
