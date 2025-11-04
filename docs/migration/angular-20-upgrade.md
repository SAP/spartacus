# Angular 20 Upgrade

## Migration Commands

### 1. Angular Core
```bash
npx nx migrate @angular/core@20
```
- Clean up `migrations.json` (remove optional migrations)
```bash
npx nx migrate --run-migrations
rm migrations.json
git add .
git commit -m "chore: migrate to Angular 20"
```

### 2. Angular CLI
```bash
npx nx migrate @angular/cli@20
```
- Clean up `migrations.json` (remove optional migrations)
```bash
npx nx migrate --run-migrations
rm migrations.json
git add .
git commit -m "chore: migrate Angular CLI to v20"
```

### 3. NgRx
```bash
npx nx migrate @ngrx/store@20
```
- Clean up `migrations.json` (remove optional migrations)
```bash
npx nx migrate --run-migrations
rm migrations.json
git add .
git commit -m "chore: migrate NgRx to v20"
```

### 4. Angular ESLint
```bash
npx nx migrate @angular-eslint/schematics@20
```
- Clean up `migrations.json` (remove optional migrations)
```bash
npx nx migrate --run-migrations
rm migrations.json
git add .
git commit -m "chore: migrate Angular ESLint to v20"
```

### 5. Jest Preset Angular
```bash
npx nx migrate jest-preset-angular@latest
```
- Clean up `migrations.json` if it exists (remove optional migrations)
```bash
npx nx migrate --run-migrations
rm migrations.json
git add .
git commit -m "chore: update jest-preset-angular"
```

### 6. ng-packagr
```bash
npx nx migrate ng-packagr@20
```
- Clean up `migrations.json` if it exists (remove optional migrations)
```bash
npx nx migrate --run-migrations
rm migrations.json
git add .
git commit -m "chore: update ng-packagr to v20"
```

### 7. @ng-select/ng-select
```bash
npx nx migrate @ng-select/ng-select@latest
```
- Clean up `migrations.json` if it exists
- If no migrations.json generated, skip next command
```bash
npx nx migrate --run-migrations
rm migrations.json
git add .
git commit -m "chore: update @ng-select/ng-select"
```

### 8. angular-oauth2-oidc
```bash
npx nx migrate angular-oauth2-oidc@20
```
- Clean up `migrations.json` if it exists
- If no migrations.json generated, skip next command
```bash
npx nx migrate --run-migrations
rm migrations.json
git add .
git commit -m "chore: update angular-oauth2-oidc to v20"
```

### 9. ngx-infinite-scroll
```bash
npx nx migrate ngx-infinite-scroll@20
```
- Clean up `migrations.json` if it exists
- If no migrations.json generated, skip next command
```bash
npx nx migrate --run-migrations
rm migrations.json
git add .
git commit -m "chore: update ngx-infinite-scroll to v20"
```

### 10. @angular-builders/custom-esbuild
```bash
npx nx migrate @angular-builders/custom-esbuild@20
```
- Clean up `migrations.json` if it exists
- If no migrations.json generated, skip next command
```bash
npx nx migrate --run-migrations
rm migrations.json
git add .
git commit -m "chore: update @angular-builders/custom-esbuild to v20"
```

### 11. Nx to latest
```bash
npx nx migrate latest
```
- Clean up `migrations.json` (remove optional migrations)
```bash
npx nx migrate --run-migrations
rm migrations.json
git add .
git commit -m "chore: update Nx to latest"
```

## Steps Completed

### Package Migrations
- [x] Migrate Angular Core
- [x] Migrate Angular CLI
- [x] Migrate NgRx
- [x] Migrate Angular ESLint
- [x] Migrate Jest Preset Angular
- [x] Migrate ng-packagr
- [x] Migrate @ng-select/ng-select
- [x] Migrate angular-oauth2-oidc
- [x] Migrate ngx-infinite-scroll
- [x] Migrate @angular-builders/custom-esbuild
- [x] Migrate Nx to latest

### Angular 20 Breaking Changes Checklist
- [x] Rename `afterRender` to `afterEveryRender` (no changes made - not used)
- [x] Replace `TestBed.flushEffects()` with `TestBed.tick()` (no changes made - not used)
- [x] Rename `provideExperimentalCheckNoChangesForDebug` to `provideCheckNoChangesConfig` (no changes made - not used)
- [x] Refactor code to avoid `ng-reflect-*` attributes (no changes made - 48 usages in test files only)
- [x] Adjust code calling functions returning `RedirectFn` (no changes made - not used)
- [x] Rename `request` property to `params` in resources (no changes made - not used)
- [x] Rename `loader` property to `stream` in rxResources (no changes made - not used)
- [x] Replace `ResourceStatus` enum with constant strings (no changes made - not used)
- [x] Rename `provideExperimentalZonelessChangeDetection` to `provideZonelessChangeDetection` (no changes made - not used)
- [x] Update templates using `{{ in }}` to `{{ this.in }}` (no changes made - not used)
- [x] Review Router commands arrays now using `readonly T[]` (no changes made - no breaking usage)
- [x] Review animation-related test assertions (no changes made - requires testing)
- [x] Handle uncaught errors in event listeners in tests (no changes made - requires testing)
- [x] Update Route guard arrays to remove `any` type (no changes made - no issues found)
- [x] Ensure Node.js version is at least 20.11.1 (no changes made - using v24.10.0)
- [x] Replace `TestBed.get()` with `TestBed.inject()` (no changes made - already migrated)
- [x] Remove `InjectFlags` enum usage (no changes made - already migrated)
- [x] Update `injector.get()` to use `ProviderToken<T>` (no changes made - no issues found)
- [x] Upgrade TypeScript to at least 5.8 (no changes made - using v5.9.3)
- [x] Handle async errors from `AsyncPipe` in tests (no changes made - requires testing)
- [x] Refactor `PendingTasks.run` to `PendingTasks.add` (no changes made - not used)
- [x] Update templates using `{{ void }}` to `{{ this.void }}` (no changes made - not used)
- [x] Review `DatePipe` with `Y` formatter without `w` (no changes made - only YYYY used)
- [x] Review templates with parentheses and nullish coalescing (no changes made - requires testing)

### Update Internal Library Dependencies
- [x] Run `npm run config:update -- --bump-versions` to update dependencies in internal libraries
- [x] Run `npm run generate:deps` to regenerate dependencies.json

### Build Issues

- [x] Fix router.reducer.ts (canActivate is now typed in Angular)
- [ ] Fix Config type compatibility issues - Config types (CmsConfig, RoutingConfig, I18nConfig, SiteContextConfig) have no properties in common with base Config type
- [ ] Fix ConfigInitializer type mismatches in SecurePortalConfigInitializer, I18nConfigInitializer, and SiteContextConfigInitializer
- [ ] Fix Config['features'] property access error
- [ ] Fix provideDefaultConfig type errors in 20+ module files where CmsConfig is not assignable to Config
- [ ] Fix Config.subscribe() type errors in cms-features.service.ts and cms-components.service.ts
- [ ] Fix provideDefaultConfigFactory error in routing.module.ts line 25
- [ ] Fix Config.backend property access errors in media.service.ts lines 405-406
- [x] Fix ng-select compatibility issues - OutputEmitterRef doesn't have pipe() method (ng-select-a11y.directive.ts lines 109-110)
- [ ] Fix ng-select ariaLabelDropdown read-only property assignment (ng-select-a11y.directive.ts line 220)
- [ ] Fix router guard type error in cms-routes-impl.service.ts line 139 - DeprecatedGuard | CanActivateFn not assignable to Type<any>

## Issues Encountered

### Peer Dependency Conflicts

**ESLint Issue:**
- After migrations, `npm install` failed with peer dependency conflict
- Problem: `eslint-plugin-deprecation@3.0.0` requires `eslint@^8.0.0`, but migrations updated ESLint to `9.28.0`
- Solution: Removed `eslint-plugin-deprecation` (deprecated package) and used `typescript-eslint`'s built-in deprecation rule instead

**Jest Issue:**
- After fixing ESLint, `npm install` still failed with another peer dependency conflict
- Problem: `jest-preset-angular@15.0.3` requires `jest@^30.0.0`, but we have `jest@29.7.0`
- Temporary workaround: use `jest-preset-angular@14.6.0`

### Testing & Verification
- [ ] Build the app
- [ ] Fix build errors
- [ ] Run linting
- [ ] Fix linting errors
- [ ] Run unit tests
- [ ] Fix unit tests
- [ ] Run E2E tests
- [ ] Fix E2E tests

