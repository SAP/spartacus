"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMiscFeatures = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const dependencies_1 = require("@schematics/angular/utility/dependencies");
const schematics_2 = require("@spartacus/schematics");
function addMiscFeatures(options) {
    return (tree, _context) => {
        const packageJson = schematics_2.readPackageJson(tree);
        schematics_2.validateSpartacusInstallation(packageJson);
        const appModulePath = schematics_2.getAppModule(tree, options.project);
        return schematics_1.chain([
            schematics_2.shouldAddFeature(options.features, schematics_2.CLI_STOREFINDER_FEATURE)
                ? addStorefinderFeature(appModulePath, options)
                : schematics_1.noop(),
            addMiscPackageJsonDependencies(packageJson),
            schematics_2.installPackageJsonDependencies(),
        ]);
    };
}
exports.addMiscFeatures = addMiscFeatures;
function addStorefinderFeature(appModulePath, options) {
    return schematics_2.addLibraryFeature(appModulePath, options, {
        name: schematics_2.STOREFINDER_FEATURE_NAME,
        featureModule: {
            name: schematics_2.STOREFINDER_MODULE,
            importPath: schematics_2.SPARTACUS_STOREFINDER,
        },
        rootModule: {
            name: schematics_2.STOREFINDER_ROOT_MODULE,
            importPath: schematics_2.SPARTACUS_STOREFINDER_ROOT,
        },
        i18n: {
            resources: schematics_2.STOREFINDER_TRANSLATIONS,
            chunks: schematics_2.STOREFINDER_TRANSLATION_CHUNKS_CONFIG,
            importPath: schematics_2.SPARTACUS_STOREFINDER_ASSETS,
        },
        styles: {
            scssFileName: schematics_2.STORE_FINDER_SCSS_FILE_NAME,
            importStyle: schematics_2.SPARTACUS_MISC,
        },
    });
}
function addMiscPackageJsonDependencies(packageJson) {
    const spartacusVersion = `^${schematics_2.getSpartacusSchematicsVersion()}`;
    const dependencies = [
        {
            type: dependencies_1.NodeDependencyType.Default,
            version: spartacusVersion,
            name: schematics_2.SPARTACUS_MISC,
        },
    ];
    return schematics_2.addPackageJsonDependencies(dependencies, packageJson);
}
//# sourceMappingURL=index.js.map