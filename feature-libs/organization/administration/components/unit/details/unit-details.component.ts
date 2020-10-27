import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
} from '@angular/core';
import { B2BUnit } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { shareReplay, startWith, switchMap } from 'rxjs/operators';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { ExistUnitGuard } from '../guards/exist-unit.guard';

@Component({
  templateUrl: './unit-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExistUnitGuard],
})
export class UnitDetailsComponent implements AfterViewInit, OnDestroy {
  unitGuardSubscription: Subscription;

  model$: Observable<B2BUnit> = this.itemService.key$.pipe(
    switchMap((code) => this.itemService.load(code)),
    shareReplay({ bufferSize: 1, refCount: true }),
    startWith({})
  );

  ngAfterViewInit(): void {
    this.unitGuardSubscription = this.existUnitGuard.canActivate().subscribe();
  }

  ngOnDestroy(): void {
    this.unitGuardSubscription.unsubscribe();
  }

  constructor(
    protected itemService: OrganizationItemService<B2BUnit>,
    protected existUnitGuard: ExistUnitGuard
  ) {}
}
