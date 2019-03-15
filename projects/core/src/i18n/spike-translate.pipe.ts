import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from './translation.service';
import { Observable } from 'rxjs';

@Pipe({ name: 'cxSpikeTranslate', pure: false })
export class SpikeTranslatePipe implements PipeTransform {
  private lastKey: string;
  private lastOptionsJSON: string;
  private lastValue: Observable<string>;

  constructor(private service: TranslationService) {}

  transform(key: any, options: any = {}): Observable<string> {
    const optionsJSON = JSON.stringify(options); // CAUTION: sensitive to order of properties
    if (key !== this.lastKey || optionsJSON !== this.lastOptionsJSON) {
      this.lastKey = key;
      this.lastOptionsJSON = optionsJSON;

      this.lastValue = this.service.spikeLazyTranslate(key, options);
    }
    return this.lastValue;
  }
}
