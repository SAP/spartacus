import { Tree } from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { WorkspaceProject, WorkspaceSchema, WorkspaceTargets, ProjectType } from '@schematics/angular/utility/workspace-models';

import { SPARTACUS_CORE, UTF_8 } from '@spartacus/schematics';

export function getSpartacusVersion(tree: Tree): string {
  const buffer = tree.read('package.json');
  let spartacusVersion = '';
  if (buffer) {
    const packageJson = JSON.parse(buffer.toString(UTF_8));
    spartacusVersion = packageJson.dependencies[SPARTACUS_CORE];
  }
  return spartacusVersion;
}


export function getProjectTargets(project: WorkspaceProject): WorkspaceTargets;
export function getProjectTargets(
  workspaceOrHost: WorkspaceSchema | Tree,
  projectName: string,
): WorkspaceTargets;
export function getProjectTargets(
  projectOrHost: WorkspaceProject | Tree | WorkspaceSchema,
  projectName = '',
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

  const projectDirName = project.projectType === ProjectType.Application ? 'app' : 'lib';

  return `${root}${projectDirName}`;
}

export function getProject<TProjectType extends ProjectType = ProjectType.Application>(
  workspaceOrHost: WorkspaceSchema | Tree,
  projectName: string,
): WorkspaceProject<TProjectType> {
  const workspace = isWorkspaceSchema(workspaceOrHost)
    ? workspaceOrHost
    : getWorkspace(workspaceOrHost);

  return workspace.projects[projectName] as WorkspaceProject<TProjectType>;
}

// TODO(hans): change this any to unknown when google3 supports TypeScript 3.0.
// tslint:disable-next-line:no-any
export function isWorkspaceSchema(workspace: any): workspace is WorkspaceSchema {
  return !!(workspace && (workspace as WorkspaceSchema).projects);
}

// TODO(hans): change this any to unknown when google3 supports TypeScript 3.0.
// tslint:disable-next-line:no-any
export function isWorkspaceProject(project: any): project is WorkspaceProject {
  return !!(project && (project as WorkspaceProject).projectType);
}