import { Pipe, PipeTransform } from '@angular/core';
import { DynamicPathPipeService } from './dynamic-path-pipe.service';

@Pipe({
  name: 'cxDynamicPath'
})
export class DynamicPathPipe implements PipeTransform {
  constructor(private dynamicPathService: DynamicPathPipeService) {}

  transform(url: string): string {
    return this.dynamicPathService.transform(url);
  }
}
