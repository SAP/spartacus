# Spartacus SSR E2E Test Framework

This project is for testing server-side rendering in Spartacus.

## Running Tests

Before running the test suite, we first need to build our application with `npm install && npm run build:libs && npm run build:ssr:local-http` from the root of the project.

After the build, use the `npm run test:ssr` and `npm run test:ssr:ci` commands from the root of the project to run the tests.

### Retesting after changes

If we change something in the application itself such as library code, we need to rebuild libraries and application again in order to test the changes.

Note: Build time could be improved upon by only rebuilding libraries that have changes.

## Writing tests

In the `src` directory, you will find utility files and spec files, where spec files contain tests and utilities provide the functions in which we can test SSR. A typical test is comprised on setting up a server instance that runs the application in SSR mode and a proxy server instance for manipulating tests to and from the backend. By manipulating requests and responses between the application and the backend API using the proxy server, we can test that our application behaves correctly in different scenarios.

The utilities described below will help you to write an SSR test.

### ssr.utils.ts

Contains the methods we need to start and end our SSR servers. We will typically use these to start a server instance at the start of a test and kill that instance at the end of our test.

### proxy.utils.ts

In addition to our server instance, we will start a proxy server instance in order to intercept requests going to and from the backend. It is a bridge between a typical Spartacus application and the API backend and is used to manipulate requests for testing purposes. For example, we may delay a request in order to test how the server responds to a timeout. Or we could change a status code to 500.

### log.utils.ts

We can use log utilities in order to verify the messages that are generated in the server log. This can help us to assert that the server has done what we think it should do (eg. rendering completion, fallback to CSR, etc).

## Other Notes

- We exclude running SSR tests with application unit tests because they require a unique setup to run in a way we can test SSR.
