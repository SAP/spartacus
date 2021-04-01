import { Observable } from 'rxjs';
import { Title, User, UserSignUp } from '../model/misc.model';

export abstract class UserAccountFacadeTransitionalToken {
  abstract get(): Observable<User | undefined>;
}

export abstract class UserProfileFacadeTransitionalToken {
  abstract get(): Observable<User | undefined>;
  abstract update(details: User): Observable<unknown>;
  abstract close(): Observable<unknown>;
  abstract getTitles(): Observable<Title[]>;
}

export abstract class UserRegisterFacadeTransitionalToken {
  abstract register(user: UserSignUp): Observable<User>;
  abstract registerGuest(guid: string, password: string): Observable<User>;
  abstract getTitles(): Observable<Title[]>;
}
