# Pre-push checklist

- [ ] `yarn install`
- [ ] `yarn prettier:fix`
- [ ] `yarn lint:styles`
- [ ] `yarn i18n-lint`
- [ ] `ng lint pickup-in-store`
- [ ] `yarn build:libs`
- [ ] `yarn build`
- [ ] `ng test pickup-in-store --source-map --watch=false --code-coverage --browsers=ChromeHeadless`
- [ ] `./ci-scripts/lhci.sh` (warning: slow, ~12 minutes)
- [ ] If schematics have been updated: `yarn --cwd feature-libs/pickup-in-store run test:schematics --coverage=true`

N.B. If we have changed other feature libraries we should run the unit tests for those in a similar fashion. i.e. `ng test <library>` etc.
