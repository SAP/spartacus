import { Injectable } from '@angular/core';
import { UserDetailsAdapter } from '../../../user/connectors/details/user-details.adapter';
import { HttpClient } from '@angular/common/http';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { Observable, throwError } from 'rxjs';
import { User } from '../../../model/misc.model';
import { catchError } from 'rxjs/operators';
import { Occ } from '../../occ-models/occ.models';
import { ConverterService } from '../../../util/converter.service';
import {
  USER_NORMALIZER,
  USER_SERIALIZER,
} from '../../../user/connectors/details/converters';

const USER_ENDPOINT = 'users/';

@Injectable()
export class OccUserDetailsAdapter implements UserDetailsAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  private getUserEndpoint(userId: string): string {
    const endpoint = `${USER_ENDPOINT}${userId}`;
    return this.occEndpoints.getEndpoint(endpoint);
  }

  load(userId: string): Observable<User> {
    const url = this.getUserEndpoint(userId);
    return this.http.get<Occ.User>(url).pipe(
      catchError((error: any) => throwError(error)),
      this.converter.pipeable(USER_NORMALIZER)
    );
  }

  update(userId: string, user: User): Observable<{}> {
    const url = this.getUserEndpoint(userId);
    user = this.converter.convert(user, USER_SERIALIZER);
    return this.http
      .patch(url, user)
      .pipe(catchError(error => throwError(error)));
  }
}
