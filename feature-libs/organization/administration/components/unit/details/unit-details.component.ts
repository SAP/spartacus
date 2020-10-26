import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { B2BUnit } from '@spartacus/core';
import { Observable } from 'rxjs';
import { shareReplay, startWith, switchMap } from 'rxjs/operators';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { ExistUnitGuard } from '../guards/exist-unit.guard';

@Component({
  templateUrl: './unit-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExistUnitGuard],
})
export class UnitDetailsComponent implements AfterViewInit {
  model$: Observable<B2BUnit> = this.itemService.key$.pipe(
    switchMap((code) => this.itemService.load(code)),
    shareReplay({ bufferSize: 1, refCount: true }),
    startWith({})
  );

  ngAfterViewInit() {
    this.existUnitGuard.canActivate().subscribe();
  }

  constructor(
    protected itemService: OrganizationItemService<B2BUnit>,
    protected existUnitGuard: ExistUnitGuard
  ) {}
}
