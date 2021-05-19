import {
  chain,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree
} from '@angular-devkit/schematics';
import {
  addLibraryFeature,

  CDS_CONFIG,

  CustomConfig,
  installPackageJsonDependencies,
  readPackageJson,
  SPARTACUS_CDS,
  validateSpartacusInstallation
} from '@spartacus/schematics';
import { CDS_FOLDER_NAME, CDS_MODULE, CLI_CDS_FEATURE } from '../constants';
import { Schema as SpartacusCdsOptions } from './schema';

export function addCdsFeature(options: SpartacusCdsOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);
    validateCdsOptions(options);

    return chain([
      shouldAddFeature(CLI_CDS_FEATURE, options.features)
        ? addCds(options, context)
        : noop(),

      addCdsPackageJsonDependencies(packageJson),
      installPackageJsonDependencies(),
    ]);
  };
}

function addCds(options: SpartacusCdsOptions, context: SchematicContext): Rule {
  validateCdsOptions(options, context);

function addCds(options: SpartacusCdsOptions): Rule {
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
      name: CLI_CDS_FEATURE,
      featureModule: {
        importPath: SPARTACUS_CDS,
        name: CDS_MODULE,
        content: `${CDS_MODULE}.forRoot()`,
      },
      customConfig,
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
