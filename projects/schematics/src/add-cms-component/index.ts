import { basename, strings } from '@angular-devkit/core';
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
  getDecoratorMetadata,
  getSourceNodes,
  insertImport,
  isImported,
} from '@schematics/angular/utility/ast-utils';
import { Change, InsertChange } from '@schematics/angular/utility/change';
import {
  ANGULAR_CORE,
  ANGULAR_SCHEMATICS,
  CMS_COMPONENT_DATA_CLASS,
  CMS_COMPONENT_DATA_PROPERTY_NAME,
  CMS_CONFIG,
  CONFIG_MODULE_CLASS,
  OBSERVABLE_CLASS,
  RXJS,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  UTF_8,
} from '../shared/constants';
import {
  commitChanges,
  defineProperty,
  findConstructor,
  getMetadataProperty,
  getPathResultsForFile,
  getTsSourceFile,
  injectService,
  InsertDirection,
} from '../shared/utils/file-utils';
import {
  addToModuleDeclarations,
  addToModuleExports,
  addToModuleImports,
  buildRelativePath,
  stripTsFromImport,
} from '../shared/utils/module-file-utils';
import { getProjectFromWorkspace } from '../shared/utils/workspace-utils';
import { CxCmsComponentSchema } from './schema';

function buildComponentModule(options: CxCmsComponentSchema): string {
  const moduleName = options.module || '';
  return Boolean(options.declareCmsModule)
    ? options.declareCmsModule
    : moduleName;
}

function buildDeclaringCmsModule(options: CxCmsComponentSchema): string {
  return Boolean(options.declareCmsModule)
    ? options.declareCmsModule
    : options.name;
}

function updateModule(options: CxCmsComponentSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const rawComponentModule = buildDeclaringCmsModule(options);
    const componentModule = `${strings.dasherize(
      rawComponentModule
    )}.module.ts`;
    const modulePath = getPathResultsForFile(tree, componentModule, '/src')[0];
    if (!modulePath) {
      context.logger.error(`Could not find the ${modulePath}`);
      return;
    }

    const changes: Change[] = [];
    const moduleTs = getTsSourceFile(tree, modulePath);

    if (!isImported(moduleTs, CONFIG_MODULE_CLASS, SPARTACUS_CORE)) {
      const insertImportChange = insertImport(
        moduleTs,
        modulePath,
        `${CONFIG_MODULE_CLASS}`,
        SPARTACUS_CORE,
        false
      );
      changes.push(insertImportChange);
    }

    if (!isImported(moduleTs, CMS_CONFIG, SPARTACUS_CORE)) {
      const insertImportChange = insertImport(
        moduleTs,
        modulePath,
        `${CMS_CONFIG}`,
        SPARTACUS_CORE,
        false
      );
      changes.push(insertImportChange);
    }

    const componentName = `${strings.classify(options.name)}${strings.classify(
      options.type
    )}`;

    /*** updating the module's metadata start ***/
    const addToModuleImportsChanges = addToModuleImports(
      tree,
      modulePath,
      `${CONFIG_MODULE_CLASS}.withConfig(<${CMS_CONFIG}>{
      cmsComponents: {
        ${componentName}: {
          component: ${componentName},
        },
      },
    })`,
      moduleTs
    );
    changes.push(...addToModuleImportsChanges);

    const addToModuleDeclarationsChanges = addToModuleDeclarations(
      tree,
      modulePath,
      componentName,
      moduleTs
    );
    changes.push(...addToModuleDeclarationsChanges);

    const addToModuleExportsChanges = addToModuleExports(
      tree,
      modulePath,
      componentName,
      moduleTs
    );
    changes.push(...addToModuleExportsChanges);
    /*** updating the module's metadata end ***/

    const componentImportSkipped = !Boolean(options.declareCmsModule);
    if (componentImportSkipped) {
      const componentFileName = `${strings.dasherize(
        options.name
      )}.${strings.dasherize(options.type)}.ts`;
      const componentPath = getPathResultsForFile(
        tree,
        componentFileName,
        '/src'
      )[0];

      const componentRelativeImportPath = buildRelativePath(
        modulePath,
        componentPath
      );
      const componentImport = insertImport(
        moduleTs,
        modulePath,
        componentName,
        stripTsFromImport(componentRelativeImportPath),
        false
      );
      changes.push(componentImport);
    }

    commitChanges(tree, modulePath, changes, InsertDirection.RIGHT);
    context.logger.info(`Updated ${modulePath}`);
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

    const componentFileName = `${strings.dasherize(
      options.name
    )}.${strings.dasherize(options.type)}.ts`;

    const project = getProjectFromWorkspace(tree, options);
    const componentPath = getPathResultsForFile(
      tree,
      componentFileName,
      project.sourceRoot
    )[0];

    const changes: Change[] = [];

    const componentTs = getTsSourceFile(tree, componentPath);
    const nodes = getSourceNodes(componentTs);
    const constructorNode = findConstructor(nodes);
    const injectionChange = injectService({
      constructorNode,
      path: componentPath,
      serviceName: cmsComponentData,
      modifier: 'private',
      propertyName: CMS_COMPONENT_DATA_PROPERTY_NAME,
    });
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
      stripTsFromImport(options.cmsComponentDataModelPath),
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
      OBSERVABLE_CLASS,
      RXJS,
      false
    );
    changes.push(observableImport);

    commitChanges(tree, componentPath, changes, InsertDirection.LEFT);
  };
}

function updateTemplate(options: CxCmsComponentSchema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const componentFileName = `${strings.dasherize(
      options.name
    )}.${strings.dasherize(options.type)}.ts`;

    const project = getProjectFromWorkspace(tree, options);
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
      const componentTemplateFileName = `${strings.dasherize(
        options.name
      )}.${strings.dasherize(options.type)}.html`;
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
      const insertion = new InsertChange(
        templatePath,
        startIndex,
        `<ng-container *ngIf="${CMS_COMPONENT_DATA_PROPERTY_NAME}$ | async as data">{{data | json}}</ng-container>`
      );

      commitChanges(tree, templatePath, [insertion], InsertDirection.RIGHT);
    }
  };
}

function declareInModule(options: CxCmsComponentSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (!(options.declareCmsModule && options.module)) {
      return;
    }

    const sourceCmsModule = basename(options.declareCmsModule as any);
    const sourceCmsModuleFileName = `${strings.dasherize(
      sourceCmsModule
    )}.module.ts`;
    const sourceCmsModulePath = getPathResultsForFile(
      tree,
      sourceCmsModuleFileName,
      '/src'
    )[0];
    if (!sourceCmsModulePath) {
      context.logger.error(`Could not find the ${sourceCmsModulePath}`);
      return;
    }

    const destinationModuleName = basename(options.module as any);
    const destinationFileName = `${strings.dasherize(
      destinationModuleName
    )}.module.ts`;
    const destinationModulePath = getPathResultsForFile(
      tree,
      destinationFileName,
      '/src'
    )[0];
    if (!destinationModulePath) {
      context.logger.error(`Could not find the ${destinationModulePath}`);
      return;
    }

    const sourceCmsModuleRelativeImportPath = buildRelativePath(
      destinationModulePath,
      sourceCmsModulePath
    );
    const destinationModuleTs = getTsSourceFile(tree, destinationModulePath);
    const sourceCmsModuleClassified = strings.classify(sourceCmsModule);
    const moduleFileImport = insertImport(
      destinationModuleTs,
      destinationModulePath,
      sourceCmsModuleClassified,
      stripTsFromImport(sourceCmsModuleRelativeImportPath),
      false
    );
    const moduleImport = addToModuleImports(
      tree,
      destinationModulePath,
      sourceCmsModuleClassified,
      destinationModuleTs
    );
    const changes: Change[] = [moduleFileImport, ...moduleImport];
    commitChanges(tree, destinationModulePath, changes, InsertDirection.LEFT);
  };
}

function validateArguments(options: CxCmsComponentSchema): void {
  if (options.cmsComponentData && !Boolean(options.cmsComponentDataModel)) {
    throw new SchematicsException(
      'You have to specify the "cmsComponentDataModel" option.'
    );
  }
}

export function addCmsComponent(options: CxCmsComponentSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    validateArguments(options);

    // angular's component CLI flags
    const {
      declareCmsModule,
      export: exportOption,
      name: componentName,
      changeDetection,
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
    } = options;
    const componentModule = buildComponentModule(options);

    // angular's module CLI flags
    const {
      path,
      routing,
      routingScope,
      route,
      commonModule,
      module: declaringModule,
    } = options;

    const createCmsModule = !Boolean(declareCmsModule);
    const skipImport = createCmsModule;

    return chain([
      // we are creating a new module if the declared module is not provided
      createCmsModule
        ? externalSchematic(ANGULAR_SCHEMATICS, 'module', {
            project,
            name: componentName,
            path,
            routing,
            routingScope,
            route,
            commonModule,
            lintFix,
            module: declaringModule,
          })
        : noop(),
      externalSchematic(ANGULAR_SCHEMATICS, 'component', {
        changeDetection,
        export: exportOption,
        flat,
        inlineStyle,
        inlineTemplate,
        lintFix,
        module: componentModule,
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
      !createCmsModule && declaringModule ? declareInModule(options) : noop(),
    ])(tree, context);
  };
}
