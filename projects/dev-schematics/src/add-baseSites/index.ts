import {
  chain,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree
} from '@angular-devkit/schematics';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import {
  B2C_STOREFRONT_MODULE,
  commitChanges,
  getConfig,
  getExistingStorefrontConfigNode,
  getProjectTargets,
  getTsSourceFile,
  mergeConfig
} from '@spartacus/schematics';
import { Schema as SpartacusDevSchematicsOptions } from '../ng-add/schema';

function provideTestBaseSites(options: SpartacusDevSchematicsOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const projectTargets = getProjectTargets(tree, options.project);

    if (!projectTargets.build) {
      throw new SchematicsException(`Project target "build" not found.`);
    }

    const mainPath = projectTargets.build.options.main;
    const appModulePath = getAppModulePath(tree, mainPath);
    const appModule = getTsSourceFile(tree, appModulePath);
    const storefrontConfig = getExistingStorefrontConfigNode(appModule);
    if (!storefrontConfig) {
      context.logger.warn(
        `No ${B2C_STOREFRONT_MODULE} config found in the ${appModulePath}`
      );
      return;
    }

    const currentContextConfig = getConfig(storefrontConfig, 'context');
    if (!currentContextConfig) {
      context.logger.warn(`No 'context' config found in the ${appModulePath}`);
      return;
    }

    const urlParametersConfigChange = mergeConfig(
      appModulePath,
      currentContextConfig,
      'urlParameters',
      ['baseSite', 'language', 'currency']
    );
    const baseSite = mergeConfig(
      appModulePath,
      currentContextConfig,
      'baseSite',
      [
        'electronics-spa',
        'electronics',
        'apparel-de',
        'apparel-uk',
        'apparel-uk-spa',
      ]
    );

    commitChanges(tree, appModulePath, [urlParametersConfigChange, baseSite]);
  };
}

export default function (options: SpartacusDevSchematicsOptions): Rule {
  return (_tree: Tree) => {
    return chain([provideTestBaseSites(options)]);
  };
}
