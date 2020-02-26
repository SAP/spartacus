import { isDevMode } from '@angular/core';
import { UrlMatchResult, UrlSegment } from '@angular/router';

/**
 * Matches the pattern '[ ** / ] marker / :paramName'
 *
 * @param marker phrase that indicates the start of the match
 * @param paramName name of the parameter present after the marker
 * @param precedingParamName name of the parameter for every preceding url segment
 *        i.e. `param` will result in `param0`, `param1`, ...
 */
export function getSuffixUrlMatcher({
  marker,
  paramName,
  precedingParamName,
}: {
  marker: string;
  paramName: string;
  precedingParamName?: string;
}) {
  precedingParamName = precedingParamName || 'param';
  const matcher = function suffixUrlMatcher(
    segments: UrlSegment[]
  ): UrlMatchResult | null {
    const markerIndex = findLastIndex(segments, ({ path }) => path === marker);
    const isMarkerLastSegment = markerIndex === segments.length - 1;

    if (markerIndex === -1 || isMarkerLastSegment) {
      return null;
    }

    const paramIndex = markerIndex + 1;
    const posParams: { [name: string]: UrlSegment } = {
      [paramName]: segments[paramIndex],
    };

    for (let i = 0; i < markerIndex; i++) {
      posParams[`${precedingParamName}${i}`] = segments[i];
    }

    return { consumed: segments.slice(0, paramIndex + 1), posParams };
  };

  if (isDevMode()) {
    matcher['_suffixRouteConfig'] = { marker, paramName, precedingParamName }; // property added for easier debugging of routes
  }

  return matcher;
}

function findLastIndex<T>(elements: T[], predicate: (el: T) => boolean) {
  for (let index = elements.length - 1; index >= 0; index--) {
    if (predicate(elements[index])) {
      return index;
    }
  }
  return -1;
}
