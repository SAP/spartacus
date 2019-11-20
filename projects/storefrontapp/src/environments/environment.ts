// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  // The following is needed for argonauts deployments
  occBaseUrl: 'https://yprofiletest2.yrdci.fra.hybris.com:9002',
  configUrl: 'https://tag.static.stage.context.cloud.sap/config/dfbb97b0-f4d7-11e9-9c99-2125ab7968c6',
  profileTagUrl: 'http://127.0.0.1:8080/profile-tag.js',
  authClientId: 'mobile_android222',
  authClientSecret: 'li0A2SEP41s1CQRUaodiCTDJaXtm76m',
};