# Server side rendering in Spartacus

## Steps

1. Make sure that the production server endpoint is set in your `environment.prod.ts` (dev mode) or `app.module.ts` (shell app mode)

```json
environment = {
  production: true,
  occBaseUrl: 'https://[your_endpoint]',
};
```

1. Turn PWA off (steps below)
1. Rebuild your libs (`yarn build:core:lib`)
1. Build your shell app (`yarn build`)
1. Build your shell app in ssr mode (`yarn build:ssr`)
1. start ssr server (`yarn start:ssr`)

### Service workers

As soon as a service worker is installed, Spartacus version served is the cached version of the index.html + js files. Therefore, SSR is completely skipped.

1. Check that there are no service workers registered in your app and remove them, if any
1. In your app module configuration, turn PWA off, as follows:

```json
StorefrontModule.withConfig({
      production: environment.production,
      backend: {
        occ: {
          baseUrl: 'https://[your_enpdoint],
        },
      },
      pwa: {
        enabled: false,
      },
};
```

## Known issues

If the backend server (endpoint) is either not reachable or not valid through https, you’ll get the following error:

`TypeError: You provided 'undefined' where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`

Make sure the backend endpoint is properly configured and reachable through https
