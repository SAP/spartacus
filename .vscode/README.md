# VSCode Configuration

This folder contains a list of VSCode extensions that are recommended by Spartacus developers as well as opt-in settings for VSCode.

## Extensions

VSCode will read the `extensions.json` and prompt to install all the extensions that are not currently installed.

## Opt-in settings

Recommended settings are stored in `recommended-settings.json` file. Developers that do wish to follow these settings will have to opt-in by creating `settings.json` in `.vscode` folder and copying the whole content over.

If you already have `settings.json`, then you need to manually merge settings from `recommended-settings.json`. This is not an automated process, so you should check occasionally for an updated version of `recommended-settings.json`.
