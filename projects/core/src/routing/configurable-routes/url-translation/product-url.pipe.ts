import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'projects/backend/occ-client/lib/models';
import { RoutingConfigService } from '../routing-config.service';
import { SemanticPathService } from './semantic-path.service';

import { UrlParsingService } from './url-parsing.service';
import { isParam, getParamName } from './path-utils';
import { ParamsMapping } from '../routes-config';
@Pipe({
  name: 'cxProductUrl',
})
export class ProductURLPipe implements PipeTransform {
  protected routingConfigService: RoutingConfigService;
  semanticPath: SemanticPathService;
  
  constructor(private productURLService: RoutingConfigService, private urlParser: UrlParsingService) {}

  transform(item : Product) {
    const path =this.productURLService.getRouteConfig("product").paths[0];
    const paramMapping= this.productURLService.getRouteConfig("product").paramsMapping;
    console.log(path);
    console.log(item);
    console.log(paramMapping);
    return this.provideParamsValues(path,item, paramMapping);
  }

  private provideParamsValues(
    path: string,
    params: object,
    paramsMapping: ParamsMapping
  ): string[] {
    return this.urlParser.getPrimarySegments(path).map(segment => {
      if (isParam(segment)) {
        const paramName = getParamName(segment);
        const mappedParamName = this.getMappedParamName(
          paramName,
          paramsMapping
        );
        return params[mappedParamName];
      }
      return segment;
    });
  }

  private getMappedParamName(paramName: string, paramsMapping: object): string {
    if (paramsMapping) {
      return paramsMapping[paramName] || paramName;
    }
    return paramName;
  }
}