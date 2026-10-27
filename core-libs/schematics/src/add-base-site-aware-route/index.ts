/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicsException } from '@angular-devkit/schematics';
import {
  getServerTsPathForApplicationBuilder,
  isSsrUsed,
  SUPPORTED_APPLICATION_BUILDERS,
} from '../shared/utils/package-utils';
import {
  getDefaultProjectNameFromWorkspace,
  getProjectFromWorkspace,
} from '../shared/utils/workspace-utils';
import { Schema } from './schema';
import { updateServer } from './update-server';

export function addBaseSiteAwareRoute(options: Schema): Rule {
  return (tree) => {
    const projectName =
      options.project ?? getDefaultProjectNameFromWorkspace(tree);
    const project = getProjectFromWorkspace(tree, { project: projectName });
    const builder = project.architect?.build?.builder;
    if (
      typeof builder !== 'string' ||
      !SUPPORTED_APPLICATION_BUILDERS.includes(builder)
    ) {
      throw new SchematicsException(
        `SSR configuration for project "${projectName}" uses an unsupported builder.`
      );
    }
    const serverPath = getServerTsPathForApplicationBuilder(tree, projectName);
    if (!isSsrUsed(tree, projectName) || !serverPath) {
      throw new SchematicsException(
        `SSR is not enabled for project "${projectName}". Configure Spartacus SSR before running add-base-site-aware-route.`
      );
    }
    return updateServer({ project: projectName, serverPath });
  };
}
