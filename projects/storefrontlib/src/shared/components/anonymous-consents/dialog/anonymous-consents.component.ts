import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { ModalRef, ModalService } from '../../modal/index';
import { AnonymousConsentsDialogComponent } from './anonymous-consents-dialog.component';

export const ANONYMOUS_CONSENTS_QUERY_PARAMETER = 'anonymousConsents';

@Component({
  selector: 'cx-anonymous-consents',
  template: ``,
})
export class AnonymousConsentsComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  constructor(
    private modalService: ModalService,
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
      scrollable: true,
      backdrop: 'static',
    });

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
