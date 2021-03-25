import { Observable } from 'rxjs';
import { Title, User } from '../model/misc.model';

export abstract class UserAccountFacadeTransitionalToken {
  abstract get(): Observable<User | undefined>;
}

export abstract class UserProfileFacadeTransitionalToken {
  abstract get(): Observable<User | undefined>;
  abstract update(details: User): Observable<unknown>;
  abstract close(): Observable<unknown>;
  abstract getTitles(): Observable<Title[]>;
}
