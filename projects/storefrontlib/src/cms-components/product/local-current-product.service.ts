import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CurrentProductService } from './current-product.service';

@Injectable()
export class LocalCurrentProductService extends CurrentProductService {
  protected readonly code$ = new Subject<string>();

  setCode(code: string) {
    this.code$.next(code);
  }

  /** @override */
  protected getCode(): Observable<string> {
    return this.code$;
  }
}
