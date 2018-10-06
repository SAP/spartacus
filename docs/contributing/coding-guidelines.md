# Coding Guidelines

To keep the Spartacus code readable and maintainable, please follow these rules, even if you find them violated somewhere. Note that this list is not complete.
When a file is consistently not following these rules and adhering to the rules would make the code worse, follow the local style.

[TOC]

## Overall Angular Guidelines

### General

We are following [Google's Style Guide](https://angular.io/guide/styleguide).

### Coding Guidelines Reported from the CLI

Certain guideline violations can be detected automatically by a tool called codelyzer.  It's bundled with the Angular CLI. You can analyze an angular app with the following command:

```
$ ng lint
```


The tool reports violations to the guidelines for the whole application.  If all good, it will output:

```
All files pass linting.
```

Otherwise, issues will be listed:

```
ERROR: /SAPDevelop/AngularApp/src/app/myfeature/myfeature.component.ts[7, 14]: The name of the class MyFeature should end with the suffix Component (https://angular.io/styleguide#style-02-03)

Lint errors found in the listed files.
```


If you look at the end of the error message, there is a direct link to the style guideline that is violated.

### Coding Guidelines on the Pipeline

The  `ng lint` command is part of the Definition of Done and is integrated into the pipeline. 

New violations on the branch = non-green build + no merges allowed.

### Coding Guidelines in the IDE

To make the standards adoption even more seamless, vscode and other editors can provide live feedback from the rules reported by `ng lint`.

All that is required is to install the TSLint plugin. So far, it works out of the box without the need to add further configuration. (TSlint reads the project's `tslint.json` file and seems to figure it out on its own.)

### Coding guidelines in DOD

Use the TSLint vscode plugin. Code styling errors will show up in red as you type.



## Spartacus Specific Guidelines

### NGRX

We have chosen to use the NGRX store to manage the global application state in our features. Using NGRX has apparent advantages for performance, better testability, and ease of troubleshooting (with time travel and such).

- The rule of thumb is to use the store for a feature unless there is a compelling reason not to.  We want to keep it consistent throughout the app.
- Use one common store for the whole app.
- Using the store doesn’t mean that we need to cache everything.  Caching should be used with intent and where it makes sense.  In general, cms data is a good candidate for caching; application data is not.

### Site pages

When working on a page, don't forget about the language and currency options that are available from the header at any time. Data may need updating when site-context is changed; sometimes we also need to update the data for user login/logout).

### Components

In component, if you manually call subscribe (not using async pipe), don't forget to unsubscribe it. It is generally better to use async pipe instead of .subscribe).