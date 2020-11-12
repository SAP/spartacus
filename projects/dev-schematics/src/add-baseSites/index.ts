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
  mergeConfig,
} from '@spartacus/schematics';
import { getSpartacusConfigurationFile } from '../../../schematics/src/shared/utils/config-utils';
import { Schema as SpartacusDevSchematicsOptions } from '../ng-add/schema';

function provideTestBaseSites(options: SpartacusDevSchematicsOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const { configurationFile } = getSpartacusConfigurationFile(
      tree,
      options.project
    );
    const storefrontConfig = getExistingStorefrontConfigNode(configurationFile);
    if (!storefrontConfig) {
      context.logger.warn(
        `No ${B2C_STOREFRONT_MODULE} config found in the ${configurationFile.fileName}`
      );
      return;
    }

    const currentContextConfig = getConfig(storefrontConfig, 'context');
    if (!currentContextConfig) {
      context.logger.warn(
        `No 'context' config found in the ${configurationFile.fileName}`
      );
      return;
    }

    const urlParametersConfigChange = mergeConfig(
      configurationFile.fileName,
      currentContextConfig,
      'urlParameters',
      ['baseSite', 'language', 'currency']
    );
    const baseSite = mergeConfig(
      configurationFile.fileName,
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

    commitChanges(tree, configurationFile.fileName, [
      urlParametersConfigChange,
      baseSite,
    ]);
  };
}

export default function (options: SpartacusDevSchematicsOptions): Rule {
  return (_tree: Tree) => {
    return chain([provideTestBaseSites(options)]);
  };
}
