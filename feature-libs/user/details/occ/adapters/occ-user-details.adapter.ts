import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService, Occ, OccEndpointsService } from '@spartacus/core';
import {
  User,
  UserAdapter,
  USER_NORMALIZER,
} from '@spartacus/user/details/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OccUserAdapter implements UserAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  load(userId: string): Observable<User> {
    const url = this.occEndpoints.getUrl('user', { userId });
    return this.http
      .get<Occ.User>(url)
      .pipe(this.converter.pipeable(USER_NORMALIZER));
  }
}
