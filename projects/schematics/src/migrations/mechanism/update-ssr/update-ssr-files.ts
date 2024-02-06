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
import { Path } from '@angular-devkit/core';
import {
  SERVER_BAK_FILENAME,
  SERVER_FILENAME,
} from '../../../shared/constants';

export function updateServerFiles(): Rule {
  return chain([removeServer]);
}

function removeServer(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    let serverPath: Path | undefined;
    let serverBakPath: Path | undefined;

    tree.visit((filePath: Path) => {
      const fileName = filePath.replace(/^.*[\\/]/, '');
      if (fileName === SERVER_FILENAME) {
        serverPath = filePath;
      }

      if (fileName === SERVER_BAK_FILENAME) {
        serverBakPath = filePath;
      }
    });

    if (serverPath && serverBakPath) {
      tree.delete(serverPath);
      tree.rename(serverBakPath, serverPath);
    }
    return tree;
  };
}
