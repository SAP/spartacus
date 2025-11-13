/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  AuthRedirectService,
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { UpdateEmailComponentService } from '@spartacus/user/profile/components';
import { UserEmailFacade } from '@spartacus/user/profile/root';

@Injectable()
export class CDCUpdateEmailComponentService extends UpdateEmailComponentService {
  protected userEmail: UserEmailFacade;
  protected routingService: RoutingService;
  protected globalMessageService: GlobalMessageService;
  protected authService: AuthService;
  protected authRedirectService: AuthRedirectService;
  protected cdcJsService = inject(CdcJsService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const userEmail = inject(UserEmailFacade);
    const routingService = inject(RoutingService);
    const globalMessageService = inject(GlobalMessageService);
    const authService = inject(AuthService);
    const authRedirectService = inject(AuthRedirectService);

    super(
      userEmail,
      routingService,
      globalMessageService,
      authService,
      authRedirectService
    );
  
    this.userEmail = userEmail;
    this.routingService = routingService;
    this.globalMessageService = globalMessageService;
    this.authService = authService;
    this.authRedirectService = authRedirectService;
  }

  save(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.busy$.next(true);

    const newEmail = this.form.get('confirmEmail')?.value;
    const password = this.form.get('password')?.value;

    this.cdcJsService
      .updateUserEmailWithoutScreenSet(password, newEmail)
      .subscribe({
        next: () => this.onSuccess(newEmail),
        error: (error: Error) => this.onError(error),
      });
  }

  protected onError(_error: Error): void {
    this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
    this.globalMessageService.add(
      { key: 'httpHandlers.validationErrors.invalid.password' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
    this.busy$.next(false);
  }
}
