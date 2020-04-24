import { Injectable } from '@angular/core';
import { processGlobPatterns } from './glob-utils';

@Injectable({ providedIn: 'root' })
export class GlobService {
  /**
   * For given list of glob-like patterns, returns a validator function.
   *
   * The validator returns true for given URL only when ANY of the positive patterns is matched and NONE of the negative ones.
   */
  getValidator(patterns: string[]): (url: string) => boolean {
    const processedPatterns: {
      positive: boolean;
      regex: RegExp;
    }[] = processGlobPatterns(patterns).map(({ positive, regex }) => ({
      positive,
      regex: new RegExp(regex),
    }));

    const includePatterns = processedPatterns.filter((spec) => spec.positive);
    const excludePatterns = processedPatterns.filter((spec) => !spec.positive);

    return (url: string) =>
      includePatterns.some((pattern) => pattern.regex.test(url)) &&
      !excludePatterns.some((pattern) => pattern.regex.test(url));
  }
}
