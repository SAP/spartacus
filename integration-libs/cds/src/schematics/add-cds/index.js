"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCdsFeature = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const schematics_2 = require("@spartacus/schematics");
const package_json_1 = require("../../../package.json");
const constants_1 = require("../constants");
function addCdsFeature(options) {
    return (tree, _context) => {
        const packageJson = schematics_2.readPackageJson(tree);
        schematics_2.validateSpartacusInstallation(packageJson);
        validateCdsOptions(options);
        return schematics_1.chain([
            addCds(options),
            addCdsPackageJsonDependencies(packageJson),
            schematics_2.installPackageJsonDependencies(),
        ]);
    };
}
exports.addCdsFeature = addCdsFeature;
function validateCdsOptions({ tenant, baseUrl }) {
    if (!tenant) {
        throw new schematics_1.SchematicsException(`Please specify tenant name.`);
    }
    if (!baseUrl) {
        throw new schematics_1.SchematicsException(`Please specify the base URL.`);
    }
}
function addCdsPackageJsonDependencies(packageJson) {
    const dependencies = schematics_2.createDependencies(package_json_1.peerDependencies);
    return schematics_2.addPackageJsonDependencies(dependencies, packageJson);
}
function addCds(options) {
    const customConfig = [
        {
            import: [
                {
                    moduleSpecifier: schematics_2.SPARTACUS_CDS,
                    namedImports: [schematics_2.CDS_CONFIG],
                },
            ],
            content: `<${schematics_2.CDS_CONFIG}>{
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
                    moduleSpecifier: schematics_2.SPARTACUS_CDS,
                    namedImports: [schematics_2.CDS_CONFIG],
                },
            ],
            content: `<${schematics_2.CDS_CONFIG}>{
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
    return schematics_2.addLibraryFeature(Object.assign(Object.assign({}, options), { lazy: false }), {
        folderName: constants_1.CDS_FOLDER_NAME,
        name: constants_1.CLI_CDS_FEATURE,
        featureModule: {
            importPath: schematics_2.SPARTACUS_CDS,
            name: constants_1.CDS_MODULE,
            content: `${constants_1.CDS_MODULE}.forRoot()`,
        },
        customConfig,
    });
}
//# sourceMappingURL=index.js.map