import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OCC_USER_ID_ANONYMOUS } from '../../../occ/utils/occ-constants';
import { AbstractUserIdService } from './abstract-user-id.service';

// TODO: Add unit tests after we finalize API shape
@Injectable()
export class OccUserIdService extends AbstractUserIdService {
  getUserId(): Observable<string> {
    return super
      .getUserId()
      .pipe(map((userId) => userId || OCC_USER_ID_ANONYMOUS));
  }
}
