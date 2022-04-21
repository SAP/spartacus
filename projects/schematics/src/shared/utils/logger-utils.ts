import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

// TODO:#schematics - test
// TODO:#schematics - comment
export function debugLog(message: string, debug?: boolean): Rule {
  return (_tree: Tree, context: SchematicContext) => {
    if (debug) {
      context.logger.info(message);
    }
  };
}

export function formatFeatureStart(feature: string, message: string): string {
  return `⌛️ ${feature}: ${message}`;
}

export function formatFeatureComplete(
  feature: string,
  message: string
): string {
  return `✅ ${feature}: ${message}`;
}
