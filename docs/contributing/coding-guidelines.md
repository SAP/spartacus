# Coding Guidelines

To keep the Spartacus code readable and maintainable, please follow our coding guidelines, even if you find them violated somewhere. If a file is consistently not following the guidelines, and adhering to the guidelines would make the code worse, then follow the local style.

## Overall Angular Guidelines

We follow [Google's Style Guide](https://angular.io/guide/styleguide).

### Coding Guidelines Check Using the CLI

Certain guideline violations can be detected automatically by a tool called codelyzer, which is bundled with the Angular CLI. You can analyze an angular app with the following command:

```
$ ng lint
```


The tool reports violations to the guidelines for the whole application.  If there are no errors, it will output the following:

```
All files pass linting.
```

Otherwise, issues will be listed. The following is an example:

```
ERROR: /SAPDevelop/AngularApp/src/app/myfeature/myfeature.component.ts[7, 14]: The name of the class MyFeature should end with the suffix Component (https://angular.io/styleguide#style-02-03)

Lint errors found in the listed files.
```

If you look at the end of the error message, there is a direct link to the style guideline that is violated.

### Coding Guidelines on the Pipeline

The  `ng lint` command is part of the Definition of Done and is integrated into the pipeline. 

New violations on the branch result in a non-green build, and no merges are allowed.

### Coding Guidelines in the IDE

To make the standards adoption even more seamless, Visual Studio Code (VS Code) and other editors can provide live feedback from the rules reported by `ng lint`.

We use a number of VS Code extensions for code compliance. When you open the source folder in VS Code, if you are missing any of the recommended extensions, VS Code prompts you to install them.

You can see the list of recommended extensions in `.vscode/extensions.json`.

If you are missing any of the recommended extensions, please install them.

## Spartacus-Specific Guidelines

### NGRX

We use the NGRX store to manage the global application state in our features. Using NGRX has apparent advantages for performance, better testability, and ease of troubleshooting (with time travel and such).

- Use the store for a feature unless there is a compelling reason not to. We want to keep it consistent throughout the app.
- Use one common store for the whole app.

**Note**: Using the store does not mean that we need to cache everything. Caching should be used with intent, and where it makes sense. In general, CMS data is a good candidate for caching, while application data is not.

### Site Context

Site context can be changed for each page. The response data may be different for different site contexts. Keep this in mind when working on pages.

Also, logged-in users and anonymous users may see different response data. When working on pages, take into consideration that a user can change their login status through login or logout.

### Naming Conventions

Component selectors should always start with "cx-".

### Code Structure

The code structure of each module should be consistent. For example:

- Store-related code is in the `store` folder
- Component code is in the `component` folder
- All OCC (API) services are inside the `OccModule`

However, common UI components are inside the `UI/components` folder.

### Keep Modules Small

Try to keep modules as small as possible. In most cases, one module has only one component.

### Unit Tests, Always

New code must always be covered by unit tests.

### End-To-End Tests

New, UI-oriented features must always be covered by basic UI end-to-end tests. The file names for the tests should end with `e2e-spec.ts`, and for page objects, the file names should end with `po.ts`. 

If you decide to write an end-to-end test based on user-flow, add the word `flow` to the test's name. If you have more than one user-flow test, separate them into individual files, so they can be run in parallel. We also recommend grouping the tests in a sub-directory with a relevant name. For reference, have a look at the end-to-end tests for product search.

To know if your end-to-end test belongs to the `smoke` folder or the `regression` folder, ask yourself the following questions:

* Is the functionality fragile?

    If yes, the test belongs in the `smoke` folder. A good example of fragile functionality is the product search.

* Is the user-flow critical?

    If yes, the test belongs in the `smoke` folder. A good example of a critical user-flow are the steps to complete the checkout.

If you answered "no" to these questions, then the test belongs in the `regression` folder.

### Reduce Module Dependencies

Always try to reduce module dependencies.

### Layers in Spartacus

`occ -> ngrx/store -> component`

We are currently planning to add a one-layer "facade" between `ngrx/store` and `component`. Work on the ProductModule is done, as is a part of the work on the CmsModule. We will add facades to all feature modules soon.

### Server-Side Rendering

Do not break server-side rendering (SSR).

For more information, see the [Server-Side Rendering Coding Guidelines](./coding-guidelines-ssr.md).

### Protected and Private Methods

If a method needs to be extendible, declare it as a `protected` method. Keep in mind, however, that all methods that are `protected` are a part of our public API. If you update a `protected` method, you must be careful not to introduce breaking changes as much as possible. If a method does not need to be extendible, declare it as `private` instead. For example, if you are creating helper methods in a service for code readability, it is probably better to declare these methods as `private`, unless it is essential for these methods to be extendible by customers.