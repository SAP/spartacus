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
        yield propagateDeclarationMerging(outputPath, context.logger);
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
                const declarationMerges = typingsFileSource.match(/declare module \'([^\@spartacus].+)\'/g);
                if (!declarationMerges) {
                    continue;
                }
                logger.info(`Found ${declarationMerges.length} declaration merges`);
                for (const declarationMerge of declarationMerges) {
                    // replace declare module `../foo/bar` with typingsFile without `.d.ts`
                    const typingsBasename = path.basename(typingsFile, '.d.ts');
                    typingsFileSource = typingsFileSource.replace(declarationMerge, `declare module './${typingsBasename}'`);
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