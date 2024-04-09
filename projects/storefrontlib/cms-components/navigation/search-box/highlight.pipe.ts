/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cxHighlight' })
export class HighlightPipe implements PipeTransform {
  transform(text: string, match?: string, caseSensitive = true): string {
    if (!match) {
      return text;
    }
    if (!caseSensitive) {
      const textStartIndex = text.toLowerCase().indexOf(match.toLowerCase());
      const matchLength = match.length;
      return text.replaceAll(
        text.substring(textStartIndex, textStartIndex + matchLength),
        `<span class="highlight">${text.substring(
          textStartIndex,
          textStartIndex + matchLength
        )}</span>`
      );
    }
    return text.replace(
      match.trim(),
      `<span class="highlight">${match.trim()}</span>`
    );
  }
}
