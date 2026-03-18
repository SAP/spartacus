
## Library Development

```
<library>/
├── root/        # EAGER - always loaded. Put: abstract facades, models, events, tokens, configs, routes
├── core/        # LAZY - business logic. Put: facade implementations, connectors, NgRx store, abstract adapters
├── components/  # LAZY - UI. Put: components, guards, context providers
├── occ/         # LAZY - backend connection. Put: OCC adapter implementations, normalizers, serializers
├── assets/      # Translations
├── styles/      # Styles
├── schematics/      # Installation schematics
└── <lib>.module.ts  # Bundles core+components+occ for lazy loading
```

Multi-entry point libraries (checkout, cart, product): each entry point has own `public_api.ts`. Import as `@spartacus/<lib>/<entry-point>`.
