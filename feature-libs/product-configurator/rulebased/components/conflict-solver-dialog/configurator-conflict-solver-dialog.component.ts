import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ModalService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { Configurator } from '../../core/model/configurator.model';

@Component({
  selector: 'cx-configurator-conflict-solver-dialog',
  templateUrl: './configurator-conflict-solver-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorConflictSolverDialogComponent {
  @ViewChild('dialog', { read: ElementRef })
  dialog: ElementRef;
  conflictGroups$: Observable<Configurator.Group[] | undefined>;

  init(conflictGroups: Observable<Configurator.Group[] | undefined>): void {
    this.conflictGroups$ = conflictGroups;
  }

  constructor(protected modalService: ModalService) {}
}
