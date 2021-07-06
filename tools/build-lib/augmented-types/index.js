"use strict";
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
const globModule = require("glob");
const path = require("path");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const util_1 = require("util");
const glob = util_1.promisify(globModule);
const DELIMITER_START = '/** AUGMENTABLE_TYPES_START */';
const DELIMITER_END = '/** AUGMENTABLE_TYPES_END */';
exports.default = architect_1.createBuilder(augmentedTypesBuilder);
/**
 * Builder that runs default ng-packagr builder ('@angular-devkit/build-angular:ng-packagr')
 * and performs additional post step to move augmentable types to root d.ts file.
 *
 * It's a workaround to make TS types augmentable, reference issues:
 *   - https://github.com/microsoft/TypeScript/issues/9532
 *   - https://github.com/microsoft/TypeScript/issues/18877
 */
function augmentedTypesBuilder(options, context) {
    return rxjs_1.from(ngPackagrBuild(context, options)).pipe(operators_1.switchMap((result) => result.success
        ? rxjs_1.from(augmentableTypesPostStep(context, options))
        : rxjs_1.of(result)));
}
/**
 * Run ng packager build step as is
 */
function ngPackagrBuild(context, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const builderRun = yield context.scheduleBuilder('@angular-devkit/build-angular:ng-packagr', options);
        return yield builderRun.result;
    });
}
/**
 * Post build step
 */
function augmentableTypesPostStep(context, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const outputPath = yield getNgPackgrLibOutputPath(options.project);
        yield propagateAugmentableTypes(outputPath, context.logger);
        return { success: true };
    });
}
/**
 * Get output directory for ng packager job
 * @param ngPackagerFile
 */
function getNgPackgrLibOutputPath(ngPackagerFile) {
    return __awaiter(this, void 0, void 0, function* () {
        let ngPackageData = JSON.parse(yield fs_1.promises.readFile(ngPackagerFile, 'utf8'));
        return path.join(path.dirname(ngPackagerFile), ngPackageData.dest);
    });
}
/**
 * Propagate augmentable types for every package.json file in the built in library
 */
function propagateAugmentableTypes(libPath, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        // grab all package.json files
        const files = yield glob(libPath + '/**/package.json');
        for (const packageJsonFile of files) {
            try {
                // get typings file from package.json
                let packageData = JSON.parse(yield fs_1.promises.readFile(packageJsonFile, 'utf8'));
                const typingsFile = packageData.typings;
                if (!typingsFile) {
                    continue;
                }
                const packageJsonDir = path.dirname(packageJsonFile);
                const typingsFilePath = path.join(packageJsonDir, typingsFile);
                let typingsFileSource = yield fs_1.promises.readFile(typingsFilePath, 'utf8');
                // look for export from public api file
                const regex = /export \* from '(.+)\'/;
                const publicApiFile = typingsFileSource.match(regex)[1];
                const apiFilePath = path.join(packageJsonDir, publicApiFile + '.d.ts');
                let publicApiFileSource = yield fs_1.promises.readFile(apiFilePath, 'utf8');
                // find augmentable types delimiter in public api file
                const augTypesStart = publicApiFileSource.indexOf(DELIMITER_START);
                if (augTypesStart === -1) {
                    continue;
                }
                const augTypesEnd = publicApiFileSource.indexOf(DELIMITER_END) + DELIMITER_END.length + 1;
                // extract augmentable types block
                const augTypes = publicApiFileSource.substr(augTypesStart, augTypesEnd - augTypesStart);
                // remove augmentable types block from public api file
                publicApiFileSource =
                    publicApiFileSource.substr(0, augTypesStart) +
                        publicApiFileSource.substr(augTypesEnd);
                // incorporate augmentable types block into typings file
                const firstExportPos = typingsFileSource.indexOf('export *');
                typingsFileSource =
                    typingsFileSource.substr(0, firstExportPos) +
                        augTypes +
                        typingsFileSource.substr(firstExportPos);
                // write results
                yield fs_1.promises.writeFile(apiFilePath, publicApiFileSource, 'utf8');
                yield fs_1.promises.writeFile(typingsFilePath, typingsFileSource, 'utf8');
                logger.info('Propagated types from ' + apiFilePath + ' to ' + typingsFilePath);
            }
            catch (e) {
                logger.error('Error when propagating augmentable types for ' + packageJsonFile);
            }
        }
    });
}
//# sourceMappingURL=index.js.map