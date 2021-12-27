import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthGuard,
  AuthRedirectService,
  AuthService,
  SemanticPathService,
} from '@spartacus/core';

/**
 * Checks if there is currently logged in user.
 * Use to protect pages dedicated only for logged in users.
 */
@Injectable({
  providedIn: 'root',
})
export class SavedCartAuthGuard extends AuthGuard {
  constructor(
    protected authService: AuthService,
    protected authRedirectService: AuthRedirectService,
    protected router: Router,
    protected semanticPathService: SemanticPathService
  ) {
    super(authService, authRedirectService, router, semanticPathService);
    console.log('custom guard');
  }
}
