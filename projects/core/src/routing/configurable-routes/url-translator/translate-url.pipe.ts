import { Pipe, PipeTransform } from '@angular/core';
import { UrlTranslatorService } from './url-translator.service';
import { TranslateUrlOptions } from './translate-url-options';

@Pipe({
  name: 'cxTranslateUrl'
})
export class TranslateUrlPipe implements PipeTransform {
  constructor(private urlTranslator: UrlTranslatorService) {}

  transform(options: TranslateUrlOptions): string | string[] {
    return this.urlTranslator.translate(options);
  }
}
