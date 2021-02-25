import { Injectable } from '@angular/core';
import { Cart, EntitiesModel } from '@spartacus/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SavedCartService {
  constructor() {}

  getList(): Observable<EntitiesModel<Cart>> {
    return of();
  }
}
