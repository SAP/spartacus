import {
  findNodes,
  getSourceNodes,
  insertImport,
} from '@schematics/angular/utility/ast-utils';
import { Change, InsertChange } from '@schematics/angular/utility/change';
import * as ts from 'typescript';

/**
 * Internal reimplementation of isImported from angular schematics..
 * Default one caused "Cannot read property 'kind' of undefined" issue
 */
export function isImported(
  source: ts.SourceFile,
  classifiedName: string,
  importPath: string
): boolean {
  const allNodes = getSourceNodes(source);
  const matchingNodes = allNodes
    .filter(node => node && node.kind === ts.SyntaxKind.ImportDeclaration)
    .filter(
      (imp: ts.ImportDeclaration) =>
        imp.moduleSpecifier.kind === ts.SyntaxKind.StringLiteral
    )
    .filter((imp: ts.ImportDeclaration) => {
      return (imp.moduleSpecifier as ts.StringLiteral).text === importPath;
    })
    .filter((imp: ts.ImportDeclaration) => {
      if (!imp.importClause) {
        return false;
      }
      const nodes = findNodes(
        imp.importClause,
        ts.SyntaxKind.ImportSpecifier
      ).filter(n => n.getText() === classifiedName);

      return nodes.length > 0;
    });

  return matchingNodes.length > 0;
}

function _angularImportsFromNode(
  node: ts.ImportDeclaration,
  _sourceFile: ts.SourceFile
): { [name: string]: string } {
  const ms = node.moduleSpecifier;
  let modulePath: string;
  switch (ms.kind) {
    case ts.SyntaxKind.StringLiteral:
      modulePath = (ms as ts.StringLiteral).text;
      break;
    default:
      return {};
  }

  if (!modulePath.startsWith('@angular/')) {
    return {};
  }

  if (node.importClause) {
    if (node.importClause.name) {
      // This is of the form `import Name from 'path'`. Ignore.
      return {};
    } else if (node.importClause.namedBindings) {
      const nb = node.importClause.namedBindings;
      if (nb.kind === ts.SyntaxKind.NamespaceImport) {
        // This is of the form `import * as name from 'path'`. Return `name.`.
        return {
          [(nb as ts.NamespaceImport).name.text + '.']: modulePath,
        };
      } else {
        // This is of the form `import {a,b,c} from 'path'`
        const namedImports = nb as ts.NamedImports;

        return namedImports.elements
          .map((is: ts.ImportSpecifier) =>
            is.propertyName ? is.propertyName.text : is.name.text
          )
          .reduce((acc: { [name: string]: string }, curr: string) => {
            acc[curr] = modulePath;

            return acc;
          }, {});
      }
    }

    return {};
  } else {
    // This is of the form `import 'path';`. Nothing to do.
    return {};
  }
}

export function getDecoratorMetadata(
  source: ts.SourceFile,
  identifier: string,
  module: string
): ts.Node[] {
  const angularImports: { [name: string]: string } = findNodes(
    source,
    ts.SyntaxKind.ImportDeclaration
  )
    .map((node: ts.ImportDeclaration) => _angularImportsFromNode(node, source))
    .reduce(
      (
        acc: { [name: string]: string },
        current: { [name: string]: string }
      ) => {
        for (const key of Object.keys(current)) {
          acc[key] = current[key];
        }

        return acc;
      },
      {}
    );

  return getSourceNodes(source)
    .filter(node => {
      return (
        node.kind === ts.SyntaxKind.Decorator &&
        (node as ts.Decorator).expression.kind === ts.SyntaxKind.CallExpression
      );
    })
    .map(node => (node as ts.Decorator).expression as ts.CallExpression)
    .filter(expr => {
      if (expr.expression.kind === ts.SyntaxKind.Identifier) {
        const id = expr.expression as ts.Identifier;

        return (
          id.getFullText(source) === identifier &&
          angularImports[id.getFullText(source)] === module
        );
      } else if (
        expr.expression.kind === ts.SyntaxKind.PropertyAccessExpression
      ) {
        // This covers foo.NgModule when importing * as foo.
        const paExpr = expr.expression as ts.PropertyAccessExpression;
        // If the left expression is not an identifier, just give up at that point.
        if (paExpr.expression.kind !== ts.SyntaxKind.Identifier) {
          return false;
        }

        const id = paExpr.name.text;
        const moduleId = (paExpr.expression as ts.Identifier).getText(source);

        return id === identifier && angularImports[moduleId + '.'] === module;
      }

      return false;
    })
    .filter(
      expr =>
        expr.arguments[0] &&
        expr.arguments[0].kind === ts.SyntaxKind.ObjectLiteralExpression
    )
    .map(expr => expr.arguments[0] as ts.ObjectLiteralExpression);
}

export function addSymbolToNgModuleMetadata(
  source: ts.SourceFile,
  ngModulePath: string,
  metadataField: string,
  symbolName: string,
  importPath: string | null = null
): Change[] {
  const nodes = getDecoratorMetadata(source, 'NgModule', '@angular/core');
  let node: any = nodes[0]; // tslint:disable-line:no-any

  // Find the decorator declaration.
  if (!node) {
    return [];
  }

  // Get all the children property assignment of object literals.
  const matchingProperties: ts.ObjectLiteralElement[] = (node as ts.ObjectLiteralExpression).properties
    .filter(prop => prop.kind === ts.SyntaxKind.PropertyAssignment)
    // Filter out every fields that's not "metadataField". Also handles string literals
    // (but not expressions).
    .filter((prop: ts.PropertyAssignment) => {
      const name = prop.name;
      switch (name.kind) {
        case ts.SyntaxKind.Identifier:
          return (name as ts.Identifier).getText(source) === metadataField;
        case ts.SyntaxKind.StringLiteral:
          return (name as ts.StringLiteral).text === metadataField;
      }

      return false;
    });

  // Get the last node of the array literal.
  if (!matchingProperties) {
    return [];
  }
  if (matchingProperties.length === 0) {
    // We haven't found the field in the metadata declaration. Insert a new field.
    const expr = node as ts.ObjectLiteralExpression;
    let pos: number;
    let toIns: string;
    if (expr.properties.length === 0) {
      pos = expr.getEnd() - 1;
      toIns = `  ${metadataField}: [${symbolName}]\n`;
    } else {
      node = expr.properties[expr.properties.length - 1];
      pos = node.getEnd();
      // Get the indentation of the last element, if any.
      const text = node.getFullText(source);
      const matches = text.match(/^\r?\n\s*/);
      if (matches && matches.length > 0) {
        toIns = `,${matches[0]}${metadataField}: [${symbolName}]`;
      } else {
        toIns = `, ${metadataField}: [${symbolName}]`;
      }
    }
    if (importPath !== null) {
      return [
        new InsertChange(ngModulePath, pos, toIns),
        insertImport(
          source,
          ngModulePath,
          symbolName.replace(/\..*$/, ''),
          importPath
        ),
      ];
    } else {
      return [new InsertChange(ngModulePath, pos, toIns)];
    }
  }
  const assignment = matchingProperties[0] as ts.PropertyAssignment;

  // If it's not an array, nothing we can do really.
  if (assignment.initializer.kind !== ts.SyntaxKind.ArrayLiteralExpression) {
    return [];
  }

  const arrLiteral = assignment.initializer as ts.ArrayLiteralExpression;
  if (arrLiteral.elements.length === 0) {
    // Forward the property.
    node = arrLiteral;
  } else {
    node = arrLiteral.elements;
  }

  if (!node) {
    console.error(
      'No app module found. Please add your new class to your component.'
    );

    return [];
  }

  if (Array.isArray(node)) {
    const nodeArray = (node as {}) as Array<ts.Node>;
    const symbolsArray = nodeArray.map(subNode => subNode.getText());
    if (symbolsArray.includes(symbolName)) {
      return [];
    }

    node = node[node.length - 1];
  }

  let toInsert: string;
  let position = node.getEnd();
  if (node.kind === ts.SyntaxKind.ObjectLiteralExpression) {
    // We haven't found the field in the metadata declaration. Insert a new
    // field.
    const expr = node as ts.ObjectLiteralExpression;
    if (expr.properties.length === 0) {
      position = expr.getEnd() - 1;
      toInsert = `  ${symbolName}\n`;
    } else {
      // Get the indentation of the last element, if any.
      const text = node.getFullText(source);
      if (text.match(/^\r?\r?\n/)) {
        toInsert = `,${text.match(/^\r?\n\s*/)[0]}${symbolName}`;
      } else {
        toInsert = `, ${symbolName}`;
      }
    }
  } else if (node.kind === ts.SyntaxKind.ArrayLiteralExpression) {
    // We found the field but it's empty. Insert it just before the `]`.
    position--;
    toInsert = `${symbolName}`;
  } else {
    // Get the indentation of the last element, if any.
    const text = node.getFullText(source);
    if (text.match(/^\r?\n/)) {
      toInsert = `,${text.match(/^\r?\n(\r?)\s*/)[0]}${symbolName}`;
    } else {
      toInsert = `, ${symbolName}`;
    }
  }
  if (importPath !== null) {
    return [
      new InsertChange(ngModulePath, position, toInsert),
      insertImport(
        source,
        ngModulePath,
        symbolName.replace(/\..*$/, ''),
        importPath
      ),
    ];
  }

  return [new InsertChange(ngModulePath, position, toInsert)];
}
