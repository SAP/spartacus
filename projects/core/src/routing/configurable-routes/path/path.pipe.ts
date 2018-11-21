import { Pipe, PipeTransform } from '@angular/core';
import { PathPipeService } from './path-pipe.service';

@Pipe({
  name: 'cxPath'
})
export class PathPipe implements PipeTransform {
  constructor(private service: PathPipeService) {}

  transform(pageNames: string[], parametersObjects: object[] = []): string[] {
    // spike todo: support here nested routes given in array (and parametersObjects array for them) - for now we use only first level
    const pageName = pageNames[0];
    const parameterObject = parametersObjects[0] || {};

    // spike todo: make sure that parametersObjects list is at least as long as pageNames list - and fill missing elements with {}

    return this.service.transform(pageName, parameterObject);
  }
}
