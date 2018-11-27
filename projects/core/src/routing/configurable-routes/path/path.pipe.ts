import { Pipe, PipeTransform } from '@angular/core';
import { PathPipeService } from './path-pipe.service';

@Pipe({
  name: 'cxPath'
})
export class PathPipe implements PipeTransform {
  constructor(private service: PathPipeService) {}

  transform(
    nestedRoutesNames: string[],
    nestedRoutesParams?: object[]
  ): string[] {
    return this.service.transform(nestedRoutesNames, nestedRoutesParams);
  }
}
