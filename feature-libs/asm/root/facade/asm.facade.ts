import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ASM_FEATURE } from '../feature-name';
import { BindCartParams } from '../model/bind-cart.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: AsmFacade,
      feature: ASM_FEATURE,
      methods: ['bindCart'],
    }),
})
export abstract class AsmFacade {
  abstract bindCart(options: BindCartParams): Observable<unknown>;
}
