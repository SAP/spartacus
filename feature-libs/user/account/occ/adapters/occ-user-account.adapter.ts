import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ConverterService,
  normalizeHttpError,
  Occ,
  OccEndpointsService,
} from '@spartacus/core';
import {
  USER_ACCOUNT_NORMALIZER,
  UserAccountAdapter,
} from '@spartacus/user/account/core';
import { User } from '@spartacus/user/account/root';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccUserAccountAdapter implements UserAccountAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  load(userId: string): Observable<User> {
    const url = this.occEndpoints.buildUrl('user', { urlParams: { userId } });
    return this.http.get<Occ.User>(url).pipe(
      catchError((error) => throwError(normalizeHttpError(error))),
      this.converter.pipeable(USER_ACCOUNT_NORMALIZER)
    );
  }
}
