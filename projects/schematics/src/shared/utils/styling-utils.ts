import { WorkspaceProject } from '@schematics/angular/utility/workspace-models';
import * as path from 'path';
import { getProjectTargets } from './workspace-utils';

export function getStylesConfigFilePath(project: WorkspaceProject): string {
  const styleConfigFilePath = path.join(
    project.sourceRoot,
    'styles-config.scss'
  );
  return styleConfigFilePath;
}

export function getMainStyleFilePath(project: WorkspaceProject): string {
  const rootStyles = getProjectTargets(project)?.build?.options?.styles?.[0];
  const styleFilePath =
    typeof rootStyles === 'object'
      ? ((rootStyles as any)?.input as string)
      : rootStyles;
  if (!styleFilePath) {
    throw new Error(
      `Could not find main styling file from the project's angular configuration.`
    );
  }
  return styleFilePath;
}

export function getRelativeStyleConfigImportPath(
  project: WorkspaceProject,
  destFilePath: string
) {
  const styleConfigFilePath = getStylesConfigFilePath(project);
  const styleConfigFileRelativePath = path.relative(
    path.parse(destFilePath).dir,
    styleConfigFilePath
  );
  const styleConfigRelativeImportPath = path.join(
    path.parse(styleConfigFileRelativePath).dir,
    path.parse(styleConfigFileRelativePath).name
  );
  return styleConfigRelativeImportPath;
}
