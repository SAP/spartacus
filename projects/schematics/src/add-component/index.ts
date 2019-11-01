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
import { findModuleFromOptions } from '@angular/cdk/schematics';
import { insertImport } from '@schematics/angular/utility/ast-utils';
import { Change } from '@schematics/angular/utility/change';
import { ANGULAR_SCHEMATICS, SPARTACUS_CORE } from '../shared/constants';
import {
  commitChanges,
  getTsSourceFile,
  InsertDirection,
} from '../shared/utils/file-utils';
import { importModule } from '../shared/utils/module-file-utils';
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
          `*** updating module '${moduleName}' on the path '${modulePath}' ***`
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
    if (DELETE_ME) {
      console.log(
        `*** updating module '${moduleName}' on the path '${modulePath}' ***`
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

    const moduleTs = getTsSourceFile(tree, modulePath);
    const changes: Change[] = [];

    const insertImportChange = insertImport(
      moduleTs,
      modulePath,
      'ConfigModule, CmsConfig',
      SPARTACUS_CORE,
      false
    );
    changes.push(insertImportChange);

    const componentName = strings.classify(options.name);
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

function validateArguments(options: ComponentSchema): void {
  if (!options.createModule && !Boolean(options.module)) {
    throw new SchematicsException(
      'You have to either specify a path to an existing module or set "createModule" to true.'
    );
  }
}

export function addComponent(options: ComponentSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (DELETE_ME) {
      console.log('*** running schematics v32 ***');
      console.log('*** options ***', options);
    }
    validateArguments(options);

    const componentName = options.name;
    const createModule = options.createModule;
    const moduleName = buildModuleName(options);

    if (DELETE_ME) {
      console.log('*** moduleName ***', moduleName);
    }

    return chain([
      createModule
        ? externalSchematic(ANGULAR_SCHEMATICS, 'module', {
            project: options.project,
            name: moduleName,
          })
        : noop(),
      externalSchematic(ANGULAR_SCHEMATICS, 'component', {
        project: options.project,
        name: componentName,
        entryComponent: true,
        module: moduleName,
      }),
      updateModule(options),
      test(options),
    ])(tree, context);
  };
}
