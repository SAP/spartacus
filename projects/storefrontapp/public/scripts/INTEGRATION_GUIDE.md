Author: Flora Rong

## 📝 Overview
- ✅ Integrate TypeScript-related content into the `@spartacus/storefront` library
- ✅ Automatically install via `ng add @spartacus/schematics`
- ✅ No need to modify existing packaging and installation scripts (`scripts/install`)
- ✅ Maintain code maintainability and reusability

### Structure

```
projects/storefrontlib/shared/services/cart-abandonment/
├── cart-abandonment-tracker.model.ts         # TypeScript models
├── cart-abandonment-tracker.service.ts       # Angular service
├── cart-abandonment-tracker.initializer.ts   # APP_INITIALIZER factory initializeCartAbandonmentTracker
└── index.ts                                  # Export interfaces

Add the following content in Schematic installation logic for automatic installation
projects/schematics/src/add-spartacus/
├── assets/
│   └── cart-abandonment-tracker.js           # JS tracker
├── cart-abandonment-tracker.ts               # installCartAbandonmentTracker: 1. Copy assets/cart-abandonment-tracker.js to public/scripts/ 2. Add script to angular.json 3. Add APP_INITIALIZER provider for initializeCartAbandonmentTracker
└── index.ts                                  # Schematic installation logic: call installCartAbandonmentTracker

projects/schematics/
├── copy-assets.js                            # Copy storefrontapp/public/scripts/cart-abandonment-tracker.js to schematics/src/add-spartacus/assets/cart-abandonment-tracker.js
└── package.json                              # After each npm run build:schematics run, cleanup of generated content occurs, including "src/**/*.js", which causes cart.js to be mistakenly deleted. Call copy-assets.js to copy the js file back


projects/storefrontapp/
└── public/scripts/cart-abandonment-tracker.js


### Advantages

- ✅ TypeScript code is in `storefrontlib`, automatically included in the `@spartacus/storefront` package
- ✅ JavaScript files are automatically copied and configured through schematics
- ✅ Follows Spartacus standard architecture patterns
- ✅ No need to modify installation scripts



#### Testing the Packaging and Installation Process

```bash
cd scripts/install

# Ensure configuration is correct
cat config.default.sh

# Run installation
./run.sh install


## 🔄 Workflow

### Current Installation Process

```
1. npm run build:libs
   └─> Build storefrontlib (includes Cart Abandonment TS code)

2. Publish to Verdaccio
   └─> @spartacus/storefront package contains complete functionality

3. ng new app-name
   └─> Create new application

4. ng add @spartacus/schematics
   ├─> Install @spartacus/storefront (includes TS code)
   ├─> installCartAbandonmentTracker schematic runs
   │   ├─> Copy cart-abandonment-tracker.js to public/scripts/
   │   └─> Update angular.json to add scripts configuration
   │   └─> Add APP_INITIALIZER provider for initializeCartAbandonmentTracker
   └─> Configuration complete!
```

#### Verifying the Generated Application

```bash
# Navigate to the generated application directory
cd $BASE_DIR/apps/csr

# Check if JS file was copied
ls -la public/scripts/cart-abandonment-tracker.js

# Check angular.json configuration
cat angular.json | jq '.architect.build.options.scripts'

# Should see:
# [
#   "public/scripts/cart-abandonment-tracker.js"
# ]
```

#### Testing Runtime Functionality

```bash
# Start the application
cd scripts/install
./run.sh start

# Or directly in the generated application
cd $BASE_DIR/apps/csr
npm start
```

In the browser:

1. Open Developer Tools Console
2. Visit `http://localhost:4200`
3. Check if tracker is loaded:
   ```javascript
   window.CartAbandonmentTracker
   ```
4. Navigate to the cart page
5. Check console output:
   ```
   [CartAbandonmentTracker] Tracker started
   [CartAbandonmentTracker] Entered cart page
   ```

6. Listen for abandonment events:
   ```javascript
   window.addEventListener('cart:abandoned', (event) => {
     console.log('Cart abandoned:', event.detail);
   });
   ```

7. Leave the cart page or wait 15 seconds to verify the event is triggered
