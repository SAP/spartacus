/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { NgPackagrBuilderOptions } from '@angular-devkit/build-angular';
import { JsonObject, logging } from '@angular-devkit/core';
import { promises as fs } from 'fs';
import { globSync } from 'glob';
import * as path from 'path';
import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export default createBuilder(declarationMergingBuilder);

/**
 * Builder that runs default ng-packagr builder ('@angular-devkit/build-angular:ng-packagr')
 * and performs additional post step to fix paths in declaration merges.
 *
 * It's a workaround to fix paths in declaration merges, reference issues:
 *   - https://github.com/ng-packagr/ng-packagr/issues/3085
 */
function declarationMergingBuilder(
  options: NgPackagrBuilderOptions & JsonObject,
  context: BuilderContext
): Observable<BuilderOutput> {
  return from(ngPackagrBuild(context, options)).pipe(
    switchMap((result) =>
      result.success
        ? from(
            declarationMergingPostStep(
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
    options,
    { target: context.target }
  );
  return await builderRun.result;
}

/**
 * Post build step
 */
async function declarationMergingPostStep(
  context: BuilderContext,
  options: NgPackagrBuilderOptions
): Promise<BuilderOutput> {
  const outputPath = await getNgPackgrLibOutputPath(options.project);
  await propagateDeclarationMerging(outputPath, context.logger);
  return { success: true };
}

/**
 * Get output directory for ng packager job
 * @param ngPackagerFile
 */
async function getNgPackgrLibOutputPath(ngPackagerFile: string) {
  const ngPackageData = JSON.parse(await fs.readFile(ngPackagerFile, 'utf8'));
  return path.join(path.dirname(ngPackagerFile), ngPackageData.dest);
}

/**
 * Propagate declaration merging for every package.json file in the built in library
 */
async function propagateDeclarationMerging(
  libPath: string,
  logger: logging.LoggerApi
) {
  // grab all package.json files
  const files = globSync(libPath + '/**/package.json', { nodir: true });

  for (const packageJsonFile of files) {
    try {
      // get typings file from package.json
      const packageData = JSON.parse(
        await fs.readFile(packageJsonFile, 'utf8')
      );
      const typingsFile = packageData.typings;

      if (!typingsFile) {
        continue;
      }
      const packageJsonDir = path.dirname(packageJsonFile);
      const typingsFilePath = path.join(packageJsonDir, typingsFile);
      let typingsFileSource = await fs.readFile(typingsFilePath, 'utf8');

      // find all places where `declare module '../foo/bar'` and list them in an array
      const declarationMerges = typingsFileSource.match(
        /declare module \'([^\@spartacus].+)\'/g
      );
      if (!declarationMerges) {
        continue;
      }
      logger.info(`Found ${declarationMerges.length} declaration merges`);
      for (const declarationMerge of declarationMerges) {
        // replace declare module `../foo/bar` with typingsFile without `.d.ts`
        const typingsBasename = path.basename(typingsFile, '.d.ts');
        typingsFileSource = typingsFileSource.replace(
          declarationMerge,
          `declare module './${typingsBasename}'`
        );
        logger.info(
          `Updated declaration merge for ${declarationMerge}, new value: ${typingsBasename}`
        );
      }

      await fs.writeFile(typingsFilePath, typingsFileSource, 'utf8');

      logger.info('Fixed paths in declaration merges for ' + typingsFilePath);
    } catch (e) {
      logger.error(
        'Error when fixing paths in declaration merges for ' + packageJsonFile
      );
    }
  }
}
