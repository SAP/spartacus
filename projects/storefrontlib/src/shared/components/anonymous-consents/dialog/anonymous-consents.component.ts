import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnonymousConsentsService, RoutingService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { ModalRef, ModalService } from '../../modal/index';
import { AnonymousConsentsDialogComponent } from './anonymous-consents-dialog.component';

export const ANONYMOUS_CONSENTS_QUERY_PARAMETER = 'anonymousConsents';

@Component({
  selector: 'cx-anonymous-consents',
  templateUrl: './anonymous-consents.component.html',
})
export class AnonymousConsentsComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  constructor(
    private modalService: ModalService,
    private anonymousConsentsService: AnonymousConsentsService,
    private routingService: RoutingService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.routingService
        .getRouterState()
        .pipe(withLatestFrom(this.routingService.isNavigating()))
        .subscribe(([state, isNavigating]) => {
          const anonymousConsentsQueryParamValue =
            state.state.queryParams[ANONYMOUS_CONSENTS_QUERY_PARAMETER];

          if (!isNavigating && Boolean(anonymousConsentsQueryParamValue)) {
            const queryParamToRemove = this.buildQueryParam(
              anonymousConsentsQueryParamValue
            );
            const modalRef = this.openDialog();
            this.handleClosing(modalRef, state.state.url, queryParamToRemove);
          }
        })
    );
  }

  private buildQueryParam(anonymousConsentsQueryParamValue: any): string {
    return `?${ANONYMOUS_CONSENTS_QUERY_PARAMETER}=${anonymousConsentsQueryParamValue}`;
  }

  private openDialog(): ModalRef {
    const modalRef = this.modalService.open(AnonymousConsentsDialogComponent, {
      centered: true,
      size: 'lg',
    });

    const modalInstance: AnonymousConsentsDialogComponent =
      modalRef.componentInstance;
    modalInstance.consents$ = this.anonymousConsentsService.getAnonymousConsents();
    modalInstance.templates$ = this.anonymousConsentsService.getAnonymousConsentTemplates();

    return modalRef;
  }

  private handleClosing(
    modalRef: ModalRef,
    currentUrl: string,
    queryParamToRemove: string
  ): void {
    modalRef.result.then(_ => {
      const newUrl = currentUrl.replace(queryParamToRemove, '');
      this.routingService.goByUrl(newUrl);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
