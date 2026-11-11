"use strict";
/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const architect_1 = require("@angular-devkit/architect");
const fs_1 = require("fs");
const glob_1 = require("glob");
const path = __importStar(require("path"));
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
exports.default = (0, architect_1.createBuilder)(declarationMergingBuilder);
/**
 * Builder that runs default ng-packagr builder ('@angular/build:ng-packagr')
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
async function ngPackagrBuild(context, options) {
    const builderRun = await context.scheduleBuilder('@angular/build:ng-packagr', options, { target: context.target });
    return await builderRun.result;
}
/**
 * Post build step
 */
async function declarationMergingPostStep(context, options) {
    if (!options.project) {
        throw new Error('The library builder requires a project path.');
    }
    const outputPath = await getNgPackgrLibOutputPath(options.project);
    await propagateDeclarationMerging(outputPath, context.logger);
    return { success: true };
}
/**
 * Get output directory for ng packager job
 * @param ngPackagerFile
 */
async function getNgPackgrLibOutputPath(ngPackagerFile) {
    const ngPackageData = JSON.parse(await fs_1.promises.readFile(ngPackagerFile, 'utf8'));
    return path.join(path.dirname(ngPackagerFile), ngPackageData.dest);
}
/**
 * Propagate declaration merging for every package.json file in the built in library
 */
async function propagateDeclarationMerging(libPath, logger) {
    // grab all package.json files
    const files = (0, glob_1.globSync)(libPath + '/**/package.json', { nodir: true });
    for (const packageJsonFile of files) {
        try {
            // get typings file from package.json
            const packageData = JSON.parse(await fs_1.promises.readFile(packageJsonFile, 'utf8'));
            const typingsFile = packageData.typings;
            if (!typingsFile) {
                continue;
            }
            const packageJsonDir = path.dirname(packageJsonFile);
            const typingsFilePath = path.join(packageJsonDir, typingsFile);
            let typingsFileSource = await fs_1.promises.readFile(typingsFilePath, 'utf8');
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
            await fs_1.promises.writeFile(typingsFilePath, typingsFileSource, 'utf8');
            logger.info('Fixed paths in declaration merges for ' + typingsFilePath);
        }
        catch (e) {
            logger.error('Error when fixing paths in declaration merges for ' + packageJsonFile);
        }
    }
}
//# sourceMappingURL=index.js.map