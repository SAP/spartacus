import { ContextParameter, SiteContextConfig } from './site-context-config';

/**
 * Helper function for safely getting context parameter config
 *
 * @param config
 * @param parameter
 */
export function getContextParameter(
  config: SiteContextConfig,
  parameter: string
): ContextParameter {
  return (
    (config.context &&
      config.context.parameters &&
      config.context.parameters[parameter]) ||
    {}
  );
}

/**
 * Helper function for calculating default value for context parameter from config
 *
 * @param config
 * @param parameter
 */
export function getContextParameterDefault(
  config: SiteContextConfig,
  parameter: string
): string {
  const param = getContextParameter(config, parameter);
  if (param.default !== undefined) {
    return param.default;
  }
  return param.values && param.values.length ? param.values[0] : undefined;
}
