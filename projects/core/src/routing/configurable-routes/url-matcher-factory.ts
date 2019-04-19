import {
  UrlMatcher,
  UrlMatchResult,
  UrlSegment,
  UrlSegmentGroup,
  Route,
} from '@angular/router';

export class UrlMatcherFactory {
  static getFalsyUrlMatcher(): UrlMatcher {
    return () => null;
  }

  static getPathsUrlMatcher(paths: string[]): UrlMatcher {
    return (
      segments: UrlSegment[],
      segmentGroup: UrlSegmentGroup,
      route: Route
    ): UrlMatchResult | null => {
      for (let i = 0; i < paths.length; i++) {
        const result = UrlMatcherFactory.getPathUrlMatcher(paths[i])(
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
  }

  // Similar to Angular's defaultUrlMatcher. The difference is that `path` comes from function's argument, not from `route.path`
  private static getPathUrlMatcher(path: string = ''): UrlMatcher {
    return (
      segments: UrlSegment[],
      segmentGroup: UrlSegmentGroup,
      route: Route
    ): UrlMatchResult | null => {
      const parts = path.split('/');

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
}
