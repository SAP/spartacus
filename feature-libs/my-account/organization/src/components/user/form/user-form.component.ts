import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { B2BUnitNode, OrgUnitService, UserService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { sortTitles } from 'projects/storefrontlib/src/shared/utils/forms/title-utils';

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
  titles$ = this.userService.getTitles().pipe(
    tap((titles: Title[]) => {
      if (Object.keys(titles).length === 0) {
        this.userService.loadTitles();
      }
    }),
    map((titles: Title[]) => {
      titles.sort(sortTitles);
      const noneTitle = { code: '', name: 'Title' };
      return [noneTitle, ...titles];
    })
  );

  constructor(
    protected orgUnitService: OrgUnitService,
    protected userService: UserService
  ) {}

  ngOnInit(): void {
    this.orgUnitService.loadList();
  }
}
