// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // occBaseUrl:
  //   'https://storefront.c39j2-walkersde1-d4-public.model-t.cc.commerce.ondemand.com'
  occBaseUrl: 'https://dev-com-17.accdemo.b2c.ydev.hybris.com:9002'
};

// 1. from where to call dispatch an action to update the `latestPageKeyReducer`? Basically from where to call the `latestPageKeyReducer`
// 1.1 create a new action for this?
