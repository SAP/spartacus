import { Pipe, PipeTransform } from '@angular/core';
import { UrlService } from './url.service';
import { UrlCommands, TranslateUrlOptions } from './url-command';

@Pipe({
  name: 'cxUrl',
})
export class UrlPipe implements PipeTransform {
  constructor(private urlTranslator: UrlService) {}

  transform(commands: UrlCommands, options: TranslateUrlOptions = {}): any[] {
    return this.urlTranslator.translate(commands, options);
  }
}
