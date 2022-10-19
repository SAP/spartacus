import { WorkspaceProject } from '@schematics/angular/utility/workspace-models';
import * as path from 'path';

export function getStylesConfigFilePath(project: WorkspaceProject): string {
  const styleConfigFilePath = path.join(
    project.sourceRoot,
    'styles-config.scss'
  );
  return styleConfigFilePath;
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
