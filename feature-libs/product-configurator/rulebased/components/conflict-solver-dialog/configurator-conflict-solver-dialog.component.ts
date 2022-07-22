import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ModalService } from '@spartacus/storefront';
import { LanguageService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ConfiguratorRouter } from '@spartacus/product-configurator/common';
import { Configurator } from '../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../form/configurator-form.event';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';

@Component({
  selector: 'cx-configurator-conflict-solver-dialog',
  templateUrl: './configurator-conflict-solver-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorConflictSolverDialogComponent {
  @ViewChild('dialog', { read: ElementRef })
  dialog: ElementRef;
  conflictGroups$: Observable<Configurator.Group[] | undefined>;
  routerData$: Observable<ConfiguratorRouter.Data>;
  uiType = Configurator.UiType;

  activeLanguage$: Observable<string> = this.languageService.getActive();

  init(
    conflictGroups: Observable<Configurator.Group[] | undefined>,
    routerData: Observable<ConfiguratorRouter.Data>
  ): void {
    this.conflictGroups$ = conflictGroups;
    this.routerData$ = routerData;
  }

  updateConfiguration(event: ConfigFormUpdateEvent): void {
    this.configuratorCommonsService.updateConfiguration(
      event.ownerKey,
      event.changedAttribute,
      event.updateType
    );
  }

  constructor(
    protected modalService: ModalService,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected languageService: LanguageService
  ) {}
}
