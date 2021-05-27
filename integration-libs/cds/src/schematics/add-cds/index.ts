import {
  chain,
  noop,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import {
  addLibraryFeature,
  addPackageJsonDependenciesForLibrary,
  CDS_CONFIG,
  CLI_CDS_FEATURE,
  CLI_TRACKING_PERSONALIZATION_FEATURE,
  CustomConfig,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_CDS,
  SPARTACUS_TRACKING,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../../package.json';
import { CDS_FOLDER_NAME, CDS_MODULE, CDS_MODULE_NAME } from '../constants';
import { Schema as SpartacusCdsOptions } from './schema';

export function addCdsFeature(options: SpartacusCdsOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      shouldAddFeature(CLI_CDS_FEATURE, options.features)
        ? addCds(options, context)
        : noop(),
    ]);
  };
}

function addCds(options: SpartacusCdsOptions, context: SchematicContext): Rule {
  validateCdsOptions(options, context);

  const customConfig: CustomConfig[] = [
    {
      import: [
        {
          moduleSpecifier: SPARTACUS_CDS,
          namedImports: [CDS_CONFIG],
        },
      ],
      content: `<${CDS_CONFIG}>{
      cds: {
        tenant: '${options.tenant}',
        baseUrl: '${options.baseUrl}',
        endpoints: {
          strategyProducts: '/strategy/\${tenant}/strategies/\${strategyId}/products',
        },
        merchandising: {
          defaultCarouselViewportThreshold: 80,
        },
      },
    }`,
    },
  ];
  if (options.profileTagLoadUrl && options.profileTagConfigUrl) {
    customConfig.push({
      import: [
        {
          moduleSpecifier: SPARTACUS_CDS,
          namedImports: [CDS_CONFIG],
        },
      ],
      content: `<${CDS_CONFIG}>{
          cds: {
            profileTag: {
              javascriptUrl:
                '${options.profileTagLoadUrl}',
              configUrl:
                '${options.profileTagConfigUrl}',
              allowInsecureCookies: true,
            },
          },
        }`,
    });
  }

  return addLibraryFeature(
    { ...options, lazy: false },
    {
      folderName: CDS_FOLDER_NAME,
      moduleName: CDS_MODULE_NAME,
      featureModule: {
        importPath: SPARTACUS_CDS,
        name: CDS_MODULE,
        content: `${CDS_MODULE}.forRoot()`,
      },
      customConfig,
      dependencyManagement: {
        featureName: CLI_CDS_FEATURE,
        featureDependencies: {
          [SPARTACUS_TRACKING]: [CLI_TRACKING_PERSONALIZATION_FEATURE],
        },
      },
    }
  );
}

function validateCdsOptions(
  {
    tenant,
    baseUrl,
    profileTagConfigUrl,
    profileTagLoadUrl,
  }: SpartacusCdsOptions,
  context: SchematicContext
): void {
  if (!tenant) {
    throw new SchematicsException(`Please specify tenant name.`);
  }
  if (!baseUrl) {
    throw new SchematicsException(`Please specify the base URL.`);
  }

  if (
    !(
      (profileTagConfigUrl && profileTagLoadUrl) ||
      (!profileTagConfigUrl && !profileTagLoadUrl)
    )
  ) {
    context.logger.warn(
      `Profile tag will not be added. Please run the schematic again, and make sure you provide both profile tag options.`
    );
  }
}
