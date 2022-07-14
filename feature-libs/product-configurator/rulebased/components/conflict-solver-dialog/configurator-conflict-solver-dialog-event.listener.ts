import { Injectable, OnDestroy } from '@angular/core';
import { EventService } from '@spartacus/core';
import { ModalRef, ModalService } from '@spartacus/storefront';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { Observable, Subscription } from 'rxjs';
import { ConfiguratorConflictSolverDialogComponent } from './configurator-conflict-solver-dialog.component';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import { switchMap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorConflictSolverDialogEventListener
  implements OnDestroy
{
  protected subscription = new Subscription();

  protected modalRef: ModalRef;

  constructor(
    protected eventService: EventService,
    protected modalService: ModalService,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected configuratorGroupsService: ConfiguratorGroupsService
  ) {
    this.openDialog();
  }

  protected openDialog() {
    this.subscription.add(this.openModal());
  }

  protected openModal(): void {
    /**
    this.conflictGroups$.pipe(
      map((conflictGroups) => {
        console.error(
          'There are ' + conflictGroups?.length + ' conflict groups'
        );
        if (conflictGroups && conflictGroups?.length > 0) {
          this.modalRef = this.modalService.open(
            ConfiguratorConflictSolverDialogComponent,
            {
              centered: true,
              size: 'lg',
            }
          );

          const modalInstance = this.modalRef.componentInstance;
          modalInstance.init(this.conflictGroups$);
        }
      })
    );
     */
    this.modalRef = this.modalService.open(
      ConfiguratorConflictSolverDialogComponent,
      {
        centered: true,
        size: 'lg',
      }
    );

    const modalInstance = this.modalRef.componentInstance;
    modalInstance.init(this.conflictGroups$);
  }

  conflictGroups$: Observable<Configurator.Group[] | undefined> =
    this.configRouterExtractorService
      .extractRouterData()
      .pipe(
        switchMap((routerData) =>
          this.configuratorGroupsService.getConflictGroups(routerData.owner)
        )
      );

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
