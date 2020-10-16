import { Tree } from '@angular-devkit/schematics';
import {
  getDecoratorMetadata,
  getMetadataField,
} from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import * as ts from 'typescript';
import {
  ANGULAR_CORE,
  InsertDirection,
  getTsSourceFile,
  commitChanges,
} from '@spartacus/schematics';

export function insertPropertyInStorefrontModuleCallExpression(
  host: Tree,
  modulePath: string,
  insertion: string
): void {
  const appModuleSourceFile = getTsSourceFile(host, modulePath);

  getDecoratorMetadata(appModuleSourceFile, 'NgModule', ANGULAR_CORE).forEach(
    (metadata: ts.ObjectLiteralExpression) => {
      const matchingProperties = getMetadataField(metadata, 'imports');

      if (!matchingProperties) {
        return;
      }

      const assignment = matchingProperties[0] as ts.PropertyAssignment;
      if (!ts.isArrayLiteralExpression(assignment.initializer)) {
        return;
      }
      const arrayLiteral = assignment.initializer;
      const moduleElementImportsAST = arrayLiteral.elements.filter(
        (node) =>
          ts.isCallExpression(node) &&
          node.getFullText().indexOf('B2cStorefrontModule.withConfig') !== -1
      )[0] as ts.CallExpression;

      const storefrontModuleArgumentPropertiesEnd = (moduleElementImportsAST
        .arguments[0] as ts.ObjectLiteralExpression).properties.end;
      const newChange = new InsertChange(
        appModuleSourceFile.fileName,
        storefrontModuleArgumentPropertiesEnd,
        insertion
      );
      commitChanges(
        host,
        appModuleSourceFile.fileName,
        [newChange],
        InsertDirection.LEFT
      );
    }
  );
}
