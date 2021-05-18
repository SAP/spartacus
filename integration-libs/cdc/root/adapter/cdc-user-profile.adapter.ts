import { Injectable } from "@angular/core";
import { normalizeHttpError, User } from "@spartacus/core";
import { USER_PROFILE_SERIALIZER } from "@spartacus/user/profile/core";
import { OccUserProfileAdapter } from "@spartacus/user/profile/occ";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
  })
export class CdcUserProfileAdapter extends OccUserProfileAdapter{
    update(userId: string, user: User): Observable<unknown> {
        const url = this.occEndpoints.getUrl('users/${userId}', { userId });
        user = this.converter.convert(user, USER_PROFILE_SERIALIZER);
        return this.http
          .patch(url, user)
          .pipe(catchError((error) => throwError(normalizeHttpError(error))));
      }
}