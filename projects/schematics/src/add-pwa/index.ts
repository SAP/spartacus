import {
  chain,
  ExecutionOptions,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { branch } from '@angular-devkit/schematics/src/tree/static';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
// import { getProjectTargets } from '@schematics/angular/utility/project-targets';
import { getProjectTargets } from '../../../dev-schematics/src/shared/utils/package-utils';
import { of } from 'rxjs';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import { getLineFromTSFile } from '../shared/utils/file-utils';

function removeServiceWorkerSetup(host: Tree, modulePath: string) {
  const buffer = host.read(modulePath);

  if (!buffer) {
    return;
  }

  let fileContent = buffer.toString();

  const serviceWorkerImport = `import { ServiceWorkerModule } from '@angular/service-worker';`;
  const serviceWorkerModuleImport = `ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })`;
  if (
    !fileContent.includes(serviceWorkerModuleImport) ||
    !fileContent.includes(serviceWorkerImport)
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

/**
 * We have to use our custom function because pwa schematics is currently private
 * so it's not possible to reuse it via standard externalSchematics
 */
function privateExternalSchematic<OptionT extends object>(
  collectionName: string,
  schematicName: string,
  options: OptionT,
  executionOptions?: Partial<ExecutionOptions>
): Rule {
  return (input: Tree, context: SchematicContext) => {
    const collection = context.engine.createCollection(collectionName);
    const schematic = collection.createSchematic(schematicName, true);
    return schematic.call(
      options,
      of(branch(input)),
      context,
      executionOptions
    );
  };
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
      privateExternalSchematic('@angular/pwa', 'ng-add', {
        project: options.project,
      }),
      updateAppModule(options),
    ])(tree, context);
  };
}
