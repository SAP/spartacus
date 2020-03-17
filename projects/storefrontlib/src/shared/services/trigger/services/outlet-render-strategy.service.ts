import { ComponentFactory, Injectable } from '@angular/core';
import {
  OutletPosition,
  OutletService,
} from '../../../../cms-structure/outlet/index';
import { TriggerOutletMapping } from '../config';

@Injectable({ providedIn: 'root' })
export class OutletRenderService {
  constructor(protected outletService: OutletService<ComponentFactory<any>>) {}

  public render(config: TriggerOutletMapping, template: ComponentFactory<any>) {
    this.outletService.add(
      config.outlet,
      template,
      config.position ? config.position : OutletPosition.BEFORE
    );
  }
}
