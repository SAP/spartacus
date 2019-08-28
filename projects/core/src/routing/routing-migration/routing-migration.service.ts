import { Injectable, Injector, isDevMode } from '@angular/core';
import {
  Router,
  Routes,
  UrlMatcher,
  UrlMatchResult,
  UrlSegment,
} from '@angular/router';
import { UrlMatcherFactoryService } from '../services/url-matcher-factory.service';
import { RoutingMigrationConfig } from './routing-migration-config';
import { RoutingMigrationGuard } from './routing-migration.guard';

/**
 * Service that helps redirecting to different storefront systems for specific paths
 */
@Injectable()
export class RoutingMigrationService {
  protected globHelper: GlobHelperService; //spike todo move to DI

  constructor(
    protected config: RoutingMigrationConfig,
    protected matcherFactory: UrlMatcherFactoryService,
    protected injector: Injector
  ) {
    this.globHelper = new GlobHelperService(); //spike todo move to DI
    (window as any).globHelper = this.globHelper; //spike todo remove
  }

  protected get migrationConfig(): RoutingMigrationConfig['routing']['migration'] {
    return (
      (this.config && this.config.routing && this.config.routing.migration) ||
      {}
    );
  }

  addMigrationRoutes(): void {
    const router: Router = this.injector.get(Router);
    const migrationRoutes = this.getMigrationRoutes();
    if (migrationRoutes.length) {
      router.resetConfig([].concat(migrationRoutes, router.config));
    }
  }

  /**
   * Returns routes that are responsible for redirection to different storefront systems
   */
  protected getMigrationRoutes(): Routes {
    if (!this.isConfigValid()) {
      return [];
    }
    const routes: Routes = [];

    routes.push({
      pathMatch: 'full',
      matcher: this.getUrlMatcher(),
      canActivate: [RoutingMigrationGuard],
      component: {} as any,
    });

    return routes;
  }

  /**
   * Returns the URL matcher for the migration route
   */
  protected getUrlMatcher(): UrlMatcher {
    const internalUrls = this.migrationConfig.internalUrls;
    //spike todo improve name 'comparator'

    const urlComparator = this.globHelper.spikePrepareUrlComparator(
      internalUrls
    );

    return (
      segments: UrlSegment[]
      // segmentGroup: UrlSegmentGroup,
      // route: Route
    ): UrlMatchResult | null => {
      const fullPath = '/' + segments.map(s => s.path).join('/'); // doesn't contain site context
      const isInternalUrl = urlComparator(fullPath);

      // don't activate migration route when it's internal URL
      return isInternalUrl ? null : { consumed: segments, posParams: {} };
    };
  }

  protected isConfigValid(): boolean {
    //spike todo improve:
    return true;

    if (
      !this.migrationConfig.type ||
      !this.migrationConfig.paths ||
      !this.migrationConfig.paths.length
    ) {
      if (isDevMode()) {
        console.warn(
          `Please specify properties 'paths' and 'type' for the config 'routing.migration'.`
        );
      }
      return false;
    }

    return true;
  }
}

@Injectable()
export class GlobHelperService {
  protected readonly DEFAULT_NAVIGATION_URLS = [
    '/**', // Include all URLs.
    '!/**/*.*', // Exclude URLs to files (containing a file extension in the last segment).
    '!/**/*__*', // Exclude URLs containing `__` in the last segment.
    '!/**/*__*/**', // Exclude URLs containing `__` in any other segment.
  ];

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

  spikePrepareUrlComparator(rules: string[]): (url: string) => boolean {
    // STEP 1. prepare regexes - prepare matcher
    const manifest = {} as any;
    manifest.navigationUrls = this.processNavigationUrls('', rules);
    // Create `include`/`exclude` RegExps for the `navigationUrls` declared in the manifest.
    const includeUrls = manifest.navigationUrls.filter(spec => spec.positive);
    const excludeUrls = manifest.navigationUrls.filter(spec => !spec.positive);
    const urlRegexes = {
      include: includeUrls.map(spec => new RegExp(spec.regex)),
      exclude: excludeUrls.map(spec => new RegExp(spec.regex)),
    };

    const resultFn = (url: string) =>
      urlRegexes.include.some(regex => regex.test(url)) &&
      !urlRegexes.exclude.some(regex => regex.test(url));
    return resultFn;
  }

  //spike add types
  // spikeCompare(url: string, rules) {
  //   // STEP 2. process regexes in matcher
  //   url = url || '/SITE/LANG/CURR/login/register'; //spike todo: get it from guard's router.url
  //   const urlWithoutQueryOrHash = url.replace(/[?#].*$/, '');

  //   // at least one positive and none of negatives must match
  // }

  protected processNavigationUrls(
    baseHref: string,
    urls = this.DEFAULT_NAVIGATION_URLS
  ): { positive: boolean; regex: string }[] {
    return urls.map(url => {
      const positive = !url.startsWith('!');
      url = positive ? url : url.substr(1);
      return { positive, regex: `^${this.urlToRegex(url, baseHref)}$` };
    });
  }

  protected urlToRegex(
    url: string,
    baseHref: string,
    literalQuestionMark?: boolean
  ): string {
    if (!url.startsWith('/') && url.indexOf('://') === -1) {
      url = this.joinUrls(baseHref, url);
    }

    return this.globToRegex(url, literalQuestionMark);
  }

  //spike probably not needed
  protected joinUrls(a: string, b: string): string {
    if (a.endsWith('/') && b.startsWith('/')) {
      return a + b.substr(1);
    } else if (!a.endsWith('/') && !b.startsWith('/')) {
      return a + '/' + b;
    }
    return a + b;
  }

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
}
