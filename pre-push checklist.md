# Pre-push checklist

- [ ] `yarn install`
- [ ] `yarn prettier:fix`
- [ ] `./ci-scripts/validate-lint.sh`
- [ ] `yarn build:libs`
- [ ] `yarn build`
- [ ] `./ci-scripts/unit-tests.sh`
- [ ] `./ci-scripts/lhci.sh`
- [ ] If schematics have been updated: `yarn --cwd feature-libs/pickup-in-store run test:schematics --coverage=true`
