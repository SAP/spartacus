import { SsrOptimizationOptions } from './ssr-optimization-options';

/**
 * Helper functions that maps optimization options to primitive values.
 * This is useful for logging and monitoring purposes.
 *
 * @param value optimization options that should be logged
 * @returns resolved options containing only primitive values that are easier to read by developers and monitoring tools
 */
export const ssrOptimizationOptionsResolver = (
  value: SsrOptimizationOptions
) => {
  const newValue: Record<string, any> = { ...value };
  Object.keys(value).forEach((key) => {
    if (typeof newValue[key] === 'object') {
      newValue[key] = newValue[key].constructor?.name;
    }
    if (typeof newValue[key] === 'function') {
      newValue[key] = newValue[key].toString();
    }
  });
  return newValue;
};
