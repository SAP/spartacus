"use strict";
/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const architect_1 = require("@angular-devkit/architect");
const fs_1 = require("fs");
const glob_1 = require("glob");
const path = require("path");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
exports.default = (0, architect_1.createBuilder)(declarationMergingBuilder);
/**
 * Builder that runs default ng-packagr builder ('@angular-devkit/build-angular:ng-packagr')
 * and performs additional post step to fix paths in declaration merges.
 *
 * It's a workaround to fix paths in declaration merges, reference issues:
 *   - https://github.com/ng-packagr/ng-packagr/issues/3085
 */
function declarationMergingBuilder(options, context) {
    return (0, rxjs_1.from)(ngPackagrBuild(context, options)).pipe((0, operators_1.switchMap)((result) => result.success
        ? (0, rxjs_1.from)(declarationMergingPostStep(context, options))
        : (0, rxjs_1.of)(result)));
}
/**
 * Run ng packager build step as is
 */
function ngPackagrBuild(context, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const builderRun = yield context.scheduleBuilder('@angular-devkit/build-angular:ng-packagr', options, { target: context.target });
        return yield builderRun.result;
    });
}
/**
 * Post build step
 */
function declarationMergingPostStep(context, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const outputPath = yield getNgPackgrLibOutputPath(options.project);
        // Run corruption repair before AND after declaration-merge propagation,
        // because some ng-packagr corruptions survive into the post-step output.
        yield repairNgPackagrCorruptions(outputPath, context.logger);
        yield propagateDeclarationMerging(outputPath, context.logger);
        yield repairNgPackagrCorruptions(outputPath, context.logger);
        return { success: true };
    });
}
/**
 * Get output directory for ng packager job
 * @param ngPackagerFile
 */
function getNgPackgrLibOutputPath(ngPackagerFile) {
    return __awaiter(this, void 0, void 0, function* () {
        const ngPackageData = JSON.parse(yield fs_1.promises.readFile(ngPackagerFile, 'utf8'));
        return path.join(path.dirname(ngPackagerFile), ngPackageData.dest);
    });
}
/**
 * Repairs known corruptions introduced by ng-packagr's greedy declaration-merge bundling.
 *
 * ng-packagr bug (https://github.com/ng-packagr/ng-packagr/issues/3085):
 * When bundling `.d.ts` files, ng-packagr replaces `declare module "some/path" { body }`
 * augmentation blocks using a greedy match. When multiple such blocks (or a block adjacent
 * to other code) appear in the bundled output, the greedy match consumes surrounding code
 * and replaces it with `"./spartacus-core"`, corrupting the surrounding declarations.
 *
 * This function applies targeted string repairs derived from the source TypeScript files.
 */
function repairNgPackagrCorruptions(libPath, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        // Only the main bundle file is affected
        const bundleFile = path.join(libPath, 'types/spartacus-core.d.ts');
        let source;
        try {
            source = yield fs_1.promises.readFile(bundleFile, 'utf8');
        }
        catch (_) {
            return; // file doesn't exist, nothing to repair
        }
        /**
         * Each entry is [corruptedFragment, correctedReplacement].
         * The corruptedFragment is the unique garbled string left by ng-packagr's greedy replace.
         * The correctedReplacement is the correct TypeScript content derived from the source files.
         *
         * These corruptions occur because ng-packagr's rollup bundler greedily replaces
         * `declare module "path" { body }` blocks and sometimes consumes adjacent code.
         */
        // These patterns match the raw ng-packagr output (before propagateDeclarationMerging runs),
        // where ng-packagr's own greedy bundler left `"./spartacus-core"` inline within code lines.
        // The surrounding code was partially consumed by ng-packagr's greedy declaration-block replace.
        const repairs = [
            // GlobalMessageConfig: declare module header was partially consumed by ng-packagr's bundler
            // Raw: 'decla"./spartacus-core" -tokens*/ {'
            [
                'decla"./spartacus-core" -tokens*/ {',
                'declare module "./spartacus-core" {',
            ],
            // ProductScope enum: MULTI_DIMENSIONAL_AVAILABILITY value and adjacent LoadingScopes block consumed
            // Raw: 'MULTI_DIMENSIONAL_AVAILABILITY = "multi_dimensional_avai"./spartacus-core" fig/...*/ {'
            [
                'MULTI_DIMENSIONAL_AVAILABILITY = "multi_dimensional_avai"./spartacus-core" fig/loading-scopes-config*/ {',
                'MULTI_DIMENSIONAL_AVAILABILITY = "multi_dimensional_availability",\n}\ndeclare module "./spartacus-core" {',
            ],
            // AnonymousConsentsConfig: showAnonymousConsents JSDoc body + property was consumed.
            // The '/**' opener is already in the output; only the comment body, closing '*/', and property were consumed.
            // Raw: '       "./spartacus-core" olean;'
            [
                '       "./spartacus-core" olean;',
                '             * Show all anonymous consents on the consent management page.\n             */\n            showAnonymousConsents?: boolean;',
            ],
            // I18nConfig: JSDoc comment for debug logging was consumed mid-word
            // Raw: '         * Logs i18"./spartacus-core" ;'
            [
                '         * Logs i18"./spartacus-core" ;',
                "         * Logs i18next warnings and errors to the console. Don't use in production!",
            ],
            // FeaturesConfig: lazy-loading JSDoc comment consumed mid-word
            // Raw: "         *  - configuration won't change after ap"./spartacus-core" zy loaded modules..."
            [
                '         *  - configuration won\'t change after ap"./spartacus-core" zy loaded modules, it will have to use ConfigurationService.unifiedConfig$',
                "         *  - configuration won't change after applying lazy loaded modules, it will have to use ConfigurationService.unifiedConfig$",
            ],
            // FeatureModuleConfig: dependencies property tail + cmsComponents + closing brace + CmsConfig class opener consumed
            // Raw: '    dependencies?: ((() => Promise<any>)  strin"./spartacus-core"  CmsConfig extends OccConfig {'
            [
                '    dependencies?: ((() => Promise<any>)  strin"./spartacus-core"  CmsConfig extends OccConfig {',
                '    dependencies?: ((() => Promise<any>) | string)[];\n    /**\n     * Cms components covered by this feature\n     */\n    cmsComponents?: string[];\n}\ndeclare abstract class CmsConfig extends OccConfig {',
            ],
            // CmsStructureConfig: JSDoc tail + class declaration consumed
            // Raw: ' * only require the necessary properties. Adapter logic is applied"./spartacus-core" s CmsConfig {'
            [
                ' * only require the necessary properties. Adapter logic is applied"./spartacus-core" s CmsConfig {',
                ' * only require the necessary properties. Adapter logic is applied to make\n */\ndeclare abstract class CmsStructureConfig extends CmsConfig {',
            ],
            // CmsService: refreshComponent JSDoc @param details + method signature + clearComponentState method consumed
            // Raw: '     * @param uids Optional array"./spartacus-core"  void;'
            // ng-packagr consumed everything from '@param uids Optional array...' through the end of clearComponentState.
            [
                '     * @param uids Optional array"./spartacus-core"  void;',
                "     * @param uids Optional array of component uids.\n     * @param pageContext an optional parameter that enables the caller to specify for which context the component should be refreshed.\n     * If not specified, 'current' page context is used.\n     */\n    refreshComponent(uid: string, pageContext?: PageContext): void;\n    /**\n     * Clear the cached component data.\n     * This is useful when components need to be forcefully reloaded,\n     * for example in SmartEdit context when child components need to be refreshed.\n     *\n     * @param uids Optional array of component UIDs to clear. If not provided, clears all cached components.\n     */\n    clearComponentState(uids?: string[]): void;",
            ],
            // HTTP_TIMEOUT_CONFIG: JSDoc tail + constant declaration consumed
            // Raw: ' * Allows for configuring different timeout time pe"./spartacus-core" IG: HttpContextToken<HttpTimeoutConfig | undefined>;'
            // Note: ng-packagr retains the `|` pipe operator in the type union, so `HttpTimeoutConfig | undefined` is correct.
            [
                ' * Allows for configuring different timeout time pe"./spartacus-core" IG: HttpContextToken<HttpTimeoutConfig | undefined>;',
                ' * Allows for configuring different timeout time per platform (in server vs. in browser).\n *\n * When undefined, no timeout will be applied.\n */\ndeclare const HTTP_TIMEOUT_CONFIG: HttpContextToken<HttpTimeoutConfig | undefined>;',
            ],
            // Post-propagation variant (after propagateDeclarationMerging removes double-quoted fragments)
            [
                ' * Allows for configuring different timeout time pe IG: HttpContextToken<HttpTimeoutConfig | undefined>;',
                ' * Allows for configuring different timeout time per platform (in server vs. in browser).\n *\n * When undefined, no timeout will be applied.\n */\ndeclare const HTTP_TIMEOUT_CONFIG: HttpContextToken<HttpTimeoutConfig | undefined>;',
            ],
            // FeatureModuleConfig: dependencies property tail + cmsComponents + CmsConfig class opener consumed
            // Raw (with double-quoted fragment, | retained before strin)
            [
                '    dependencies?: ((() => Promise<any>) | strin"./spartacus-core"  CmsConfig extends OccConfig {',
                '    dependencies?: ((() => Promise<any>) | string)[];\n    /**\n     * Cms components covered by this feature\n     */\n    cmsComponents?: string[];\n}\ndeclare abstract class CmsConfig extends OccConfig {',
            ],
            // Post-propagation variant (double-quoted fragment removed)
            [
                '    dependencies?: ((() => Promise<any>) | strin  CmsConfig extends OccConfig {',
                '    dependencies?: ((() => Promise<any>) | string)[];\n    /**\n     * Cms components covered by this feature\n     */\n    cmsComponents?: string[];\n}\ndeclare abstract class CmsConfig extends OccConfig {',
            ],
            // UsersSelectors export: getPreferencesLoaderState entry consumed mid-word
            // Raw: '    usersG"./spartacus-core" oaderState,'
            [
                '    usersG"./spartacus-core" oaderState,',
                '    usersGroup_selectors_d_getPreferencesLoaderState as getPreferencesLoaderState,',
            ],
        ];
        let fixCount = 0;
        for (const [corrupt, fixed] of repairs) {
            if (source.includes(corrupt)) {
                source = source.replace(corrupt, fixed);
                fixCount++;
                logger.info(`Repaired ng-packagr corruption: ${corrupt.substring(0, 60)}`);
            }
        }
        if (fixCount > 0) {
            yield fs_1.promises.writeFile(bundleFile, source, 'utf8');
            logger.info(`Repaired ${fixCount} ng-packagr corruptions in ${bundleFile}`);
        }
    });
}
/**
 * Propagate declaration merging for every package.json file in the built in library
 */
function propagateDeclarationMerging(libPath, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        // grab all package.json files
        const files = (0, glob_1.globSync)(libPath + '/**/package.json', { nodir: true });
        for (const packageJsonFile of files) {
            try {
                // get typings file from package.json
                const packageData = JSON.parse(yield fs_1.promises.readFile(packageJsonFile, 'utf8'));
                const typingsFile = packageData.typings;
                if (!typingsFile) {
                    continue;
                }
                const packageJsonDir = path.dirname(packageJsonFile);
                const typingsFilePath = path.join(packageJsonDir, typingsFile);
                let typingsFileSource = yield fs_1.promises.readFile(typingsFilePath, 'utf8');
                // find all places where `declare module '../foo/bar'` and list them in an array
                // Use [^'@][^']* instead of .+ to avoid:
                //   - greedy matching across multiple declare module statements on one line
                //   - matching @spartacus scoped module paths (e.g. '@spartacus/core')
                const declarationMergeRegex = /declare module '([^'@][^']*)'/g;
                const declarationMerges = typingsFileSource.match(declarationMergeRegex);
                if (!declarationMerges) {
                    continue;
                }
                logger.info(`Found ${declarationMerges.length} declaration merges`);
                // replace all declare module `../foo/bar` occurrences at once
                const typingsBasename = path.basename(typingsFile, '.d.ts');
                typingsFileSource = typingsFileSource.replace(declarationMergeRegex, `declare module './${typingsBasename}'`);
                for (const declarationMerge of declarationMerges) {
                    logger.info(`Updated declaration merge for ${declarationMerge}, new value: ${typingsBasename}`);
                }
                yield fs_1.promises.writeFile(typingsFilePath, typingsFileSource, 'utf8');
                logger.info('Fixed paths in declaration merges for ' + typingsFilePath);
            }
            catch (e) {
                logger.error('Error when fixing paths in declaration merges for ' + packageJsonFile);
            }
        }
    });
}
//# sourceMappingURL=index.js.map