import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, flatMap, map } from 'rxjs/operators';
import { CmsComponentData } from '../../../../../../storefrontlib/src/cms-structure/page/model/cms-component-data';
import { CmsMerchandisingCarouselComponent as model } from '../../../../cds-models/cms.model';
import { StrategyConnector } from './../../../../../../cds/src/merchandising/connectors/strategy/strategy.connector';

@Component({
  selector: 'cx-merchandising-carousel',
  templateUrl: './merchandising-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchandisingCarouselComponent {
  private componentData$: Observable<model> = this.componentData.data$.pipe(
    filter(Boolean)
  );

  title$: Observable<string> = this.componentData$.pipe(
    map(data => data.title)
  );

  size$: Observable<string> = this.componentData$.pipe(
    map(data => data.numberToDisplay)
  );

  backgroundColor$: Observable<string> = this.componentData$.pipe(
    map(data => data.backgroundColour)
  );

  textColor$: Observable<string> = this.componentData$.pipe(
    map(data => data.textColour)
  );

  items$: Observable<Observable<Product>[]> = this.componentData$.pipe(
    map(data => data.strategy),
    distinctUntilChanged(),
    flatMap(strategyId =>
      this.strategyConnector.loadProductsForStrategy(strategyId)
    ),
    map(merchandisingProducts => merchandisingProducts.products),
    map(products => products.map(product => of(product)))
  );

  constructor(
    protected componentData: CmsComponentData<model>,
    protected strategyConnector: StrategyConnector
  ) {}
}
