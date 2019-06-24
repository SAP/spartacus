/**
 * Base abstract configuration class that can be used to create
 * feature configuration classes. Configuration classes in
 * Spartacus inherit from the BaseConfig class.
 *
 * For example:
 *
 * ```
 * export abstract class FeatureConfig {
 *   sampleProperty?: boolean;
 * }
 * ```
 *
 * The feature configuration can be provided to the `ConfigModule`
 * so that the configuration becomes available for applications.
 *
 */
export abstract class BaseConfig {
  /**
   * Indicates whether we should threat the build a production build.
   * While the production build in an Angular application can be driven
   * by an `environment` variable, this does not automatically drill down
   * to Spartacus code.
   *
   * In order to leverage the environment `environment` variable in your application, you
   * can bind this configuration to the environment variable. using the following syntax:
   *
   * ```
   * StorefrontModule.withConfig({
   *   production: environment.production
   * })
   * ```
   */
  production?: boolean;
}

export const defaultBaseConfig: BaseConfig = {
  production: true,
};
