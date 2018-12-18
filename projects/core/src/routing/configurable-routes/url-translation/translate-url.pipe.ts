import { Pipe, PipeTransform } from '@angular/core';
import { UrlTranslationService } from './url-translation.service';
import { TranslateUrlOptions } from './translate-url-options';

@Pipe({
  name: 'cxTranslateUrl'
})
export class TranslateUrlPipe implements PipeTransform {
  constructor(private urlTranslator: UrlTranslationService) {}

  transform(options: TranslateUrlOptions): string | string[] {
    return this.urlTranslator.translate(options);
  }
}
