import { Pipe, PipeTransform } from '@angular/core';
import { PathService } from './path.service';

@Pipe({
  name: 'cxPath'
})
export class PathPipe implements PipeTransform {
  constructor(private pathService: PathService) {}

  transform([pageName, parametersObject = {}]: [string, object]): string {
    return this.pathService.transform(pageName, parametersObject);
  }
}
