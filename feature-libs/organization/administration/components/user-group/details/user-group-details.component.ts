import {
  ChangeDetectionStrategy,
  Component,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { UserGroup } from '@spartacus/organization/administration/core';
import { Observable, Subscription } from 'rxjs';
import { shareReplay, startWith, switchMap } from 'rxjs/operators';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { ExistUserGroupGuard } from '../guards/exist-user-group.guard';

@Component({
  templateUrl: './user-group-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExistUserGroupGuard],
})
export class UserGroupDetailsComponent implements AfterViewInit, OnDestroy {
  userGroupGuardSubscription: Subscription;

  model$: Observable<UserGroup> = this.itemService.key$.pipe(
    switchMap((code) => this.itemService.load(code)),
    shareReplay({ bufferSize: 1, refCount: true }),
    startWith({})
  );

  ngAfterViewInit(): void {
    this.userGroupGuardSubscription = this.existUserGroupGuard
      .canActivate()
      .subscribe();
  }

  ngOnDestroy(): void {
    this.userGroupGuardSubscription.unsubscribe();
  }

  constructor(
    protected itemService: OrganizationItemService<UserGroup>,
    protected existUserGroupGuard: ExistUserGroupGuard
  ) {}
}
