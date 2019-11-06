import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, flatMap, map } from 'rxjs/operators';
import { CmsMerchandisingCarouselComponent as model } from '../../../../cds-models/cms.model';
import { StrategyConnector } from '../../../../merchandising/connectors/strategy/strategy.connector';
import { StrategyResult } from '../../../../merchandising/model/strategy.result';

@Component({
  selector: 'cx-merchandising-product-carousel',
  templateUrl: './merchandising-product-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchandisingProductCarouselComponent {
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

  items$: Observable<StrategyResult> = this.componentData$.pipe(
    map(data => data.strategy),
    flatMap(strategyId =>
      this.strategyConnector.loadProductsForStrategy(strategyId)
    )
  );

  constructor(
    protected componentData: CmsComponentData<model>,
    protected strategyConnector: StrategyConnector
  ) {}
}
