import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ASM_FEATURE } from '../feature-name';
import { BindCartOptions } from '../model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: AsmFacadeService,
      feature: ASM_FEATURE,
      methods: ['bindCart'],
    }),
})
export abstract class AsmFacadeService {
  abstract bindCart(options: BindCartOptions): Observable<unknown>;
}
