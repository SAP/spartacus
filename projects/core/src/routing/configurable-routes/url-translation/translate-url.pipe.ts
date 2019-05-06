import { Pipe, PipeTransform } from '@angular/core';
import { UrlService } from './url-translation.service';
import {
  TranslateUrlCommands,
  TranslateUrlOptions,
} from './translate-url-commands';

@Pipe({
  name: 'cxTranslateUrl',
})
export class UrlPipe implements PipeTransform {
  constructor(private urlTranslator: UrlService) {}

  transform(
    commands: TranslateUrlCommands,
    options: TranslateUrlOptions = {}
  ): any[] {
    return this.urlTranslator.translate(commands, options);
  }
}
