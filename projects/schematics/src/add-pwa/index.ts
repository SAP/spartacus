/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  chain,
  externalSchematic,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import { UTF_8 } from '../shared/constants';
import { getLineFromTSFile } from '../shared/utils/file-utils';
import { getProjectTargets } from '../shared/utils/workspace-utils';

function removeServiceWorkerSetup(host: Tree, modulePath: string): void {
  let fileContent = host.read(modulePath)?.toString(UTF_8);

  const serviceWorkerImport = `import { ServiceWorkerModule } from '@angular/service-worker';`;
  const serviceWorkerModuleImport = `ServiceWorkerModule.register('ngsw-worker.js'`;
  if (
    !fileContent?.includes(serviceWorkerModuleImport) ||
    !fileContent?.includes(serviceWorkerImport)
  ) {
    return;
  }

  const recorder = host.beginUpdate(modulePath);

  recorder.remove(
    ...getLineFromTSFile(
      host,
      modulePath,
      fileContent.indexOf(serviceWorkerImport)
    )
  );

  recorder.remove(
    ...getLineFromTSFile(
      host,
      modulePath,
      fileContent.indexOf(serviceWorkerModuleImport)
    )
  );

  host.commitUpdate(recorder);

  // clean up environment import
  fileContent = (host.read(modulePath) || {}).toString();

  const environmentImport = `import { environment } from '../environments/environment';`;
  if (fileContent.includes(environmentImport)) {
    const importPos =
      fileContent.indexOf(environmentImport) + environmentImport.length;

    // check if it's not needed
    if (
      !fileContent.includes('environment', importPos + environmentImport.length)
    ) {
      const envRecorder = host.beginUpdate(modulePath);
      envRecorder.remove(...getLineFromTSFile(host, modulePath, importPos));
      host.commitUpdate(envRecorder);
    }
  }
}

function updateAppModule(options: any): Rule {
  return (host: Tree) => {
    const projectTargets = getProjectTargets(host, options.project);
    if (!projectTargets.build) {
      throw new SchematicsException(`Project target "build" not found.`);
    }
    const mainPath = projectTargets.build.options.main;
    const modulePath = getAppModulePath(host, mainPath);

    removeServiceWorkerSetup(host, modulePath);

    return host;
  };
}

export function addPWA(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return chain([
      externalSchematic('@angular/pwa', 'pwa', {
        project: options.project,
      }),
      updateAppModule(options),
    ])(tree, context);
  };
}
