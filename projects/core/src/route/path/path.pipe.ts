import { Pipe, PipeTransform } from '@angular/core';
import { PathService } from './path.service';

@Pipe({
  name: 'cxPath'
})
export class PathPipe implements PipeTransform {
  constructor(private pathService: PathService) {}

  transform(args: (string | object)[] | string): string {
    let pageName;
    let parametersObject;
    if (typeof args === 'string') {
      pageName = args;
      parametersObject = {};
    } else {
      pageName = args[0];
      parametersObject = args[1];
    }
    return this.pathService.transform(pageName, parametersObject);
  }
}
