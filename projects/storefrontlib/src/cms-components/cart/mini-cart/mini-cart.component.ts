import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartService } from '@spartacus/core';
import { Observable, OperatorFunction, SchedulerLike } from 'rxjs';
import { debounceTime, filter, map, startWith, tap } from 'rxjs/operators';
import { ICON_TYPE } from '../../misc/icon/index';

export function bufferDebounceTime<T>(
  time: number = 0,
  scheduler?: SchedulerLike
): OperatorFunction<T, T[]> {
  return (source: Observable<T>) => {
    let bufferedValues: T[] = [];

    return source.pipe(
      tap(value => bufferedValues.push(value)),
      debounceTime(time, scheduler),
      map(() => bufferedValues),
      tap(() => (bufferedValues = []))
    );
  };
}

@Component({
  selector: 'cx-mini-cart',
  templateUrl: './mini-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniCartComponent {
  iconTypes = ICON_TYPE;

  quantity$: Observable<number> = this.cartService.getActive().pipe(
    startWith({ deliveryItemsQuantity: 0 }),
    map(cart => cart.deliveryItemsQuantity || 0)
  );

  total$: Observable<string> = this.cartService.getActive().pipe(
    filter(cart => !!cart.totalPrice),
    map(cart => cart.totalPrice.formattedValue)
  );

  constructor(protected cartService: CartService) {}
}
