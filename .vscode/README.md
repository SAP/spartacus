# VSCode Configuration

This folder contains a list of VSCode extensions that are recommended by Spartacus developers as well as opt-in settings for VSCode.

## Extensions

VSCode will read the `extensions.json` and prompt to install all the extensions that are not currently installed.

## Opt-in settings

Recommended settings are stored in `recommended-settings.json` file. Developers that do wish to follow these settings will have to opt-in by creating `settings.json` in `.vscode` folder and copying the whole content over.

If you already have `settings.json`, then you need to manually merge settings from `recommended-settings.json`. This is not an automated process, so you should check occasionally for an updated version of `recommended-settings.json`.

## Debugging

The debug configurations are defined in `launch.json`.

In order to debug in VSCode, do the following:

- `yarn start`
- Open the "Debug view" by selecting the Debug icon in the Activity Bar on the side.
- Choose a configuration from the dropdown and click on the green "Start Debugging" button.

More info [here](https://code.visualstudio.com/Docs/editor/debugging).

_NOTE_: if you want to debug in Firefox, you'll need this extension: [firefox-devtools.vscode-firefox-debug](https://marketplace.visualstudio.com/items?itemName=firefox-devtools.vscode-firefox-debug).
