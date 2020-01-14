import { Location } from '@angular/common';
import {
  ComponentFactory,
  ComponentFactoryResolver,
  Injectable,
} from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { OutletPosition, OutletService } from '@spartacus/storefront';
import { TestOutletComponent } from './test-outlet.component';

@Injectable({
  providedIn: 'root',
})
export class TestOutletService {
  constructor(
    protected location: Location,
    protected winRef: WindowRef,
    protected testOutletService: TestOutletService,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected outletService: OutletService<ComponentFactory<any>>
  ) {}

  initialize(): void {
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      TestOutletComponent
    );
    this.outletService.add(
      'LandingPage2Template',
      factory,
      OutletPosition.BEFORE
    );
  }
}
