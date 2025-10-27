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
- [ ] Build the app
- [ ] Fix build errors
- [ ] Run linting
- [ ] Fix linting errors
- [ ] Run unit tests
- [ ] Fix unit tests
- [ ] Run E2E tests
- [ ] Fix E2E tests

