# Pre-push checklist

- [ ] `npm install`
- [ ] `./ci-scripts/prepend-license.sh`
- [ ] `npm run config:check`
- [ ] `npm run prettier:fix`
- [ ] `npm run lint:styles`
- [ ] `npm run i18n-lint`
- [ ] `ng lint pickup-in-store`
- [ ] `npm run build:libs`
- [ ] `npm run build`
- [ ] `ng test pickup-in-store --source-map --watch=false --code-coverage --browsers=ChromeHeadless`
- [ ] `./ci-scripts/lhci.sh` (warning: slow, ~12 minutes)
- [ ] If schematics have been updated: `npm --prefix feature-libs/pickup-in-store run test:schematics --coverage=true`

## `./ci-scripts/prepend-license.sh` prerequisites

1. Install pipx - <https://pypa.github.io/pipx/>
2. Install reuse - `pipx install reuse` (<https://github.com/fsfe/reuse-tool>)

## Unit Tests

If we have changed other feature libraries we should run the unit tests for those in a similar fashion. i.e. `ng test <library>` etc.

## Other useful commands

- `npm run generate:deps`
- `npm run config:update`
- `npm run config:update --bump-version`
- `npm --prefix feature-libs/pickup-in-store run test:schematics --coverage=true` (schematics unit tests)
