# SSR loadtest

To run the SSR loadtest, execute the command:
```bash
yarn loadtest:ssr
```

Note: behind the scenes the mechanism uses the JS API of the npm `loadtest` tool.

## Total number of requests
The total number of requests is controlled with the first command argument. For example to run 500 requests, execute the command:
```bash
yarn loadtest:ssr 500
```

## Limit of concurrent requests
The concurrency limit is controlled with the second command argument. For example to run 500 requests with a concurrency limit 15, execute the command:
```bash
yarn loadtest:ssr 500 15
```

## URL paths
The url paths to make requests to can be passed via the `LoadtestConfig.urls` property to the `LoadtestRunner.run` method.

Example:

```ts
const testConfig: LoadtestConfig = {
  ...DEFAULT_CONFIG,
  urls: [
    '/electronics-spa/',
    '/electronics-spa/faq',
    '/electronics-spa/p/3965240',
  ]
};
new LoadtestRunner().run(testConfig).then((results: LoadtestResult) => {
  /* generate report... */
}
```

## Result metrics
The class `LoadtestResult` OOTB exposes an API for max, min or avg response time. But it also exposes the property `rawResponses` which can be used to compute other metrics.

## Generating reports

For generating reports you can use the `new CsvFile({fileName})` class and its method `appendRow(data)`. If the file doesn't exist yet, it's created automatically and column headers are created based on the keys of the passed data object.

CAUTION: for correctness of a single file, the order of object keys has to be the same for every passed data object.

Example:

```ts
new LoadtestRunner().run(testConfig).then((results) => {
  const report = new CsvFile({ filename: `some-report.csv` });

  report.appendRow({
    // == GIVEN ==
    '[TEST SETUP] Urls': `homepage, faq, PDP`,
    '[TEST SETUP] Total requests': testConfig.totalRequests,
    '[TEST SETUP] Concurrency limit': testConfig.concurrencyLimit,
    /*
    For reference, you might want to add below more information
    about the custom setup of app or ssr.
    NOTE: if any value is hardcoded, ensure it's actual!
    e.g. '[APP SETUP] Static Basesite Config': true,
    e.g. '[APP SETUP] OCC Cached': false,
    e.g. '[APP SETUP] SSR Reuse Current Rendering': true,
    */

    // == RESULTS ==
    'Avg response time': results.avgResponseTime,
    'Max response time': results.maxResponseTime,
    'Min response time': results.minResponseTime,
  });
});
```