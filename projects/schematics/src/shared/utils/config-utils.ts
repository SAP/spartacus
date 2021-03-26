import {
  findNode,
  findNodes,
  getDecoratorMetadata,
  getMetadataField,
} from '@schematics/angular/utility/ast-utils';
import {
  Change,
  InsertChange,
  ReplaceChange,
} from '@schematics/angular/utility/change';
import { Node, SourceFile, ts as tsMorph } from 'ts-morph';
import ts from 'typescript';
import {
  ANGULAR_CORE,
  B2B_STOREFRONT_MODULE,
  B2C_STOREFRONT_MODULE,
  SPARTACUS_CORE,
} from '../constants';
import { isImportedFrom } from './import-utils';
import { getModule } from './new-module-utils';

/**
 * Finds the Storefront config in the given app.module.ts
 *
 * It first tries to find the B2CStorefrontModule; if it fails to find, it tries to find the B2BStorefrontModule
 *
 * @param appModuleSourceFile
 */
export function getExistingStorefrontConfigNode(
  appModuleSourceFile: ts.SourceFile
): ts.CallExpression | undefined {
  const metadata = getDecoratorMetadata(
    appModuleSourceFile,
    'NgModule',
    ANGULAR_CORE
  )[0] as ts.ObjectLiteralExpression;

  if (!metadata) {
    return undefined;
  }

  const matchingProperties = getMetadataField(metadata, 'imports');
  if (!matchingProperties) {
    return undefined;
  }

  const assignment = matchingProperties[0] as ts.PropertyAssignment;
  const arrayLiteral = assignment.initializer;
  if (!ts.isArrayLiteralExpression(arrayLiteral)) {
    return undefined;
  }

  // try with B2cStorefrontModule first
  const b2cStorefrontModule = arrayLiteral.elements.filter(
    (node) =>
      ts.isCallExpression(node) &&
      node.getFullText().indexOf(`${B2C_STOREFRONT_MODULE}.withConfig`) !== -1
  )[0] as ts.CallExpression;
  if (b2cStorefrontModule) {
    return b2cStorefrontModule;
  }

  // if not present, try with B2B_STOREFRONT_MODULE

  return arrayLiteral.elements.filter(
    (node) =>
      ts.isCallExpression(node) &&
      node.getFullText().indexOf(`${B2B_STOREFRONT_MODULE}.withConfig`) !== -1
  )[0] as ts.CallExpression;
}

/**
 * Find the given `configName` in the given `callExpressionNode`.
 *
 * @param callExpressionNode
 * @param configName
 */
export function getConfig(
  inputNode: ts.Node,
  configName: string
): ts.PropertyAssignment | undefined {
  const objectLiteralExpression = findNodes(
    inputNode,
    ts.SyntaxKind.ObjectLiteralExpression
  )[0];

  const propertyAssignments = findNodes(
    objectLiteralExpression,
    ts.SyntaxKind.PropertyAssignment
  ) as ts.PropertyAssignment[];

  for (const propertyAssignment of propertyAssignments) {
    const config = findNode(
      propertyAssignment,
      ts.SyntaxKind.Identifier,
      configName
    );

    if (config) {
      return propertyAssignment;
    }
  }

  return undefined;
}

/**
 * The method checks if the config with the given `configName` exists.
 * If it does exist, the `newValues` are merged to it.
 * If it doesn't exist, the new config is created instead.
 *
 * @param path the file path
 * @param configObject the config object in which to look into
 * @param configName the new or existing config's name
 * @param newValues new values to insert
 */
export function mergeConfig(
  path: string,
  configObject: ts.PropertyAssignment,
  configName: string,
  newValues: string | string[]
): Change {
  const configIdentifier = findNodes(
    configObject,
    ts.SyntaxKind.Identifier
  ).filter((node) => node.getText() === configName)[0];

  if (!configIdentifier) {
    return createNewConfig(path, configObject, configName, newValues);
  }

  const configPropertyAssignment = configIdentifier.parent as ts.PropertyAssignment;
  const currentArrayConfigNode = findNodes(
    configPropertyAssignment,
    ts.SyntaxKind.ArrayLiteralExpression,
    1,
    false
  )[0];
  if (currentArrayConfigNode) {
    return handleArrayConfigMerge(path, currentArrayConfigNode, newValues);
  }

  return handleRegularConfigMerge(path, configPropertyAssignment, newValues);
}

/**
 * Handles the merging of a regular (non-array) config
 * @param path to a file
 * @param configPropertyAssignment the config node
 * @param newValues the new values to set to the given config node
 */
function handleRegularConfigMerge(
  path: string,
  configPropertyAssignment: ts.PropertyAssignment,
  newValues: string | string[]
): Change {
  const stringConfigNode = findNodes(
    configPropertyAssignment,
    ts.SyntaxKind.StringLiteral,
    1,
    false
  )[0];

  const configValue = convert(newValues);
  const change = new ReplaceChange(
    path,
    stringConfigNode.getStart(),
    stringConfigNode.getText(),
    configValue
  );
  return change;
}

/**
 * Method creates the new configuration key inside of the give `configObject`.
 *
 * @param path the file path
 * @param configObject the config object in which to create the new config property
 * @param propertyName the name of the new config key
 * @param newValues the value
 */
export function createNewConfig(
  path: string,
  configObject: ts.PropertyAssignment | ts.ObjectLiteralExpression,
  configPropertyName: string,
  newValues: string | string[]
): InsertChange {
  const configValue = convert(newValues);

  let node: ts.Node;
  if (configObject.kind === ts.SyntaxKind.ObjectLiteralExpression) {
    const syntaxListNode = findNodes(
      configObject,
      ts.SyntaxKind.SyntaxList,
      1,
      true
    )[0] as ts.SyntaxList;
    node = syntaxListNode;
  } else {
    const nestedProperties = findNodes(
      configObject,
      ts.SyntaxKind.PropertyAssignment,
      2,
      true
    ) as ts.PropertyAssignment[];
    node = configObject;
    if (nestedProperties.length) {
      node = nestedProperties[nestedProperties.length - 1];
    }
  }

  const leadingTriviaWidth =
    node.getLeadingTriviaWidth() !== 0 ? node.getLeadingTriviaWidth() : 1;
  const indentation = ' '.repeat(leadingTriviaWidth - 1);
  const property = configPropertyName !== '' ? `${configPropertyName}: ` : '';
  const insertChange = new InsertChange(
    path,
    node.getStart(),
    `${property}${configValue},\n${indentation}`
  );
  return insertChange;
}

/**
 * The method parses the given `arrayConfigNode` and merges the
 * given `newValues` into it.
 *
 * @param path the file path
 * @param arrayConfigNode the config object in which to look into
 * @param newValues new values to insert
 */
function handleArrayConfigMerge(
  path: string,
  arrayConfigNode: ts.Node,
  newValues: string | string[]
): Change {
  const currentConfigValues = parseArrayConfig(arrayConfigNode);
  const mergedConfigs = mergeConfigs(currentConfigValues, newValues);

  const change = new ReplaceChange(
    path,
    arrayConfigNode.getStart(),
    arrayConfigNode.getText(),
    mergedConfigs
  );
  return change;
}

/**
 * The method parses the given array string by removing all the whitespace characters, etc.
 * @param node config node
 */
function parseArrayConfig(node: ts.Node): string[] {
  let config = node.getText().replace(/\s/gm, '').replace(/\'/gm, '');
  // remove the opening `[` and the closing `]` characters
  config = config.substring(1, config.length - 1);
  return config.split(',');
}

/**
 * Merges the given the given `newRawValues` into the `currentConfigValues`
 * @param currentConfigValues the current values
 * @param newRawValues the new values to merge in
 */
function mergeConfigs(
  currentConfigValues: string[],
  newRawValues: string | string[]
): string {
  const newValues: string[] = [].concat(newRawValues as any);
  const newConfigValues = [...currentConfigValues];
  for (const newValue of newValues) {
    if (!currentConfigValues.includes(newValue)) {
      newConfigValues.push(newValue);
    }
  }

  return transformArray(newConfigValues);
}

/**
 * Transforms the given array into a string
 * @param values array values
 */
function transformArray(values: string[]): string {
  const csv = values.map((value) => `'${value}'`).join(', ');
  return `[${csv}]`;
}

/**
 * Returns a single string from the given new values(s)
 * @param newValues a single string, or an array of strings
 */
function convert(newValues: string | string[]): string {
  let configValue: string;
  if (Array.isArray(newValues)) {
    configValue = transformArray(newValues);
  } else {
    configValue = newValues;
  }
  return configValue;
}

export function getConfigs(sourceFile: SourceFile): Node[] {
  const configs: Node[] = [];
  const module = getModule(sourceFile);
  if (!module) {
    return [];
  }
  const literal = module.getFirstDescendantByKind(
    tsMorph.SyntaxKind.ObjectLiteralExpression
  );
  if (literal) {
    const properties = literal.getChildrenOfKind(
      tsMorph.SyntaxKind.PropertyAssignment
    );
    if (properties) {
      properties.forEach((property) => {
        if (
          property.getNameNode().getText() === 'providers' &&
          property.getInitializerIfKind(
            tsMorph.SyntaxKind.ArrayLiteralExpression
          )
        ) {
          const initializer = property.getInitializerIfKind(
            tsMorph.SyntaxKind.ArrayLiteralExpression
          );
          if (initializer) {
            const elements = initializer.getElements();
            elements.forEach((element) => {
              if (Node.isCallExpression(element)) {
                const expression = element.getExpression();
                if (
                  Node.isIdentifier(expression) &&
                  expression.getText() === 'provideConfig' &&
                  isImportedFrom(expression, SPARTACUS_CORE)
                ) {
                  if (element.getArguments()?.[0]) {
                    const config = element.getArguments()[0];
                    // "type assertion" and "as expression" is useless for us, so we can skip it and add it's children
                    if (Node.isTypeAssertion(config)) {
                      try {
                        configs.push(element.getFirstChildOrThrow());
                      } catch {}
                    } else if (Node.isAsExpression(config)) {
                      try {
                        configs.push(element.getFirstChildOrThrow());
                      } catch {}
                    } else {
                      configs.push(element.getArguments()[0]);
                    }
                  }
                }
              }
            });
          }
        }
      });
    }
  }
  return configs;
}

export function checkConfigPresence(configs: Node[], key: string): Node[] {
  const values: Node[] = [];
  const properties = key.split('.');
  for (const config of configs) {
    let obj = config;
    for (let i = 0; i < properties.length; i++) {
      const property = properties[i];
      if (Node.isObjectLiteralExpression(obj)) {
        const sub = obj.getProperty(property);
        if (sub) {
          obj = sub;
          if (i === properties.length - 1) {
            values.push(sub);
          }
        } else {
          break;
        }
      }
    }
  }
  return values;
}
