/**
 * @license
 * The MIT License
 * Copyright (c) 2010-2019 Google LLC. http://angular.io/license
 *
 * See:
 * - https://github.com/angular/angular/blob/6f5f481fdae03f1d8db36284b64c7b82d9519d85/packages/service-worker/config/src/glob.ts
 * - https://github.com/angular/angular/blob/6f5f481fdae03f1d8db36284b64c7b82d9519d85/aio/tests/deployment/shared/helpers.ts#L17
 * - https://github.com/angular/angular/blob/6f5f481fdae03f1d8db36284b64c7b82d9519d85/packages/service-worker/config/src/generator.ts#L86
 */

const QUESTION_MARK = '[^/]';
const WILD_SINGLE = '[^/]*';
const WILD_OPEN = '(?:.+\\/)?';
const TO_ESCAPE_BASE = [
  { replace: /\./g, with: '\\.' },
  { replace: /\+/g, with: '\\+' },
  { replace: /\*/g, with: WILD_SINGLE },
];
const TO_ESCAPE_WILDCARD_QM = [
  ...TO_ESCAPE_BASE,
  { replace: /\?/g, with: QUESTION_MARK },
];
const TO_ESCAPE_LITERAL_QM = [
  ...TO_ESCAPE_BASE,
  { replace: /\?/g, with: '\\?' },
];

/**
 * Converts the glob-like pattern into regex string.
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
export function globToRegex(glob: string, literalQuestionMark = false): string {
  const toEscape = literalQuestionMark
    ? TO_ESCAPE_LITERAL_QM
    : TO_ESCAPE_WILDCARD_QM;
  const segments = glob.split('/').reverse();
  let regex = '';
  while (segments.length > 0) {
    const segment = segments.pop();
    if (segment === '**') {
      if (segments.length > 0) {
        regex += WILD_OPEN;
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
export function getGlobMatcher(patterns: string[]): (url: string) => boolean {
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

/**
 * Converts list of glob-like patterns into list of RegExps with information whether the glob pattern is positive or negative
 */
export function processGlobPatterns(
  urls: string[]
): { positive: boolean; regex: string }[] {
  return urls.map((url) => {
    const positive = !url.startsWith('!');
    url = positive ? url : url.substr(1);
    return { positive, regex: `^${globToRegex(url)}$` };
  });
}
