import { Pipe, PipeTransform } from '@angular/core';
import { DynamicUrlPipeService } from './dynamic-url-pipe.service';

@Pipe({
  name: 'cxDynamicUrl'
})
export class DynamicUrlPipe implements PipeTransform {
  constructor(private service: DynamicUrlPipeService) {}

  transform(url: string): string[] | string {
    return this.service.transform(url);
  }
}
