import { Injectable, OnDestroy } from '@angular/core';
import { EventService } from '@spartacus/core';
import { ModalRef, ModalService } from '@spartacus/storefront';
import {
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
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

  routerData$: Observable<ConfiguratorRouter.Data> =
    this.configRouterExtractorService.extractRouterData();

  conflictGroups$: Observable<Configurator.Group[] | undefined> =
    this.routerData$.pipe(
      switchMap((routerData) =>
        this.configuratorGroupsService.getConflictGroups(routerData.owner)
      )
    );

  constructor(
    protected eventService: EventService,
    protected modalService: ModalService,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected configuratorGroupsService: ConfiguratorGroupsService
  ) {
    this.openConflictSolverDialog();
  }

  protected openConflictSolverDialog() {
    this.subscription.add(
      this.conflictGroups$.subscribe((conflictGroups) => {
        this.openModal(conflictGroups);
      })
    );
  }

  protected openModal(conflictGroups: Configurator.Group[] | undefined): void {
    if (conflictGroups && conflictGroups?.length > 0) {
      console.warn('There are ' + conflictGroups?.length + ' conflict groups');
      this.modalRef = this.modalService.open(
        ConfiguratorConflictSolverDialogComponent,
        {
          centered: true,
          size: 'lg',
        }
      );

      const modalInstance = this.modalRef.componentInstance;
      modalInstance.init(this.conflictGroups$, this.routerData$);
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
