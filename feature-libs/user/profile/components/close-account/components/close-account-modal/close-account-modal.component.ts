/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Optional,
} from '@angular/core';
import {
  AuthService,
  FeatureConfigService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'cx-close-account-modal',
  templateUrl: './close-account-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseAccountModalComponent implements OnInit {
  iconTypes = ICON_TYPE;
  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };

  isLoggedIn$: Observable<boolean>;
  protected loading$ = new BehaviorSubject(false);

  @HostListener('click', ['$event'])
  handleClick(event: UIEvent): void {
    if ((event.target as any).tagName === this.el.nativeElement.tagName) {
      this.dismissModal('Cross click');
    }
  }

  /**
   * TODO: (#CXSPA-741) Remove featureConfigService from constructor in 6.0.
   */
  constructor(
    protected authService: AuthService,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService,
    protected translationService: TranslationService,
    protected userProfile: UserProfileFacade,
    protected launchDialogService: LaunchDialogService,
    protected el: ElementRef,
    @Optional() protected featureConfigService?: FeatureConfigService
  ) {}

  get isLoading$(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isUserLoggedIn();
  }

  onSuccess(): void {
    this.dismissModal('Success');
    this.translationService
      .translate('closeAccount.accountClosedSuccessfully')
      .pipe(first())
      .subscribe((text) => {
        this.globalMessageService.add(
          text,
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      });

    /**
     * TODO: (#CXSPA-741) Remove feature config check and deprecated route to home in 6.0.
     */
    if (this.featureConfigService?.isLevel('5.1')) {
      this.authService.coreLogout().then(() => {
        this.routingService.go({ cxRoute: 'home' });
      });
    } else {
      this.routingService.go({ cxRoute: 'home' });
    }
  }

  onError(): void {
    this.dismissModal('Error');
    this.translationService
      .translate('closeAccount.accountClosedFailure')
      .pipe(first())
      .subscribe((text) => {
        this.globalMessageService.add(text, GlobalMessageType.MSG_TYPE_ERROR);
      });
  }

  dismissModal(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
  }

  closeAccount() {
    this.loading$.next(true);

    this.userProfile.close().subscribe({
      next: () => {
        this.onSuccess();
        this.loading$.next(false);
      },
      error: () => {
        this.onError();
        this.loading$.next(false);
      },
    });
  }
}
