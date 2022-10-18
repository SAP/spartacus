import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { LanguageService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { ConfiguratorRouter } from '@spartacus/product-configurator/common';
import { Configurator } from '../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../form/configurator-form.event';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';

@Component({
  selector: 'cx-configurator-conflict-solver-dialog',
  templateUrl: './configurator-conflict-solver-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorConflictSolverDialogComponent
  implements OnInit, OnDestroy
{
  activeLanguage$: Observable<string> = this.languageService.getActive();
  uiType = Configurator.UiType;

  protected subscription = new Subscription();

  routerData$: Observable<ConfiguratorRouter.Data>;
  conflictGroups: Configurator.Group[] | undefined;

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected launchDialogService: LaunchDialogService,
    protected languageService: LanguageService
  ) {}

  init(
    conflictGroups: Configurator.Group[] | undefined,
    routerData: Observable<ConfiguratorRouter.Data>
  ): void {
    this.conflictGroups = conflictGroups;
    this.routerData$ = routerData;
  }

  updateConfiguration(event: ConfigFormUpdateEvent): void {
    this.configuratorCommonsService.updateConfiguration(
      event.ownerKey,
      event.changedAttribute,
      event.updateType
    );
  }

  ngOnInit(): void {
    this.subscription.add(
      this.launchDialogService.data$.subscribe((dialogData) => {
        this.init(dialogData.conflictGroups, dialogData.routerData);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
