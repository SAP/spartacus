/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { deepMerge, isObject } from '../../config/utils/deep-merge';

/**
 * Merge occ fields parameters
 *
 * @param fields Fields definition as string or object
 */
export function mergeFields(fields: (string | object)[]): string {
  const parsedFields = fields.map((f) =>
    typeof f === 'string' ? parseFields(f) : f
  );
  const mergedFields = optimizeFields(deepMerge({}, ...parsedFields));
  return stringifyFields(mergedFields);
}

/**
 * Optimize fields definition by removing not needed groups
 *
 * @param fields
 */
export function optimizeFields(fields: object = {}): object {
  const keys = Object.keys(fields);
  if (keys.includes('FULL')) {
    delete fields['DEFAULT' as keyof object];
    delete fields['BASIC' as keyof object];
  } else if (keys.includes('DEFAULT')) {
    delete fields['BASIC' as keyof object];
  }
  Object.keys(fields).forEach((key) => {
    (fields[key as keyof object] as object) = optimizeFields(
      fields[key as keyof object]
    );
  });
  return fields;
}

/**
 * Parse string field definition to an AST object
 *
 * @param fields Fields string definition
 * @param startIndex Used for recurrence
 */
export function parseFields(
  fields: string,
  startIndex = 0
): [object, number] | object {
  const parsedFields: Record<string, object> = {};

  let i = startIndex;
  while (i < fields.length) {
    if (fields[i] === ',') {
      if (i > startIndex) {
        parsedFields[fields.substring(startIndex, i)] = {};
      }
      startIndex = i + 1;
    } else if (fields[i] === '(') {
      const subFields = parseFields(fields, i + 1);
      if (!Array.isArray(subFields)) {
        return parsedFields;
      }
      parsedFields[fields.substring(startIndex, i)] = subFields[0];
      startIndex = subFields[1];
      i = startIndex - 1;
    } else if (fields[i] === ')') {
      if (i > startIndex) {
        parsedFields[fields.substring(startIndex, i)] = {};
      }
      return [parsedFields, i + 1];
    }
    i++;
  }

  if (startIndex < fields.length) {
    parsedFields[fields.substring(startIndex, i)] = {};
  }

  return parsedFields;
}

/**
 * Convert AST object fields definition to string representation
 *
 * @param fields
 */
export function stringifyFields(fields: object): string {
  return Object.keys(fields)
    .map((key) => {
      const subFields = stringifyFields(fields[key as keyof object]);
      return subFields ? `${key}(${subFields})` : key;
    })
    .join(',');
}

/**
 * Extract part of the object described by fields definition
 *
 * @param data
 * @param fields
 */
export function extractFields<T>(data: T, fields: string | object): T {
  const parsedFields =
    typeof fields === 'string' ? parseFields(fields) : fields;
  return getObjectPart<T>(data, parsedFields);
}

function getObjectPart<T>(data: T, fields: object): T {
  if (!isObject(data)) {
    return data;
  }

  const keys = Object.keys(fields);

  if (
    keys.length === 0 ||
    // we should not extract parts of the object with ambiguous fields definitions
    keys.find((el) => el === 'BASIC' || el === 'DEFAULT' || el === 'FULL')
  ) {
    return data;
  }

  const result = {} as T;

  keys.forEach((key) => {
    if ((data as unknown as object).hasOwnProperty(key)) {
      result[key as keyof T] = getObjectPart(
        data[key as keyof object],
        fields[key as keyof object]
      );
    }
  });

  return result;
}

// CHECK SONAR
