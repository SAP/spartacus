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
import {
  getDecoratorMetadata,
  getSourceNodes,
  insertImport,
} from '@schematics/angular/utility/ast-utils';
import { Change, InsertChange } from '@schematics/angular/utility/change';
import {
  ANGULAR_CORE,
  ANGULAR_SCHEMATICS,
  CMS_COMPONENT_DATA_CLASS,
  CMS_COMPONENT_DATA_PROPERTY_NAME,
  OBSERVABLE,
  RXJS,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  UTF_8,
} from '../shared/constants';
import {
  commitChanges,
  defineProperty,
  getMetadataProperty,
  getPathResultsForFile,
  getTsSourceFile,
  injectService,
  InsertDirection,
} from '../shared/utils/file-utils';
import { importModule } from '../shared/utils/module-file-utils';
import { getWorkspace } from '../shared/utils/workspace-utils';
import { CxCmsComponentSchema } from './schema';

export const DELETE_ME = true;

function buildModuleName(options: CxCmsComponentSchema): string {
  const specifiedModule = options.module || '';
  return Boolean(specifiedModule) ? specifiedModule : options.name;
}

function printModule(options: CxCmsComponentSchema, tree: Tree): void {
  const moduleName = buildModuleName(options);
  const modulePath = findModuleFromOptions(tree, { name: moduleName });
  if (!modulePath) {
    console.error(`Could not find the ${modulePath}`);
    return;
  }

  const moduleBuffer = tree.read(modulePath);
  if (moduleBuffer) {
    const moduleContent = moduleBuffer.toString(UTF_8);
    console.log('\n', moduleContent);
  } else {
    console.log('no buffer for the module');
  }
}

function printComponent(options: CxCmsComponentSchema, tree: Tree): void {
  const componentFileName = `${strings.camelize(
    options.name
  )}.${strings.camelize(options.type)}.ts`;
  const possibleProjectFiles = ['/angular.json', '/.angular.json'];
  const { workspace } = getWorkspace(tree, possibleProjectFiles);
  const project = getProjectFromWorkspace(workspace, options.project);

  const componentPath = getPathResultsForFile(
    tree,
    componentFileName,
    project.sourceRoot
  )[0];
  console.log('component path', componentPath);

  const componentBuffer = tree.read(componentPath);
  if (componentBuffer) {
    const componentContent = componentBuffer.toString(UTF_8);
    console.log('\n', componentContent);
  } else {
    console.log('no buffer for the component');
  }
}

function printComponentTemplate(options: CxCmsComponentSchema, tree: Tree) {
  const possibleProjectFiles = ['/angular.json', '/.angular.json'];
  const { workspace } = getWorkspace(tree, possibleProjectFiles);
  const project = getProjectFromWorkspace(workspace, options.project);

  const componentTemplateFileName = `${strings.camelize(
    options.name
  )}.${strings.camelize(options.type)}.html`;
  const templatePath = getPathResultsForFile(
    tree,
    componentTemplateFileName,
    project.sourceRoot
  )[0];
  const componentTemplateBuffer = tree.read(templatePath);
  if (componentTemplateBuffer) {
    const content = componentTemplateBuffer.toString(UTF_8);
    console.log('\n', content);
  } else {
    console.log('no buffer for the template');
  }
}

function print(options: CxCmsComponentSchema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    if (DELETE_ME) {
      printModule(options, tree);
      printComponent(options, tree);
      printComponentTemplate(options, tree);
    }
  };
}

function updateModule(options: CxCmsComponentSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const moduleName = buildModuleName(options);
    if (DELETE_ME) {
      console.log('Using the following name to update module: ', moduleName);
    }
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
      `ConfigModule, CmsConfig`,
      SPARTACUS_CORE,
      false
    );
    changes.push(insertImportChange);

    // TODO:#12 - if `module` option is false, then try to add the component to the CMS config. This is under assumption that ConfigModule.withConfig already exists (if not, add it)
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

function updateComponent(options: CxCmsComponentSchema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    if (!options.cmsComponentData) {
      return;
    }
    if (!options.cmsComponentDataModel) {
      throw new SchematicsException(`"cmsComponentDataModel" can't be falsy`);
    }

    const cmsComponentData = `${CMS_COMPONENT_DATA_CLASS}<${strings.classify(
      options.cmsComponentDataModel
    )}>`;

    const componentFileName = `${strings.camelize(
      options.name
    )}.${strings.camelize(options.type)}.ts`;

    const possibleProjectFiles = ['/angular.json', '/.angular.json'];
    const { workspace } = getWorkspace(tree, possibleProjectFiles);
    const project = getProjectFromWorkspace(workspace, options.project);

    const componentPath = getPathResultsForFile(
      tree,
      componentFileName,
      project.sourceRoot
    )[0];

    const changes: Change[] = [];

    const componentTs = getTsSourceFile(tree, componentPath);
    const nodes = getSourceNodes(componentTs);
    const injectionChange = injectService(
      nodes,
      componentPath,
      cmsComponentData,
      CMS_COMPONENT_DATA_PROPERTY_NAME
    );
    changes.push(injectionChange);

    const componentDataProperty = `  ${CMS_COMPONENT_DATA_PROPERTY_NAME}$: Observable<${strings.classify(
      options.cmsComponentDataModel
    )}> = this.${CMS_COMPONENT_DATA_PROPERTY_NAME}.data$;`;
    const componentDataPropertyChange = defineProperty(
      nodes,
      componentPath,
      componentDataProperty
    );
    changes.push(componentDataPropertyChange);

    const cmsComponentImport = insertImport(
      componentTs,
      componentPath,
      strings.classify(options.cmsComponentDataModel),
      options.cmsComponentDataModelPath,
      false
    );
    changes.push(cmsComponentImport);

    const cmsComponentDataImport = insertImport(
      componentTs,
      componentPath,
      CMS_COMPONENT_DATA_CLASS,
      SPARTACUS_STOREFRONTLIB,
      false
    );
    changes.push(cmsComponentDataImport);

    const observableImport = insertImport(
      componentTs,
      componentPath,
      OBSERVABLE,
      RXJS,
      false
    );
    changes.push(observableImport);

    commitChanges(tree, componentPath, changes, InsertDirection.LEFT);
  };
}

function updateTemplate(options: CxCmsComponentSchema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const componentFileName = `${strings.camelize(
      options.name
    )}.${strings.camelize(options.type)}.ts`;
    const possibleProjectFiles = ['/angular.json', '/.angular.json'];
    const { workspace } = getWorkspace(tree, possibleProjectFiles);
    const project = getProjectFromWorkspace(workspace, options.project);

    const componentPath = getPathResultsForFile(
      tree,
      componentFileName,
      project.sourceRoot
    )[0];
    const componentTs = getTsSourceFile(tree, componentPath);

    let templatePath = '';
    let templateContent = '';
    let startIndex: number;
    if (options.inlineTemplate) {
      templatePath = componentPath;
      const decorator = getDecoratorMetadata(
        componentTs,
        'Component',
        ANGULAR_CORE
      )[0];

      const inlineTemplate = getMetadataProperty(decorator, 'template');
      templateContent = inlineTemplate.getText();
      startIndex = inlineTemplate.name.parent.end - 1;
    } else {
      const componentTemplateFileName = `${strings.camelize(
        options.name
      )}.${strings.camelize(options.type)}.html`;
      templatePath = getPathResultsForFile(
        tree,
        componentTemplateFileName,
        project.sourceRoot
      )[0];
      const buffer = tree.read(templatePath);
      templateContent = buffer ? buffer.toString(UTF_8) : '';
      startIndex = templateContent.length;
    }

    if (Boolean(templateContent)) {
      const insertion =
        `  <ng-container *ngIf="${CMS_COMPONENT_DATA_PROPERTY_NAME}$ | async as data">` +
        `\n      {{data | json}}` +
        `\n    </ng-container>`;

      const templateChange = new InsertChange(
        templatePath,
        startIndex,
        insertion
      );

      commitChanges(
        tree,
        templatePath,
        [templateChange],
        InsertDirection.RIGHT
      );
    }
  };
}

function validateArguments(options: CxCmsComponentSchema): void {
  if (options.cmsComponentData && !Boolean(options.cmsComponentDataModel)) {
    throw new SchematicsException(
      'You have to specify "cmsComponentDataModel".'
    );
  }
}

export function addCmsComponent(options: CxCmsComponentSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    validateArguments(options);

    // angular's component CLI flags
    const moduleName = buildModuleName(options);
    const {
      module: specifiedModule,
      export: exportOption,
      name: componentName,
      changeDetection,
      entryComponent,
      flat,
      inlineStyle,
      inlineTemplate,
      lintFix,
      prefix,
      project,
      selector,
      skipSelector,
      type,
      skipTests,
      style,
      viewEncapsulation,
      skipImport,
    } = options;

    // angular's module CLI flags
    const { path, routing, routingScope, route, commonModule } = options;

    if (DELETE_ME) {
      console.log(`module name: ${moduleName}`);
      console.log(
        `generating specified module '${specifiedModule}': ${!Boolean(
          specifiedModule
        )}`
      );

      console.log(
        'module options: ',
        { project },
        { moduleName },
        { path },
        { routing },
        { routingScope },
        { route },
        { commonModule },
        { lintFix }
      );
    }

    return chain([
      // in case the module flag is not specified, we need to generate a module
      !Boolean(specifiedModule)
        ? externalSchematic(ANGULAR_SCHEMATICS, 'module', {
            project,
            name: moduleName,
            path,
            routing,
            routingScope,
            route,
            commonModule,
            lintFix,
          })
        : noop(),
      externalSchematic(ANGULAR_SCHEMATICS, 'component', {
        changeDetection,
        entryComponent,
        export: exportOption,
        flat,
        inlineStyle,
        inlineTemplate,
        lintFix,
        module: strings.dasherize(moduleName),
        name: componentName,
        prefix,
        project,
        selector,
        skipSelector,
        type,
        skipTests,
        style,
        viewEncapsulation,
        skipImport,
      }),
      updateModule(options),
      updateComponent(options),
      updateTemplate(options),
      DELETE_ME ? print(options) : noop(),
      // DELETE_ME ? noop() : print(options),
    ])(tree, context);
  };
}
