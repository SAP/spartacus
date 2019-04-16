import { Injectable } from '@angular/core';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const USER_ENDPOINT = 'users/';
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});
@Injectable()
export class NotificationPreferenceService {
  constructor(
    private http: HttpClient,
    private occEndpointsService: OccEndpointsService
  ) {}

  getNotificationPreference(userId: string) {
    return this.http
      .get<any>(this.getEndPoint(userId), { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  updateNotificationPreference(
    userId: string,
    notificationpreferenceList: any
  ) {
    return this.http
      .patch(
        this.getEndPoint(userId),
        JSON.stringify(notificationpreferenceList),
        {
          headers,
        }
      )
      .pipe(catchError((error: any) => throwError(error)));
  }

  private getEndPoint(userId: string): string {
    return (
      this.occEndpointsService.getEndpoint(USER_ENDPOINT) +
      userId +
      '/notificationpreferences'
    );
  }
}
