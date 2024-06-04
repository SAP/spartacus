/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// import { Injectable, inject } from '@angular/core';
// import { UrlTree } from '@angular/router';
// import { AuthGuard, AuthService } from '@spartacus/core';
// import { Observable, switchMap } from 'rxjs';
// import { CdcJsService } from '../service';

// @Injectable({
//   providedIn: 'root',
// })
// export class CdcAuthGuard extends AuthGuard {
//   protected cdcService = inject(CdcJsService);
//   protected authService = inject(AuthService);
//   canActivate(): Observable<boolean | UrlTree> {
//     console.log('CDCAuthGuard');
//     return this.cdcService.verifySession().pipe(
//       switchMap((data) => {
//         if (data.errorCode !== 0) {
//           // when user resets password using 'forgot password?', kill any alive session of that user
//           this.authService.logout();
//         }
//         return super.canActivate();
//       })
//     );
//   }
// }
