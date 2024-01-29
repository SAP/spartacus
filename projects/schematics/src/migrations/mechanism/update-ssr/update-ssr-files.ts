/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  NEW_ZONE_IMPORT,
  NGUNIVERSAL_IMPORT,
  OLD_ZONE_IMPORT,
  SERVER_FILENAME,
  SSR_SETUP_IMPORT,
} from '../../../shared/constants';

export function updateServerFiles(): Rule {
  return chain([modifyServerImports]);
}

function modifyServerImports(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    let updateContent = tree.read(SERVER_FILENAME)?.toString('utf-8') ?? '';
    if (
      updateContent.includes(OLD_ZONE_IMPORT) ||
      updateContent.includes(NGUNIVERSAL_IMPORT)
    ) {
      updateContent = updateContent.includes(OLD_ZONE_IMPORT)
        ? updateContent.replace(OLD_ZONE_IMPORT, NEW_ZONE_IMPORT)
        : updateContent;
      updateContent = updateContent.includes(NGUNIVERSAL_IMPORT)
        ? updateContent.replace(NGUNIVERSAL_IMPORT, SSR_SETUP_IMPORT)
        : updateContent;
      tree.overwrite(SERVER_FILENAME, updateContent);
    }
    return tree;
  };
}
