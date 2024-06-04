/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// import { Injectable, inject } from '@angular/core';
// import { RouterStateSnapshot, UrlTree, Router } from '@angular/router';
// import {
//   AuthService,
//   CmsActivatedRouteSnapshot,
//   SemanticPathService,
// } from '@spartacus/core';
// import { Observable, of, switchMap } from 'rxjs';
// import { CdcJsService } from '../service';

// @Injectable({
//   providedIn: 'root',
// })
// export class CdcCmsPageGuard {
//   protected cdcService = inject(CdcJsService);
//   protected authService = inject(AuthService);
//   protected router = inject(Router);
//   protected semanticPathService = inject(SemanticPathService);
//   canActivate(
//     _route: CmsActivatedRouteSnapshot,
//     _state: RouterStateSnapshot
//   ): Observable<boolean | UrlTree> {
//     console.log('CDC Cms Page Guard');
//     return this.cdcService.verifySession().pipe(
//       switchMap((data) => {
//         if (data.errorCode !== 0) {
//           // when user resets password using 'forgot password?', kill any alive session of that user
//           this.authService.logout();
//           // return of(
//           //   this.router.parseUrl(this.semanticPathService.get('logout') ?? '')
//           // );
//         }
//         return of(true);
//       })
//     );
//   }
// }
