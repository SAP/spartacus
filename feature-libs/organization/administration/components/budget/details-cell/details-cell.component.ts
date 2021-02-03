import { Component, ChangeDetectionStrategy } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CellComponent } from '../../shared';

@Component({
  selector: 'cx-org-budget-details-cell',
  templateUrl: './details-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetDetailsCellComponent extends CellComponent {
  test$ = of('hello world').pipe(tap((data) => console.log(data)));

  public get key() {
    return this.model.code;
  }
}
