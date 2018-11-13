import { Pipe, PipeTransform } from '@angular/core';
import { DynamicPathService } from './dynamic-path.service';

@Pipe({
  name: 'cxDynamicPath'
})
export class DynamicPathPipe implements PipeTransform {
  constructor(private dynamicPathService: DynamicPathService) {}

  transform(url: string): string {
    return this.dynamicPathService.transform(url);
  }
}
