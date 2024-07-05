/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

enum TextStyle {
  Red = '\x1b[31m',
  Yellow = '\x1b[33m',
  Blue = '\x1b[34m',
  Gray = '\x1b[90m',
  Green = '\x1b[32m',
  Bold = '\x1b[1m'
}

export const Reset = '\x1b[0m';

function paint(text: string | undefined, color: string): string {
  if (!text) {
    return '';
  }

  return color + text + Reset;
}

/**
 * A utility function for terminal string styling.
 *
 *  Previously, we were using `chalk@4` for text styling, but it became outdated.
 *   When we attempted to upgrade to `chalk@5`, the process proved challenging.
 *   As a result, we created our own utility functions for text styling.
 *
 * ## Usage
 *
 * ```ts
 * const styledText = chalk.red('This is red text');
 * console.log(styledText);
 *
 * const boldText = chalk.bold('This is bold text');
 * console.log(boldText);
 * ```
 *
 * ## Available Options
 *
 * - `chalk.red(text)`: Applies red color style to the text.
 * - `chalk.yellow(text)`: Applies yellow color style to the text.
 * - `chalk.blue(text)`: Applies blue color style to the text.
 * - `chalk.gray(text)`: Applies gray color style to the text.
 * - `chalk.green(text)`: Applies green color style to the text.
 * - `chalk.bold(text)`: Applies bold style to the text.
 */
export const chalk = {
  red: (text?: string) => paint(text, TextStyle.Red,),
  yellow: (text?: string) => paint(text, TextStyle.Yellow),
  blue: (text?: string) => paint(text, TextStyle.Blue),
  gray: (text?: string) => paint(text, TextStyle.Gray),
  green: (text?: string) => paint(text, TextStyle.Green),
  bold: (text?: string) => paint(text, TextStyle.Bold)
};
