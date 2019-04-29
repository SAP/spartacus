import {
  UrlMatcher,
  UrlMatchResult,
  UrlSegment,
  UrlSegmentGroup,
  Route,
} from '@angular/router';
import { Injectable } from '@angular/core';

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

  // Similar to Angular's defaultUrlMatcher. The difference is that `path` comes from function's argument, not from `route.path`
  private getPathUrlMatcher(path: string = ''): UrlMatcher {
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
