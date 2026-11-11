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
const DELIMITER_START = '/** AUGMENTABLE_TYPES_START */';
const DELIMITER_END = '/** AUGMENTABLE_TYPES_END */';
exports.default = (0, architect_1.createBuilder)(augmentedTypesBuilder);
/**
 * Builder that runs default ng-packagr builder ('@angular/build:ng-packagr')
 * and performs additional post step to move augmentable types to root d.ts file.
 *
 * It's a workaround to make TS types augmentable, reference issues:
 *   - https://github.com/microsoft/TypeScript/issues/9532
 *   - https://github.com/microsoft/TypeScript/issues/18877
 */
function augmentedTypesBuilder(options, context) {
    return (0, rxjs_1.from)(ngPackagrBuild(context, options)).pipe((0, operators_1.switchMap)((result) => result.success
        ? (0, rxjs_1.from)(augmentableTypesPostStep(context, options))
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
async function augmentableTypesPostStep(context, options) {
    if (!options.project) {
        throw new Error('The library builder requires a project path.');
    }
    const outputPath = await getNgPackgrLibOutputPath(options.project);
    await propagateAugmentableTypes(outputPath, context.logger);
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
 * Propagate augmentable types for every package.json file in the built in library
 */
async function propagateAugmentableTypes(libPath, logger) {
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
            // look for export from public api file
            const regex = /export \* from '(.+)\'/;
            const publicApiFile = typingsFileSource.match(regex)[1];
            const apiFilePath = path.join(packageJsonDir, publicApiFile + '.d.ts');
            let publicApiFileSource = await fs_1.promises.readFile(apiFilePath, 'utf8');
            // find augmentable types delimiter in public api file
            const augTypesStart = publicApiFileSource.indexOf(DELIMITER_START);
            if (augTypesStart === -1) {
                continue;
            }
            const augTypesEnd = publicApiFileSource.indexOf(DELIMITER_END) + DELIMITER_END.length + 1;
            // extract augmentable types block
            const augTypes = publicApiFileSource.substring(augTypesStart, augTypesEnd);
            // remove augmentable types block from public api file
            publicApiFileSource =
                publicApiFileSource.substring(0, augTypesStart) +
                    publicApiFileSource.substring(augTypesEnd);
            // incorporate augmentable types block into typings file
            const firstExportPos = typingsFileSource.indexOf('export *');
            typingsFileSource =
                typingsFileSource.substring(0, firstExportPos) +
                    augTypes +
                    typingsFileSource.substring(firstExportPos);
            // write results
            await fs_1.promises.writeFile(apiFilePath, publicApiFileSource, 'utf8');
            await fs_1.promises.writeFile(typingsFilePath, typingsFileSource, 'utf8');
            logger.info('Propagated types from ' + apiFilePath + ' to ' + typingsFilePath);
        }
        catch (e) {
            logger.error('Error when propagating augmentable types for ' + packageJsonFile);
        }
    }
}
//# sourceMappingURL=index.js.map