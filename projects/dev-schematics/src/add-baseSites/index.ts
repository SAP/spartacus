import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  B2C_STOREFRONT_MODULE,
  commitChanges,
  getConfig,
  getExistingStorefrontConfigNode,
  getTsSourceFile,
  mergeConfig,
} from '@spartacus/schematics';

function provideTestBaseSites(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    // TODO: is there a mechanism (an exposed method maybe) to find the app.module.ts without using the hard-coded path?
    const appModulePath = 'src/app/app.module.ts';
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

export default function (): Rule {
  return (_tree: Tree) => {
    return chain([provideTestBaseSites()]);
  };
}
