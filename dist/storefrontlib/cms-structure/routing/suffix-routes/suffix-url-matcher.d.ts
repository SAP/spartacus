import { UrlMatchResult, UrlSegment } from '@angular/router';
/**
 * Matches the pattern '[ ** / ] marker / :paramName'
 *
 * @param marker phrase that indicates the start of the match
 * @param paramName name of the parameter present after the marker
 * @param precedingParamName name of the parameter for every preceding url segment
 *        i.e. `param` will result in `param0`, `param1`, ...
 */
export declare function getSuffixUrlMatcher({ marker, paramName, precedingParamName, }: {
    marker: string;
    paramName: string;
    precedingParamName?: string;
}): {
    (segments: UrlSegment[]): UrlMatchResult | null;
    _suffixRouteConfig: {
        marker: string;
        paramName: string;
        precedingParamName: string;
    };
};
