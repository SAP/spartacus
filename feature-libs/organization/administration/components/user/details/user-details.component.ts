import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
} from '@angular/core';
import { B2BUser } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { ExistUserGuard } from '../guards';

@Component({
  templateUrl: './user-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExistUserGuard],
})
export class UserDetailsComponent implements AfterViewInit, OnDestroy {
  userGuardSubscription: Subscription;
  model$: Observable<B2BUser> = this.itemService.key$.pipe(
    switchMap((code) => this.itemService.load(code)),
    startWith({})
  );

  ngAfterViewInit() {
    this.userGuardSubscription = this.existUserGuard.canActivate().subscribe();
  }

  ngOnDestroy() {
    this.userGuardSubscription.unsubscribe();
  }

  constructor(
    protected itemService: OrganizationItemService<B2BUser>,
    protected existUserGuard: ExistUserGuard
  ) {}
}
