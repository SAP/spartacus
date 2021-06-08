import { LibraryOptions } from '../shared/utils/lib-utils';

export interface Schema extends LibraryOptions {
  baseUrl?: string;
  occPrefix?: string;
  baseSite?: string;
  currency?: string;
  language?: string;
  urlParameters?: string;
  useMetaTags?: boolean;
  featureLevel?: string;
  overwriteAppComponent?: boolean;
  pwa?: boolean;
  ssr?: boolean;
}

/**
 * Creates a new generic component definition in the given or default project.
 */
export interface AngularComponentSchema {
  /**
   * The change detection strategy to use in the new component.
   */
  changeDetection?: ChangeDetection;
  /**
   * When true, the declaring NgModule exports this component.
   */
  export: boolean;
  /**
   * When true, creates the new files at the top level of the current project.
   */
  flat: boolean;
  /**
   * When true, includes styles inline in the component.ts file. Only CSS styles can be
   * included inline. By default, an external styles file is created and referenced in the
   * component.ts file.
   */
  inlineStyle: boolean;
  /**
   * When true, includes template inline in the component.ts file. By default, an external
   * template file is created and referenced in the component.ts file.
   */
  inlineTemplate: boolean;
  /**
   * When true, applies lint fixes after generating the component.
   */
  lintFix: boolean;
  /**
   * The name of the component.
   */
  name: string;
  /**
   * The prefix to apply to the generated component selector.
   */
  prefix?: string;
  /**
   * The name of the project.
   */
  project: string;
  /**
   * The HTML selector to use for this component.
   */
  selector?: string;
  /**
   * Specifies if the component should have a selector or not.
   */
  skipSelector?: boolean;
  /**
   * Adds a developer-defined type to the filename, in the format "name.type.ts".
   */
  type: string;
  /**
   * When true, does not create "spec.ts" test files for the new component.
   */
  skipTests?: boolean;
  /**
   * The file extension or preprocessor to use for style files.
   */
  style?: Style;
  /**
   * The view encapsulation strategy to use in the new component.
   */
  viewEncapsulation?: ViewEncapsulation;
}
/**
 * The change detection strategy to use in the new component.
 */
export declare enum ChangeDetection {
  Default = 'Default',
  OnPush = 'OnPush',
}
/**
 * The file extension or preprocessor to use for style files.
 */
export declare enum Style {
  Css = 'css',
  Less = 'less',
  Sass = 'sass',
  Scss = 'scss',
  Styl = 'styl',
}
/**
 * The view encapsulation strategy to use in the new component.
 */
export declare enum ViewEncapsulation {
  Emulated = 'Emulated',
  Native = 'Native',
  None = 'None',
  ShadowDom = 'ShadowDom',
}

export interface AngularModuleSchema {
  /**
   * When true, the new NgModule imports "CommonModule".
   */
  commonModule?: boolean;
  /**
   * When true, creates the new files at the top level of the current project root.
   */
  flat: boolean;
  /**
   * When true, applies lint fixes after generating the module.
   */
  lintFix: boolean;
  /**
   * The declaring NgModule.
   */
  module?: string;
  /**
   * The name of the NgModule.
   */
  name: string;
  /**
   * The path at which to create the NgModule, relative to the workspace root.
   */
  path?: string;
  /**
   * The name of the project.
   */
  project: string;
  /**
   * The route path for a lazy-loaded module. When supplied, creates a component in the new
   * module, and adds the route to that component in the `Routes` array declared in the module
   * provided in the `--module` option.
   */
  route?: string;
  /**
   * When true, creates a routing module.
   */
  routing?: boolean;
  /**
   * The scope for the new routing module.
   */
  routingScope?: RoutingScope;
}

/**
 * The scope for the new routing module.
 */
export declare enum RoutingScope {
  Child = 'Child',
  Root = 'Root',
}
