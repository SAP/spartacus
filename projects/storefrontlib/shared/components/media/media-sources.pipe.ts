/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxMediaSources',
})
export class MediaSourcesPipe implements PipeTransform {
  transform(sizes: string) {
    const sources: Pick<HTMLSourceElement, 'srcset' | 'media'>[] = [];

    return sizes.split(/,\s*/).reduceRight((acc, set) => {
      let [srcset, media] = set.split(' ');

      if (!srcset || !media) {
        return acc;
      }

      media = `(min-width: ${media.replace('w', 'px')})`;

      acc.push({ srcset, media });

      return acc;
    }, sources);
  }
}
