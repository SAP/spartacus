import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { B2BUser } from '@spartacus/core';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { ExistUserGuard } from '../guards';

@Component({
  templateUrl: './user-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExistUserGuard],
})
export class UserDetailsComponent implements AfterViewInit {
  model$: Observable<B2BUser> = this.itemService.key$.pipe(
    switchMap((code) => this.itemService.load(code)),
    startWith({})
  );

  ngAfterViewInit() {
    this.existUserGuard.canActivate().subscribe();
  }

  constructor(
    protected itemService: OrganizationItemService<B2BUser>,
    protected existUserGuard: ExistUserGuard
  ) {}
}
