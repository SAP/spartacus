import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';
import { isEmpty } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor() { }

    canActivate(): Observable<boolean> {
        let user;

        user = sessionStorage.getItem('user');

        return of(user.token.access_token !== undefined);
    }
}
