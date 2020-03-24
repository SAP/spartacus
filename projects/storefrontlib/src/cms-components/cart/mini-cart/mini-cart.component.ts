import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
} from '@angular/core';
import { ActiveCartService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import {
  OutletPosition,
  OutletService,
} from '../../../cms-structure/outlet/index';
import { OutletRendererService } from '../../../cms-structure/outlet/outlet-renderer.serivce';
import { AsmMainUiComponent } from '../../asm';
import { ICON_TYPE } from '../../misc/icon/icon.model';

@Component({
  selector: 'cx-mini-cart',
  templateUrl: './mini-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniCartComponent {
  iconTypes = ICON_TYPE;

  quantity$: Observable<number> = this.activeCartService.getActive().pipe(
    startWith({ deliveryItemsQuantity: 0 }),
    map(cart => cart.deliveryItemsQuantity || 0)
  );

  total$: Observable<string> = this.activeCartService.getActive().pipe(
    filter(cart => !!cart.totalPrice),
    map(cart => cart.totalPrice.formattedValue)
  );

  constructor(
    protected activeCartService: ActiveCartService,
    private outletRendererService: OutletRendererService,
    protected outletService: OutletService<ComponentFactory<any>>,
    protected componentFactoryResolver: ComponentFactoryResolver
  ) {}

  open() {
    const template = this.componentFactoryResolver.resolveComponentFactory(
      AsmMainUiComponent
    );
    this.outletService.add('MiniCart', template, OutletPosition.BEFORE);
    this.outletRendererService.render('MiniCart');
  }
}
