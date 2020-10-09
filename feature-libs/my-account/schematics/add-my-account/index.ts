import { experimental, JsonParseMode, parseJson } from '@angular-devkit/core';
import {
  chain,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  addSymbolToNgModuleMetadata,
  insertImport,
  isImported,
} from '@schematics/angular/utility/ast-utils';
import {
  Change,
  InsertChange,
  RemoveChange,
  ReplaceChange,
} from '@schematics/angular/utility/change';
import { getWorkspace as getWorkspaceAngular } from '@schematics/angular/utility/config';
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import {
  ProjectType,
  WorkspaceProject,
  WorkspaceSchema,
  WorkspaceTargets,
} from '@schematics/angular/utility/workspace-models';
import * as ts from 'typescript';
import { version } from '../../package.json';
import { Schema as MyAccountOptions } from './schema';

export function addSpartacusMyAccount(options: MyAccountOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addPackageJsonDependencies(packageJson),
      updateAppModule(options),
      addStyles(),
      installPackageJsonDependencies(),
    ]);
  };
}

function addPackageJsonDependencies(packageJson: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const spartacusVersion = `^${getSpartacusSchematicsVersion()}`;

    // TODO: create constant
    const spartacusMyAccountDependency: NodeDependency = {
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      // TODO: create constant
      name: `@spartacus/my-account`,
    };
    addPackageJsonDependency(tree, spartacusMyAccountDependency);
    context.logger.info(
      `✅️ Added '${spartacusMyAccountDependency.name}' into ${spartacusMyAccountDependency.type}`
    );

    if (!packageJson.dependencies.hasOwnProperty(`@spartacus/setup`)) {
      // TODO: create constant
      const spartacusSetupDependency: NodeDependency = {
        type: NodeDependencyType.Default,
        version: spartacusVersion,
        // TODO: create constant
        name: `@spartacus/setup`,
      };

      addPackageJsonDependency(tree, spartacusSetupDependency);
      context.logger.info(
        `✅️ Added '${spartacusSetupDependency.name}' into ${spartacusSetupDependency.type}`
      );
    }

    return tree;
  };
}

function validateSpartacusInstallation(packageJson: any): void {
  // TODO: use constants
  if (!packageJson.dependencies.hasOwnProperty(`@spartacus/core`)) {
    throw new SchematicsException(
      `Spartacus is not detected. Please first install Spartacus by running: 'ng add @spartacus/schematics'.
    To see more options, please check our documentation.`
    );
  }
}

function addStyles(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const myAccountScssPath = `${getSourceRoot(
      tree
    )}/styles/lib-my-account.scss`;
    tree.create(myAccountScssPath, `@import "@spartacus/my-account";`);

    const { path, workspace: angularJson } = getWorkspace(tree);
    const defaultProject = getDefaultProjectNameFromWorkspace(tree);

    const architect = angularJson.projects[defaultProject].architect;

    // `build` architect section
    const architectBuild = architect?.build;
    const buildOptions = {
      ...architectBuild?.options,
      styles: [
        ...(architectBuild?.options?.styles
          ? architectBuild?.options?.styles
          : []),
        myAccountScssPath,
      ],
    };

    // `test` architect section
    const architectTest = architect?.test;
    const testOptions = {
      ...architectTest?.options,
      styles: [
        ...(architectTest?.options?.styles
          ? architectTest?.options?.styles
          : []),
        myAccountScssPath,
      ],
    };

    const updatedAngularJson = {
      ...angularJson,
      projects: {
        ...angularJson.projects,
        [defaultProject]: {
          ...angularJson.projects[defaultProject],
          architect: {
            ...architect,
            build: {
              ...architectBuild,
              options: buildOptions,
            },
            test: {
              ...architectTest,
              options: testOptions,
            },
          },
        },
      },
    };
    tree.overwrite(path, JSON.stringify(updatedAngularJson, null, 2));
  };
}

function installPackageJsonDependencies(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    context.logger.log('info', `🔍 Installing packages...`);
    return tree;
  };
}

function readPackageJson(tree: Tree): any {
  const pkgPath = '/package.json';
  const buffer = tree.read(pkgPath);
  if (!buffer) {
    throw new SchematicsException('Could not find package.json');
  }

  return JSON.parse(buffer.toString(UTF_8));
}

function updateAppModule(options: MyAccountOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    const projectTargets = getProjectTargets(host, options.project);

    if (!projectTargets.build) {
      throw new SchematicsException(`Project target "build" not found.`);
    }

    const mainPath = projectTargets.build.options.main;
    const modulePath = getAppModulePath(host, mainPath);
    context.logger.debug(`main module path: ${modulePath}`);
    const moduleSource = getTsSourceFile(host, modulePath);

    const providersChanges = addToMetadata(
      host,
      modulePath,
      `provideDefaultConfig(defaultB2bOccConfig)`,
      'providers',
      moduleSource
    );
    commitChanges(host, modulePath, providersChanges, InsertDirection.RIGHT);

    // TODO: create constants
    addImport(host, modulePath, 'provideDefaultConfig', `@spartacus/core`);
    addImport(host, modulePath, 'defaultB2bOccConfig', `@spartacus/setup`);
    addImport(
      host,
      modulePath,
      'OrganizationModule',
      `@spartacus/my-account/organization`
    );

    addToModuleImportsAndCommitChanges(host, modulePath, `OrganizationModule`);
  };
}

// TODO: use from `@spartacus/schematics`
function getProjectTargets(
  projectOrHost: WorkspaceProject | Tree | WorkspaceSchema,
  projectName = ''
): WorkspaceTargets {
  const project = isWorkspaceProject(projectOrHost)
    ? projectOrHost
    : getProject(projectOrHost, projectName);

  const projectTargets = project.targets || project.architect;
  if (!projectTargets) {
    throw new Error('Project target not found.');
  }

  return projectTargets;
}

// TODO: use from `@spartacus/schematics`
function isWorkspaceProject(project: any): project is WorkspaceProject {
  return !!(project && (project as WorkspaceProject).projectType);
}

// TODO: use from `@spartacus/schematics`
function getProject<TProjectType extends ProjectType = ProjectType.Application>(
  workspaceOrHost: WorkspaceSchema | Tree,
  projectName: string
): WorkspaceProject<TProjectType> {
  const workspace = isWorkspaceSchema(workspaceOrHost)
    ? workspaceOrHost
    : getWorkspaceAngular(workspaceOrHost);

  return workspace.projects[projectName] as WorkspaceProject<TProjectType>;
}

// TODO: use from `@spartacus/schematics`
function isWorkspaceSchema(workspace: any): workspace is WorkspaceSchema {
  return !!(workspace && (workspace as WorkspaceSchema).projects);
}

// TODO: use from `@spartacus/schematics`
const UTF_8 = 'utf-8';
// TODO: use from `@spartacus/schematics`
export function getTsSourceFile(tree: Tree, path: string): ts.SourceFile {
  const buffer = tree.read(path);
  if (!buffer) {
    throw new SchematicsException(`Could not read file (${path}).`);
  }
  const content = buffer.toString(UTF_8);
  const source = ts.createSourceFile(
    path,
    content,
    ts.ScriptTarget.Latest,
    true
  );

  return source;
}

// TODO: use from `@spartacus/schematics`
function addImport(
  host: Tree,
  filePath: string,
  importText: string,
  importPath: string
): void {
  const moduleSource = getTsSourceFile(host, filePath);
  if (!isImported(moduleSource, importText, importPath)) {
    const change = insertImport(moduleSource, filePath, importText, importPath);
    commitChanges(host, filePath, [change], InsertDirection.LEFT);
  }
}

// TODO: use from `@spartacus/schematics`
enum InsertDirection {
  LEFT,
  RIGHT,
}

// TODO: use from `@spartacus/schematics`
function commitChanges(
  host: Tree,
  path: string,
  changes: Change[] | null,
  insertDirection: InsertDirection = InsertDirection.RIGHT
): void {
  if (!changes || changes.length === 0) {
    return;
  }

  const recorder = host.beginUpdate(path);
  changes.forEach((change) => {
    if (change instanceof InsertChange) {
      const pos = change.pos;
      const toAdd = change.toAdd;
      if (insertDirection === InsertDirection.LEFT) {
        recorder.insertLeft(pos, toAdd);
      } else {
        recorder.insertRight(pos, toAdd);
      }
    } else if (change instanceof ReplaceChange) {
      const pos = change['pos'];
      const oldText = change['oldText'];
      const newText = change['newText'];

      recorder.remove(pos, oldText.length);
      if (insertDirection === InsertDirection.LEFT) {
        recorder.insertLeft(pos, newText);
      } else {
        recorder.insertRight(pos, newText);
      }
    } else if (change instanceof RemoveChange) {
      const pos = change['pos'];
      const length = change['toRemove'].length;
      recorder.remove(pos, length);
    }
  });
  host.commitUpdate(recorder);
}

// TODO: use from `@spartacus/schematics`
function addToModuleImportsAndCommitChanges(
  host: Tree,
  modulePath: string,
  importText: string
): void {
  const metadataChanges = addToModuleImports(host, modulePath, importText);
  commitChanges(host, modulePath, metadataChanges, InsertDirection.RIGHT);
}

// TODO: use from `@spartacus/schematics`
function addToModuleImports(
  host: Tree,
  modulePath: string,
  importText: string,
  moduleSource?: ts.SourceFile
): InsertChange[] {
  return addToMetadata(host, modulePath, importText, 'imports', moduleSource);
}
// TODO: use from `@spartacus/schematics`
function addToMetadata(
  host: Tree,
  modulePath: string,
  importText: string,
  metadataType:
    | 'imports'
    | 'declarations'
    | 'entryComponents'
    | 'exports'
    | 'providers',
  moduleSource?: ts.SourceFile
): InsertChange[] {
  moduleSource = moduleSource || getTsSourceFile(host, modulePath);
  return addSymbolToNgModuleMetadata(
    moduleSource,
    modulePath,
    metadataType,
    importText
  ) as InsertChange[];
}

// TODO: use from `@spartacus/schematics`
export function getSpartacusSchematicsVersion(): string {
  return version;
}

// TODO: use from `@spartacus/schematics`
export function getSourceRoot(
  host: Tree,
  options: { project?: string | undefined; path?: string | undefined } = {}
): string {
  const workspace = getWorkspace(host).workspace;

  if (!options.project) {
    options.project = getDefaultProjectNameFromWorkspace(host);
  }

  const sourceRoot = workspace.projects[options.project].sourceRoot;
  if (!sourceRoot) {
    throw new SchematicsException('No default project found');
  }

  return sourceRoot;
}

// TODO: use from `@spartacus/schematics`
const DEFAULT_POSSIBLE_PROJECT_FILES = ['/angular.json', '/.angular.json'];
// TODO: use from `@spartacus/schematics`
export function getWorkspace(
  host: Tree,
  files = DEFAULT_POSSIBLE_PROJECT_FILES
): { path: string; workspace: experimental.workspace.WorkspaceSchema } {
  const angularJson = getAngularJsonFile(host, files);
  const path = files.filter((filePath) => host.exists(filePath))[0];

  return {
    path,
    workspace: angularJson,
  };
}
// TODO: use from `@spartacus/schematics`
function getAngularJsonFile(
  tree: Tree,
  possibleProjectFiles = DEFAULT_POSSIBLE_PROJECT_FILES
): experimental.workspace.WorkspaceSchema {
  const path = possibleProjectFiles.filter((filePath) =>
    tree.exists(filePath)
  )[0];
  if (!path) {
    throw new SchematicsException(`Could not find Angular`);
  }

  const configBuffer = tree.read(path);
  if (configBuffer === null) {
    throw new SchematicsException(`Could not find (${path})`);
  }

  const angularJsonContent = configBuffer.toString();
  return (parseJson(
    angularJsonContent,
    JsonParseMode.Loose
  ) as unknown) as experimental.workspace.WorkspaceSchema;
}

// TODO: use from `@spartacus/schematics`
export function getDefaultProjectNameFromWorkspace(tree: Tree): string {
  const workspace = getWorkspace(tree).workspace;

  return workspace.defaultProject !== undefined
    ? workspace.defaultProject
    : Object.keys(workspace.projects)[0];
}
