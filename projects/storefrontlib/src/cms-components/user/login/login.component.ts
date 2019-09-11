import { Component, OnInit } from '@angular/core';
import {
  AnonymousConsentsService,
  AuthService,
  ConsentTemplate,
  User,
  UserService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  user$: Observable<User>;
  anonConsents$: Observable<ConsentTemplate[]>;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private anon: AnonymousConsentsService
  ) {}

  ngOnInit(): void {
    this.anonConsents$ = this.anon.getAnonymousConsentTemplates();

    this.user$ = this.auth.getUserToken().pipe(
      switchMap(token => {
        if (token && !!token.access_token) {
          return this.userService.get();
        } else {
          return of(undefined);
        }
      })
    );
  }

  callit(): void {
    this.anon.loadAnonymousConsentTemplates();
  }

  giveit(): void {
    this.anon.giveAnonymousConsent('MARKETING_NEWSLETTER');
  }

  withdrawit(): void {
    this.anon.withdrawAnonymousConsent('MARKETING_NEWSLETTER');
  }
}
