import { SchematicsException, Tree } from '@angular-devkit/schematics';
import {
  Change,
  InsertChange,
  RemoveChange,
  ReplaceChange,
} from '@schematics/angular/utility/change';
import * as ts from 'typescript';
import { UTF_8 } from '../constants';

export enum InsertDirection {
  LEFT,
  RIGHT,
}

export function getTsSourceFile(tree: Tree, path: string): ts.SourceFile {
  const buffer = tree.read(path);
  if (!buffer) {
    throw new SchematicsException(`Could not read file (${path}).`);
  }
  const content = buffer.toString(UTF_8);
  return ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true);
}

export function commitChanges(
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
