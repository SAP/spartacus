import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import { ICON_TYPE, ModalService } from '@spartacus/storefront';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, first, take } from 'rxjs/operators';
import { UserProfileFacade } from '../../../../root';

@Component({
  selector: 'cx-close-account-modal',
  templateUrl: './close-account-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseAccountModalComponent implements OnInit {
  iconTypes = ICON_TYPE;

  isLoggedIn$: Observable<boolean>;
  isLoading$ = new BehaviorSubject(false);

  constructor(
    protected modalService: ModalService,
    private authService: AuthService,
    private globalMessageService: GlobalMessageService,
    private routingService: RoutingService,
    private translationService: TranslationService,
    private userProfile: UserProfileFacade
  ) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isUserLoggedIn();
  }

  onSuccess(success: boolean): void {
    if (success) {
      this.dismissModal();
      this.translationService
        .translate('closeAccount.accountClosedSuccessfully')
        .pipe(first())
        .subscribe((text) => {
          this.globalMessageService.add(
            text,
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
        });
      this.routingService.go({ cxRoute: 'home' });
    }
  }

  onError(error: boolean): void {
    if (error) {
      this.dismissModal();
      this.translationService
        .translate('closeAccount.accountClosedFailure')
        .pipe(first())
        .subscribe((text) => {
          this.globalMessageService.add(text, GlobalMessageType.MSG_TYPE_ERROR);
        });
    }
  }

  dismissModal(reason?: any): void {
    this.modalService.dismissActiveModal(reason);
  }

  closeAccount() {
    this.isLoading$.next(true);
    this.userProfile
      .close()
      .pipe(
        filter((state) => !!state?.success || !!state?.error),
        take(1)
      )
      .subscribe((state) => {
        this.isLoading$.next(false);
        if (state.success) {
          this.onSuccess(true);
        }
        if (state.error) {
          this.onError(true);
        }
      });
  }
}
