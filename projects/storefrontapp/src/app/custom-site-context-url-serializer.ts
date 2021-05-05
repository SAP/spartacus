import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { SiteContextUrlSerializer } from '@spartacus/core';

export interface ParamValuesMap {
  [name: string]: string;
}

export interface UrlTreeWithSiteContext extends UrlTree {
  siteContext?: ParamValuesMap;
}

const UrlSplit = /(^[^#?]*)(.*)/; // used to split url into path and query/fragment parts

@Injectable({ providedIn: 'root' })
export class CustomSiteContextUrlSerializer extends SiteContextUrlSerializer {
  urlExtractContextParameters(
    url: string
  ): { url: string; params: ParamValuesMap } {
    let [, urlPart, queryPart] = url.match(UrlSplit);

    const urlEncodingParameters = this['urlEncodingParameters'];
    const siteContextParamsService = this['siteContextParams'];

    const segments = urlPart.split('/');
    if (segments[0] === '') {
      segments.shift();
    }
    const params = {};

    let paramId = 0;
    let segmentId = 0;
    while (
      paramId < urlEncodingParameters.length &&
      segmentId < segments.length
    ) {
      const paramName = urlEncodingParameters[paramId];
      const paramValues = siteContextParamsService.getParamValues(paramName);

      let segmentValue;
      if (paramName === 'custom') {
        // Consume 2 segments at one time for the context 'custom'

        // if the 2nd segment doesn't exist, end recognition
        if (segmentId + 1 > segments.length) {
          break;
        }

        const segment1 = segments[segmentId];
        const segment2 = segments[segmentId + 1];
        segmentValue = `${segment1}/${segment2}`;
      } else {
        // Consume one segment for one context, by default
        segmentValue = segments[segmentId];
      }

      if (paramValues.includes(segmentValue)) {
        params[paramName] = segmentValue;
        segmentId++;

        if (paramName === 'custom') {
          // We consumed 2 segments, so need to move the "cursor" to yet next position:
          segmentId++;
        }
      }
      paramId++;
    }

    url = segments.slice(segmentId).join('/') + queryPart;
    return { url, params };
  }
}
