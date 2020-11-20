import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentProductService } from './current-product.service';

@Injectable()
export class LocalCurrentProductService extends CurrentProductService {
  protected readonly code$ = new BehaviorSubject<string>(undefined);

  setCode(code: string) {
    console.log('CHHI set code: ' + code);
    this.code$.next(code);
  }

  /** @override */
  protected getCode(): Observable<string> {
    return this.code$;
  }
}
