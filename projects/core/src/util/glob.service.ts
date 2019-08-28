import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GlobService {
  protected readonly QUESTION_MARK = '[^/]';
  protected readonly WILD_SINGLE = '[^/]*';
  protected readonly WILD_OPEN = '(?:.+\\/)?';
  protected readonly TO_ESCAPE_BASE = [
    { replace: /\./g, with: '\\.' },
    { replace: /\+/g, with: '\\+' },
    { replace: /\*/g, with: this.WILD_SINGLE },
  ];
  protected readonly TO_ESCAPE_WILDCARD_QM = [
    ...this.TO_ESCAPE_BASE,
    { replace: /\?/g, with: this.QUESTION_MARK },
  ];
  protected readonly TO_ESCAPE_LITERAL_QM = [
    ...this.TO_ESCAPE_BASE,
    { replace: /\?/g, with: '\\?' },
  ];

  /**
   * Converts the glob-like pattern into regex string.
   * See similar Angular code: https://github.com/angular/angular/blob/master/packages/service-worker/config/src/glob.ts#L27
   *
   * Patterns use a limited glob format:
   * `**` matches 0 or more path segments
   * `*` matches 0 or more characters excluding `/`
   * `?` matches exactly one character excluding `/` (but when @param literalQuestionMark is true, `?` is treated as normal character)
   * The `!` prefix marks the pattern as being negative, meaning that only URLs that don't match the pattern will be included
   *
   * @param glob glob-like pattern
   * @param literalQuestionMark when true, it tells that `?` is treated as a normal character
   */
  protected globToRegex(glob: string, literalQuestionMark = false): string {
    const toEscape = literalQuestionMark
      ? this.TO_ESCAPE_LITERAL_QM
      : this.TO_ESCAPE_WILDCARD_QM;
    const segments = glob.split('/').reverse();
    let regex = '';
    while (segments.length > 0) {
      const segment = segments.pop();
      if (segment === '**') {
        if (segments.length > 0) {
          regex += this.WILD_OPEN;
        } else {
          regex += '.*';
        }
      } else {
        const processed = toEscape.reduce(
          (seg, escape) => seg.replace(escape.replace, escape.with),
          segment
        );
        regex += processed;
        if (segments.length > 0) {
          regex += '\\/';
        }
      }
    }
    return regex;
  }

  /**
   * For given list of glob-like patterns, returns a matcher function.
   *
   * The matcher returns true for given URL only when ANY of the positive patterns is matched and NONE of the negative ones.
   */
  getMatcher(patterns: string[]): (url: string) => boolean {
    const processedPatterns: {
      positive: boolean;
      regex: RegExp;
    }[] = this.processPatterns(patterns).map(({ positive, regex }) => ({
      positive,
      regex: new RegExp(regex),
    }));

    const includePatterns = processedPatterns.filter(spec => spec.positive);
    const excludePatterns = processedPatterns.filter(spec => !spec.positive);

    return (url: string) =>
      includePatterns.some(pattern => pattern.regex.test(url)) &&
      !excludePatterns.some(pattern => pattern.regex.test(url));
  }

  /**
   * Converts list of glob-like patterns into list of RegExps with information whether the glob pattern is positive or negative
   */
  protected processPatterns(
    urls: string[]
  ): { positive: boolean; regex: string }[] {
    return urls.map(url => {
      const positive = !url.startsWith('!');
      url = positive ? url : url.substr(1);
      return { positive, regex: `^${this.globToRegex(url)}$` };
    });
  }
}
