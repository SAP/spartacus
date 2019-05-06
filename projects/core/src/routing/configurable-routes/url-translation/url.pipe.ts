import { Pipe, PipeTransform } from '@angular/core';
import { UrlService } from './url.service';
import { UrlCommands, UrlGenerationOptions } from './url-command';

@Pipe({
  name: 'cxUrl',
})
export class UrlPipe implements PipeTransform {
  constructor(private urlService: UrlService) {}

  transform(commands: UrlCommands, options: UrlGenerationOptions = {}): any[] {
    return this.urlService.translate(commands, options);
  }
}
