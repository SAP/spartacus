import {
  Route,
  UrlMatchResult,
  UrlSegment,
  UrlSegmentGroup,
} from '@angular/router';

export interface SuffixRoute extends Route {
  data: {
    cxSuffixUrlMatcher: {
      marker: string;
      paramName: string;
      precedingParamName?: string;
    };
  };
}

/**
 * Matches the pattern '[ ** / ] marker / :paramName'
 *
 * @param marker phrase that indicates the start of the match
 * @param paramName name of the parameter present after the marker
 * @param precedingParamName name of the parameter for every preceding url segment
 *        i.e. `param` will result in `param0`, `param1`, ...
 */
export function suffixUrlMatcher(
  segments: UrlSegment[],
  _segmentGroup: UrlSegmentGroup,
  route: SuffixRoute
): UrlMatchResult | null {
  const config = route.data.cxSuffixUrlMatcher;
  const { marker, paramName } = config;
  const precedingParamName = config.precedingParamName || 'param';

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
}

export function findLastIndex<T>(elements: T[], predicate: (el: T) => boolean) {
  for (let index = elements.length - 1; index >= 0; index--) {
    if (predicate(elements[index])) {
      return index;
    }
  }
  return -1;
}
