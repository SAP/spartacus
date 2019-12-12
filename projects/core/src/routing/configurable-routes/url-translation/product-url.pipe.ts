import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'projects/backend/occ-client/lib/models';
import { RoutingConfigService } from '../routing-config.service';
import { SemanticPathService } from './semantic-path.service';

import { UrlParsingService } from './url-parsing.service';
import { isParam, getParamName } from './path-utils';
@Pipe({
  name: 'cxProductUrl',
})
export class ProductURLPipe implements PipeTransform {
  protected routingConfigService: RoutingConfigService;
  semanticPath: SemanticPathService;
  
  constructor(private productURLService: RoutingConfigService, private urlParser: UrlParsingService) {}

  transform(item: Product) {
    const path =this.productURLService.getRouteConfig("product").paths[0];
    console.log(path);
    return this.urlParser.getPrimarySegments(path).filter(isParam).map(getParamName);
  }
}