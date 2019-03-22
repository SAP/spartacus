import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITranslationService } from '../translation.service';
import { mockTranslate } from './mock-translate';

@Injectable()
export class MockTranslationService implements ITranslationService {
  exists(_key: string, _options: any = {}): boolean {
    return true;
  }

  translate(
    key: string,
    options: any = {},
    _whitespaceUntilLoaded: boolean = false
  ): Observable<string> {
    return new Observable<string>(subscriber => {
      const value = mockTranslate(key, options);
      subscriber.next(value);
      subscriber.complete();
    });
  }

  loadNamespaces(_namespaces: string | string[]): Promise<any> {
    return Promise.resolve();
  }
}
