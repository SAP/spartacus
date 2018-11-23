import { Pipe, PipeTransform } from '@angular/core';
import { PathPipeService } from './path-pipe.service';

@Pipe({
  name: 'cxPath'
})
export class PathPipe implements PipeTransform {
  constructor(private service: PathPipeService) {}

  transform(pageNames: string[], parametersObjects?: object[]): string[] {
    return this.service.transform(pageNames, parametersObjects);
  }
}
