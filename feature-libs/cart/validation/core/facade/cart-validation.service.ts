import { Injectable } from '@angular/core';
import { CartValidationFacade } from '@spartacus/cart/validation/root';
import { Observable, of } from 'rxjs';
import { CartModification } from '@spartacus/core';

@Injectable()
export class CartValidationService implements CartValidationFacade {
  constructor() {}

  validate(): Observable<CartModification | undefined> {
    return of();
  }
}
