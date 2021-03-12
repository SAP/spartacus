import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxTruncate',
})
export class TruncatePipe implements PipeTransform {
  /**
   * example usage {{ exampleString | truncate: [1, false] }}
   */
  transform(value: string, args?: any[]): string {
    if (!args) {
      return value;
    }

    const limit =
      args.length > 0 &&
      args[0] !== null &&
      args[0] !== undefined &&
      Number.isInteger(+args[0])
        ? parseInt(args[0], 10)
        : 20;

    let trail = '...';

    if (
      args.length > 1 &&
      args[1] !== null &&
      args[1] !== undefined &&
      !!args[1] === false
    ) {
      trail = '';
    }

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
