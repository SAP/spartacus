/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * This function checks if the provided property name is invalid.
 * It prevents the use of dangerous object keys that can lead to prototype pollution attacks.
 *
 * Prototype pollution occurs when properties like '__proto__', 'constructor', or 'prototype'
 * are added to an object, potentially leading to security vulnerabilities by modifying object prototypes.
 *
 * @param {string} key - The object property name to validate.
 * @throws {Error} If the property name is potentially dangerous.
 */
export function isKeyInvalid(key: string): void {
  const dangerousKeys = ['__proto__', 'constructor', 'prototype'];

  const isInvalidKey = dangerousKeys.includes(key);

  if (isInvalidKey) {
    throw new Error(
      'Invalid object property name: potential prototype pollution risk'
    );
  }
}
