import { Injectable } from '@angular/core';
import {
  Route,
  UrlMatcher,
  UrlMatchResult,
  UrlSegment,
  UrlSegmentGroup,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UrlMatcherFactoryService {
  getFalsyUrlMatcher(): UrlMatcher {
    return function falsyUrlMatcher(): null {
      return null;
    };
  }

  getMultiplePathsUrlMatcher(paths: string[]): UrlMatcher {
    const self = this;

    const matcher = function multiplePathsUrlMatcher(
      segments: UrlSegment[],
      segmentGroup: UrlSegmentGroup,
      route: Route
    ): UrlMatchResult | null {
      for (let i = 0; i < paths.length; i++) {
        const result = self.getPathUrlMatcher(paths[i])(
          segments,
          segmentGroup,
          route
        );
        if (result) {
          return result;
        }
      }
      return null;
    };
    matcher.paths = paths; // property added for easier debugging of routes
    return matcher;
  }

  /**
   * Similar to Angular's defaultUrlMatcher. Differences:
   * - the `path` comes from function's argument, not from `route.path`
   * - the empty path `''` is handled here, but in Angular is handled one level higher in the match() function
   */
  protected getPathUrlMatcher(path: string = ''): UrlMatcher {
    return (
      segments: UrlSegment[],
      segmentGroup: UrlSegmentGroup,
      route: Route
    ): UrlMatchResult | null => {
      // use function's argument, not the `route.path`
      if (path === '') {
        if (
          route.pathMatch === 'full' &&
          (segmentGroup.hasChildren() || segments.length > 0)
        ) {
          return null;
        }
        return { consumed: [], posParams: {} };
      }

      const parts = path.split('/'); // use function's argument, not the `route.path`

      if (parts.length > segments.length) {
        // The actual URL is shorter than the config, no match
        return null;
      }

      if (
        route.pathMatch === 'full' &&
        (segmentGroup.hasChildren() || parts.length < segments.length)
      ) {
        // The config is longer than the actual URL but we are looking for a full match, return null
        return null;
      }

      const posParams: { [key: string]: UrlSegment } = {};

      // Check each config part against the actual URL
      for (let index = 0; index < parts.length; index++) {
        const part = parts[index];
        const segment = segments[index];
        const isParameter = part.startsWith(':');
        if (isParameter) {
          posParams[part.substring(1)] = segment;
        } else if (part !== segment.path) {
          // The actual URL part does not match the config, no match
          return null;
        }
      }

      return { consumed: segments.slice(0, parts.length), posParams };
    };
  }

  /**
   * Returns URL matcher that accepts almost everything (like `**` route), but not paths are accepted by the given matcher
   */
  getOppositeUrlMatcher(matcher: UrlMatcher): UrlMatcher {
    const oppositeMatcher = function oppositeUrlMatcher(
      segments: UrlSegment[],
      group: UrlSegmentGroup,
      route: Route
    ) {
      return matcher(segments, group, route)
        ? null
        : { consumed: segments, posParams: {} };
    };
    return oppositeMatcher;
  }
}
