import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CellComponent } from '../cell.component';

@Component({
  selector: 'cx-org-active-link-cell',
  templateUrl: '../cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveLinkCellComponent extends CellComponent {
  get tabIndex() {
    return 0;
  }
}
