
### Prerequisite: build Spartacus libs, publish to local verdaccio, install in the test-app
In the first time, you need to build Spartacus libs, publish them to local verdaccio and then install them in the `test-app`.

1. enter the root folder of Spartacus repo
2. run the Schematics testing tool `npx npx ts-node tools/schematics/testing.ts --voice-notify` (optionally with `--voice-notify` to get sound notifications on Mac when builds finished - recommended)
3. select option `build all libs` and hit enter (now turn on your speakers, make a coffee and wait a few minutes for building all libs. You should be notified when builds finished by a voice message 🗣️ "Publish completed")
4. (keep the Schematics testing tool running in one terminal)
5. **In another terminal**, enter the `test-app` folder (run `cd test-app`)
6. remove `package-lock.json` file (run `rm package-lock.json`)
7. run `npm install` (being still in the `test-app` folder)

Note: every time you change something in the Spartacus libs, you need to repeat the steps above.
If you make changes only in one lib, you can rebuild only this lib (not all) and then re-publish all libs to local verdaccio and then reinstall dependencies in the `test-app` folder.:
1. enter the root folder of Spartacus repo
2. build one lib in prod mode  - run `nx run LIBRARY_NAME:build:production` (e.g. `nx run storefrontlib:build:production`)
3. run the Schematics testing tool `npx npx ts-node tools/schematics/testing.ts` (optionally with `--voice-notify` to get sound notifications when builds finished - recommended)
4. select option `publish` and hit enter (now wait a little time for publishing the lib to local verdaccio)
5. (keep the Schematics testing tool running in one terminal)
6. **In another terminal**, enter the `test-app` folder (run `cd test-app`)
7. remove `package-lock.json` file (run `rm package-lock.json`)
8. remove `node_modules` folder (run `rm -rf node_modules`)
9. run `npm install` (being still in the `test-app` folder)

### Run test-app with SSR in dev mode (watch mode)

- run `npm run dev:ssr`
- (wait until you see in the terminal `[SERVE] Node Express server listening on http://localhost:4000`)
- open http://localhost:4000/

Note: Under the hood, `npm run dev:ssr` runs 2 commands via `concurrently`: `npm run watch` [BUILD] and `npm run serve:ssr:watch` [SERVE]. After code changes, build progress appears first, then SSR server restarts with updated code.

Note 2: in subsequent runs of  `npm run dev:ssr` you might see a message immediately `[SERVE] Node Express server listening on http://localhost:4000` (because it can see the previously built SSR app). But after the app is rebuilt for the first time, the SSR server will be restarted with the updated code and you'll see again the message `[SERVE] Node Express server listening on http://localhost:4000`.


### Dependencies

- `@spartacus` libs should be built locally from branch `epic/performance-improvements` of the main Spartacus repo and published to local verdaccio

### Customizations

To clearly see what is a customization and what is a fresh app code, let's keep all the customizations only in the folder `src/app/custom`. Any exceptional customizations outside of the folder should be documented in the file `src/app/custom/CUSTOMIZATIONS-OUTSIDE-THIS-FOLDER.md`.