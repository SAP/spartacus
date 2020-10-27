import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
} from '@angular/core';
import { Permission } from '@spartacus/organization/administration/core';
import { Observable, Subscription } from 'rxjs';
import { shareReplay, startWith, switchMap } from 'rxjs/operators';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { ExistPermissionGuard } from '../guards/exist-permission.guard';

@Component({
  templateUrl: './permission-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExistPermissionGuard],
})
export class PermissionDetailsComponent implements AfterViewInit, OnDestroy {
  permissionGuardSubscription: Subscription;

  model$: Observable<Permission> = this.itemService.key$.pipe(
    switchMap((code) => this.itemService.load(code)),
    shareReplay({ bufferSize: 1, refCount: true }),
    startWith({})
  );

  ngAfterViewInit(): void {
    this.permissionGuardSubscription = this.existPermissionGuard
      .canActivate()
      .subscribe();
  }

  ngOnDestroy(): void {
    this.permissionGuardSubscription.unsubscribe();
  }

  constructor(
    protected itemService: OrganizationItemService<Permission>,
    protected existPermissionGuard: ExistPermissionGuard
  ) {}
}
