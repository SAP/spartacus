import { Injectable, OnDestroy } from '@angular/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import {
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { Observable, Subscription } from 'rxjs';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import { switchMap, take } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorConflictSolverDialogEventListener
  implements OnDestroy
{
  protected subscription = new Subscription();

  routerData$: Observable<ConfiguratorRouter.Data> =
    this.configRouterExtractorService.extractRouterData();

  conflictGroups$: Observable<Configurator.Group[] | undefined> =
    this.routerData$.pipe(
      switchMap((routerData) =>
        this.configuratorGroupsService.getConflictGroups(routerData.owner)
      )
    );

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected configuratorGroupsService: ConfiguratorGroupsService
  ) {
    this.openConflictSolverDialog();
  }

  protected openConflictSolverDialog() {
    this.subscription.add(
      this.conflictGroups$.subscribe((conflictGroups) => {
        if (conflictGroups && conflictGroups?.length > 0) {
          this.openModal(conflictGroups, this.routerData$);
        }
      })
    );

    this.subscription.add(
      this.conflictGroups$.subscribe((conflictGroups) => {
        if (conflictGroups && conflictGroups?.length === 0) {
          this.closeModal('CLOSE_CONFLICT_SOLVER_DIALOG');
        }
      })
    );
  }

  protected openModal(
    conflictGroups: Configurator.Group[] | undefined,
    routerData$: Observable<ConfiguratorRouter.Data>
  ): void {
    console.warn('There are ' + conflictGroups?.length + ' conflict groups');

    const dialogData = {
      conflictGroups: conflictGroups,
      routerData: routerData$,
    };

    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.CONFLICT_SOLVER,
      undefined,
      undefined,
      dialogData
    );

    if (dialog) {
      dialog.pipe(take(1)).subscribe();
    }
  }

  protected closeModal(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
