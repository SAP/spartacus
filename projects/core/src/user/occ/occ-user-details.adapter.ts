import { Injectable } from '@angular/core';
import { UserDetailsAdapter } from '../connectors/details/user-details.adapter';
import { HttpClient } from '@angular/common/http';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { Observable, throwError } from 'rxjs';
import { User } from '../../model/misc.model';
import { catchError } from 'rxjs/operators';
import { Occ } from '../../occ/occ-models/occ.models';
import { ConverterService } from '../../util/converter.service';
import {
  USER_NORMALIZER,
  USER_SERIALIZER,
} from '../connectors/details/converters';

const USER_ENDPOINT = 'users/';

@Injectable()
export class OccUserDetailsAdapter implements UserDetailsAdapter {
  constructor(
    protected http: HttpClient,
    private occEndpoints: OccEndpointsService,
    private converter: ConverterService
  ) {}

  protected getUserEndpoint(): string {
    return this.occEndpoints.getEndpoint(USER_ENDPOINT);
  }

  load(userId: string): Observable<User> {
    const url = this.getUserEndpoint() + userId;
    return this.http.get<Occ.User>(url).pipe(
      catchError((error: any) => throwError(error)),
      this.converter.pipeable(USER_NORMALIZER)
    );
  }

  update(username: string, user: User): Observable<{}> {
    const url = this.getUserEndpoint() + username;
    user = this.converter.convert(user, USER_SERIALIZER);
    return this.http
      .patch(url, user)
      .pipe(catchError(error => throwError(error)));
  }
}
