import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService, Occ, OccEndpointsService } from '@spartacus/core';
import {
  USER_ACCOUNT_NORMALIZER,
  UserAccountAdapter,
} from '@spartacus/user/account/core';
import { User } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OccUserAccountAdapter implements UserAccountAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  load(userId: string): Observable<User> {
    const url = this.occEndpoints.getUrl('user', { userId });
    return this.http
      .get<Occ.User>(url)
      .pipe(this.converter.pipeable(USER_ACCOUNT_NORMALIZER));
  }
}
