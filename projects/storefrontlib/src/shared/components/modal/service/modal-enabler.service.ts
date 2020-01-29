import {
  ComponentFactory,
  ComponentFactoryResolver,
  Injectable,
} from '@angular/core';
import {
  OutletPosition,
  OutletService,
} from '../../../../cms-structure/outlet/index';
import { ModalComponent } from '../new/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalEnablerService {
  /** indicates whether the Modal UI has been added already */
  private isUiAdded = false;

  constructor(
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected outletService: OutletService<ComponentFactory<any>>
  ) {}

  load(): void {
    this.addUi();
  }

  /**
   * Adds the Modal UI by using the `cx-storefront` outlet.
   */
  private addUi(): void {
    if (this.isUiAdded) {
      return;
    }
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      ModalComponent
    );
    this.outletService.add('cx-storefront', factory, OutletPosition.BEFORE);
    this.isUiAdded = true;
  }
}
