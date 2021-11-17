import {
  chain,
  Rule,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import {
  ProjectType,
  WorkspaceProject,
  WorkspaceSchema,
  WorkspaceTargets,
} from '@schematics/angular/utility/workspace-models';
import { parse } from 'jsonc-parser';
import { Schema as SpartacusOptions } from '../../add-spartacus/schema';
import {
  SPARTACUS_CONFIGURATION_MODULE,
  SPARTACUS_CORE,
  SPARTACUS_FEATURES_MODULE,
  SPARTACUS_MODULE,
} from '../constants';
import { ensureModuleExists } from './new-module-utils';

const DEFAULT_POSSIBLE_PROJECT_FILES = ['/angular.json', '/.angular.json'];

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

export function getWorkspace(
  host: Tree,
  files = DEFAULT_POSSIBLE_PROJECT_FILES
): { path: string; workspace: WorkspaceSchema } {
  const angularJson = getAngularJsonFile(host, files);
  const path = files.filter((filePath) => host.exists(filePath))[0];

  return {
    path,
    workspace: angularJson,
  };
}

export function getAngularJsonFile(
  tree: Tree,
  possibleProjectFiles = DEFAULT_POSSIBLE_PROJECT_FILES
): WorkspaceSchema {
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
  return parse(angularJsonContent, undefined, { allowTrailingComma: true });
}

export function getProjectFromWorkspace<
  TProjectType extends ProjectType.Application
>(
  tree: Tree,
  options: SpartacusOptions,
  files = DEFAULT_POSSIBLE_PROJECT_FILES
): WorkspaceProject<TProjectType> {
  const { workspace } = getWorkspace(tree, files);

  if (!options.project) {
    throw new SchematicsException('Option "project" is required.');
  }

  const project = workspace.projects[options.project];
  if (!project) {
    throw new SchematicsException(`Project is not defined in this workspace.`);
  }

  if (project.projectType !== 'application') {
    throw new SchematicsException(
      `Spartacus requires a project type of "application".`
    );
  }

  return project as WorkspaceProject<ProjectType.Application>;
}

export function getDefaultProjectNameFromWorkspace(tree: Tree): string {
  const workspace = getWorkspace(tree).workspace;

  return workspace.defaultProject !== undefined
    ? workspace.defaultProject
    : Object.keys(workspace.projects)[0];
}

export function getProjectTargets(project: WorkspaceProject): WorkspaceTargets;
export function getProjectTargets(
  workspaceOrHost: WorkspaceSchema | Tree,
  projectName: string
): WorkspaceTargets;
export function getProjectTargets(
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

/**
 * Build a default project path for generating.
 * @param project The project to build the path for.
 */
export function buildDefaultPath(project: WorkspaceProject): string {
  const root = project.sourceRoot
    ? `/${project.sourceRoot}/`
    : `/${project.root}/src/`;

  const projectDirName =
    project.projectType === ProjectType.Application ? 'app' : 'lib';

  return `${root}${projectDirName}`;
}

export function getProject<
  TProjectType extends ProjectType = ProjectType.Application
>(
  workspaceOrHost: WorkspaceSchema | Tree,
  projectName: string
): WorkspaceProject<TProjectType> {
  const workspace = isWorkspaceSchema(workspaceOrHost)
    ? workspaceOrHost
    : getWorkspace(workspaceOrHost).workspace;

  return workspace.projects[projectName] as WorkspaceProject<TProjectType>;
}

export function isWorkspaceSchema(
  workspace: any
): workspace is WorkspaceSchema {
  return !!(workspace && (workspace as WorkspaceSchema).projects);
}

export function isWorkspaceProject(project: any): project is WorkspaceProject {
  return !!(project && (project as WorkspaceProject).projectType);
}

export function validateSpartacusInstallation(packageJson: any): void {
  if (!packageJson.dependencies.hasOwnProperty(SPARTACUS_CORE)) {
    throw new SchematicsException(
      `Spartacus is not detected. Please first install Spartacus by running: 'ng add @spartacus/schematics'.
    To see more options, please check our documentation.`
    );
  }
}

export function scaffoldStructure(options: SpartacusOptions): Rule {
  return (_tree: Tree) => {
    return chain([
      ensureModuleExists({
        name: SPARTACUS_MODULE,
        path: 'app/spartacus',
        module: 'app',
        project: options.project,
      }),
      ensureModuleExists({
        name: SPARTACUS_FEATURES_MODULE,
        path: 'app/spartacus',
        module: 'spartacus',
        project: options.project,
      }),
      ensureModuleExists({
        name: SPARTACUS_CONFIGURATION_MODULE,
        path: 'app/spartacus',
        module: 'spartacus',
        project: options.project,
      }),
    ]);
  };
}
