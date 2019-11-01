import { strings } from '@angular-devkit/core';
import {
  chain,
  externalSchematic,
  noop,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import {
  findModuleFromOptions,
  getProjectFromWorkspace,
} from '@angular/cdk/schematics';
import { insertImport } from '@schematics/angular/utility/ast-utils';
import { Change } from '@schematics/angular/utility/change';
import { ANGULAR_SCHEMATICS, SPARTACUS_CORE } from '../shared/constants';
import {
  commitChanges,
  getPathResultsForFile,
  getTsSourceFile,
  InsertDirection,
} from '../shared/utils/file-utils';
import { importModule } from '../shared/utils/module-file-utils';
import { getWorkspace } from '../shared/utils/workspace-utils';
import { ComponentSchema } from './schema';

const DELETE_ME = true;

function buildModuleName(options: ComponentSchema): string {
  const specifiedModule = options.module || '';
  return options.createModule ? options.name : specifiedModule;
}

function test(options: ComponentSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (DELETE_ME) {
      const moduleName = buildModuleName(options);
      const modulePath = findModuleFromOptions(tree, { name: moduleName });
      if (DELETE_ME) {
        console.log(
          `*** module '${moduleName}' on the path '${modulePath}' ***`
        );
      }
      if (!modulePath) {
        context.logger.error(`Could not find the ${modulePath}`);
        return;
      }

      const buffer = tree.read(modulePath);
      if (!buffer) {
        if (DELETE_ME) {
          console.log('no buffer for the file');
        }
        return;
      }

      const content = buffer.toString();
      if (DELETE_ME) {
        console.log('content', content);
      }
    }
  };
}

function updateModule(options: ComponentSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const moduleName = buildModuleName(options);
    const modulePath = findModuleFromOptions(tree, { name: moduleName });
    if (!modulePath) {
      context.logger.error(`Could not find the ${modulePath}`);
      return;
    }

    const changes: Change[] = [];

    const moduleTs = getTsSourceFile(tree, modulePath);
    const insertImportChange = insertImport(
      moduleTs,
      modulePath,
      'ConfigModule, CmsConfig',
      SPARTACUS_CORE,
      false
    );
    changes.push(insertImportChange);

    // TODO:#12 - if createModule option is false, then try to add the component to the CMS config
    const componentName = `${strings.classify(options.name)}${options.type}`;
    const insertModuleChanges = importModule(
      tree,
      modulePath,
      `ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ${componentName}: {
          component: ${componentName},
        },
      },
    }),`
    );
    changes.push(...insertModuleChanges);

    commitChanges(tree, modulePath, changes, InsertDirection.RIGHT);
  };
}

function updateComponent(options: ComponentSchema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const componentFileName = `${strings.camelize(options.name)}.component.ts`;

    const possibleProjectFiles = ['/angular.json', '/.angular.json'];
    const { workspace } = getWorkspace(tree, possibleProjectFiles);
    const project = getProjectFromWorkspace(workspace, options.project);

    const componentPath = getPathResultsForFile(
      tree,
      componentFileName,
      project.sourceRoot
    )[0];

    if (DELETE_ME) {
      console.log('*** options, keep an eye to path ***', options);
      console.log('*** looking for a component ***', componentFileName);
      console.log('*** component path ***', componentPath);
    }
  };
}

function validateArguments(options: ComponentSchema): void {
  if (!options.createModule && !Boolean(options.module)) {
    throw new SchematicsException(
      'You have to either specify a path to an existing module or set "createModule" to true.'
    );
  }
}

export function addComponent(options: ComponentSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    validateArguments(options);

    const componentName = options.name;
    const createModule = options.createModule;
    const moduleName = buildModuleName(options);
    const entryComponent = options.entryComponent;
    const exportOption = options.export;
    const project = options.project;
    const selector = options.selector;
    const skipSelector = options.skipSelector;
    const flat = options.flat;
    const skipTests = options.skipTests;
    const type = options.type;

    return chain([
      createModule
        ? externalSchematic(ANGULAR_SCHEMATICS, 'module', {
            project,
            name: moduleName,
          })
        : noop(),
      externalSchematic(ANGULAR_SCHEMATICS, 'component', {
        project,
        name: componentName,
        entryComponent,
        module: moduleName,
        export: exportOption,
        selector,
        skipSelector,
        flat,
        skipTests,
        type,
      }),
      updateModule(options),
      updateComponent(options),
      test(options),
    ])(tree, context);
  };
}
