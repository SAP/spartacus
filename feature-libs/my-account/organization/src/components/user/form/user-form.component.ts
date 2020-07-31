import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { B2BUnitNode, OrgUnitService } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-user-form',
  templateUrl: './user-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit {
  /**
   * The form is controlled from the container component.
   */
  @Input() form: FormGroup;

  units$: Observable<B2BUnitNode[]> = this.orgUnitService.getActiveUnitList();

  constructor(protected orgUnitService: OrgUnitService) {}

  ngOnInit(): void {
    this.orgUnitService.loadList();
  }
}
