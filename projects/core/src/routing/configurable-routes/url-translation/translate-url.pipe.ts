import { Pipe, PipeTransform } from '@angular/core';
import { UrlTranslationService } from './url-translation.service';
import {
  TranslateUrlCommands,
  TranslateUrlOptions,
} from './translate-url-commands';

@Pipe({
  name: 'cxTranslateUrl',
})
export class UrlPipe implements PipeTransform {
  constructor(private urlTranslator: UrlTranslationService) {}

  transform(
    commands: TranslateUrlCommands,
    options: TranslateUrlOptions = {}
  ): any[] {
    return this.urlTranslator.translate(commands, options);
  }
}
