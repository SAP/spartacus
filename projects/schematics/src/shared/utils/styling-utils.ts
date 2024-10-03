/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { WorkspaceProject } from '@schematics/angular/utility/workspace-models';
import * as path from 'path';

export function getStylesConfigFilePath(sourceRoot: string): string {
  const styleConfigFilePath = path.join(sourceRoot, 'styles-config.scss');
  return styleConfigFilePath;
}

export function getRelativeStyleConfigImportPath(
  project: WorkspaceProject,
  destFilePath: string
) {
  const styleConfigFilePath = getStylesConfigFilePath(project.sourceRoot);
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
