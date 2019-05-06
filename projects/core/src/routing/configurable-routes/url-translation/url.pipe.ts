import { Pipe, PipeTransform } from '@angular/core';
import { UrlService } from './url.service';
import { UrlCommands } from './url-command';

@Pipe({
  name: 'cxUrl',
})
export class UrlPipe implements PipeTransform {
  constructor(private urlService: UrlService) {}

  transform(commands: UrlCommands): any[] {
    return this.urlService.generateUrl(commands);
  }
}
