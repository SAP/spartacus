# PoC: Using WunderGraph with Angular & SSR

This PoC validates if WunderGraph can be used with server-side rendering in Angular and provides a guideline on how it can be done.
At the same time, it also shows a naive approach how Spartacus could consume the BFF in an unoptimal way.

## 1. Quick Start

1. Clone this repo.
2. Install dependencies<sup>\*</sup>: `npm ci`
3. Run the following command<sup>\*</sup>: `npm run dev`
4. The command runs two concurrent development servers: one for WunderGraph and one for the Angular Universal app. When both builds complete, visit [localhost:4200](http://localhost:4200) to view the app.

## Next steps & future

1. If we want to leverage Wundergraph / BFF at its fullest, we would have to use _one_ repo for both Spartacus and BFF. Why? Spartacus needs to consume the wundergraph client and be aware of all the TS types. It will also improve the feedback loop between the BFF endpoint(s) and Spartacus.
2. To leverage BFF, Spartacus should ideally execute _one_(ish) HTTP call, which would return all the data. Doing this in Spartacus would require the major refactor.
3. Since most of the "smart API" logic will be handled by BFF, Spartacus could be simplified a lot. This includes all the Cart, Checkout orchestration logic, Product optimization loading, etc.
4. Interceptors - if Spartacus doesn't execute http calls using Angular's http client, then Angular won't be aware of them, meaning all the existing interceptors won't be executed.
