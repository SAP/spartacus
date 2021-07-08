import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { NgPackagrBuilderOptions } from '@angular-devkit/build-angular';
import { JsonObject, logging } from '@angular-devkit/core';
import { promises as fs } from 'fs';
import * as globModule from 'glob';
import * as path from 'path';
import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { promisify } from 'util';
const glob = promisify(globModule);

const DELIMITER_START = '/** AUGMENTABLE_TYPES_START */';
const DELIMITER_END = '/** AUGMENTABLE_TYPES_END */';

export default createBuilder(augmentedTypesBuilder);

/**
 * Builder that runs default ng-packagr builder ('@angular-devkit/build-angular:ng-packagr')
 * and performs additional post step to move augmentable types to root d.ts file.
 *
 * It's a workaround to make TS types augmentable, reference issues:
 *   - https://github.com/microsoft/TypeScript/issues/9532
 *   - https://github.com/microsoft/TypeScript/issues/18877
 */
function augmentedTypesBuilder(
  options: NgPackagrBuilderOptions & JsonObject,
  context: BuilderContext
): Observable<BuilderOutput> {
  return from(ngPackagrBuild(context, options)).pipe(
    switchMap((result) =>
      result.success
        ? from(
            augmentableTypesPostStep(
              context,
              options as NgPackagrBuilderOptions
            )
          )
        : of(result)
    )
  );
}

/**
 * Run ng packager build step as is
 */
async function ngPackagrBuild(
  context: BuilderContext,
  options: NgPackagrBuilderOptions & JsonObject
): Promise<BuilderOutput> {
  const builderRun = await context.scheduleBuilder(
    '@angular-devkit/build-angular:ng-packagr',
    options
  );
  return await builderRun.result;
}

/**
 * Post build step
 */
async function augmentableTypesPostStep(
  context: BuilderContext,
  options: NgPackagrBuilderOptions
): Promise<BuilderOutput> {
  const outputPath = await getNgPackgrLibOutputPath(options.project);
  await propagateAugmentableTypes(outputPath, context.logger);
  return { success: true };
}

/**
 * Get output directory for ng packager job
 * @param ngPackagerFile
 */
async function getNgPackgrLibOutputPath(ngPackagerFile: string) {
  let ngPackageData = JSON.parse(await fs.readFile(ngPackagerFile, 'utf8'));
  return path.join(path.dirname(ngPackagerFile), ngPackageData.dest);
}

/**
 * Propagate augmentable types for every package.json file in the built in library
 */
async function propagateAugmentableTypes(
  libPath: string,
  logger: logging.LoggerApi
) {
  // grab all package.json files
  const files = await glob(libPath + '/**/package.json');

  for (const packageJsonFile of files) {
    try {
      // get typings file from package.json
      let packageData = JSON.parse(await fs.readFile(packageJsonFile, 'utf8'));
      const typingsFile = packageData.typings;

      if (!typingsFile) {
        continue;
      }
      const packageJsonDir = path.dirname(packageJsonFile);
      const typingsFilePath = path.join(packageJsonDir, typingsFile);
      let typingsFileSource = await fs.readFile(typingsFilePath, 'utf8');

      // look for export from public api file
      const regex = /export \* from '(.+)\'/;
      const publicApiFile = typingsFileSource.match(regex)![1];
      const apiFilePath = path.join(packageJsonDir, publicApiFile + '.d.ts');

      let publicApiFileSource = await fs.readFile(apiFilePath, 'utf8');

      // find augmentable types delimiter in public api file
      const augTypesStart = publicApiFileSource.indexOf(DELIMITER_START);

      if (augTypesStart === -1) {
        continue;
      }

      const augTypesEnd =
        publicApiFileSource.indexOf(DELIMITER_END) + DELIMITER_END.length + 1;

      // extract augmentable types block
      const augTypes = publicApiFileSource.substr(
        augTypesStart,
        augTypesEnd - augTypesStart
      );
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
      await fs.writeFile(apiFilePath, publicApiFileSource, 'utf8');
      await fs.writeFile(typingsFilePath, typingsFileSource, 'utf8');

      logger.info(
        'Propagated types from ' + apiFilePath + ' to ' + typingsFilePath
      );
    } catch (e) {
      logger.error(
        'Error when propagating augmentable types for ' + packageJsonFile
      );
    }
  }
}
