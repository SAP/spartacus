import { Pipe, PipeTransform } from '@angular/core';
import { UrlTranslatorService } from './url-translator.service';

@Pipe({
  name: 'cxTranslateUrl'
})
export class TranslateUrlPipe implements PipeTransform {
  constructor(private urlTranslator: UrlTranslatorService) {}

  transform(
    urlOrNestedRoutesNames: string | string[],
    nestedRoutesParams?: object[]
  ): string | string[] {
    return this.urlTranslator.translate(
      urlOrNestedRoutesNames,
      nestedRoutesParams
    );
  }
}
