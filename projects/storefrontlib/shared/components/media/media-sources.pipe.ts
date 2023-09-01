import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxMediaSources',
})
export class MediaSourcesPipe implements PipeTransform {
  transform(srcset: string) {
    const sources: Pick<HTMLSourceElement, 'srcset' | 'media'>[] = [];

    // TODO: The transformation logic should be reviewed and probably improved.
    return srcset.split(/,\s*/).reduceRight((acc, set) => {
      let [srcset, media] = set.split(' ');
      media = `(min-width: ${media.replace('w', 'px')})`;

      acc.push({ srcset, media });

      return acc;
    }, sources);
  }
}
