import { Injectable, inject } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { CheckoutQueryFacade } from '@spartacus/checkout/base/root';
import {
  UserIdService,
  CommandService,
  EventService,
  OCC_USER_ID_ANONYMOUS,
  Command,
  CommandStrategy,
  QueryState,
} from '@spartacus/core';
import { Observable, combineLatest, take, map, switchMap, tap } from 'rxjs';
import { CheckoutServiceDetailsConnector } from '../connector';
import {
  CheckoutServiceDetailsSetEvent,
  ServiceDetails,
} from '@spartacus/s4-service/root';

@Injectable()
export class CheckoutServiceDetailsService {
  protected activeCartFacade = inject(ActiveCartFacade);
  protected userIdService = inject(UserIdService);
  protected commandService = inject(CommandService);
  protected serviceDetailsConnector = inject(CheckoutServiceDetailsConnector);
  protected eventService = inject(EventService);
  protected checkoutQueryFacade = inject(CheckoutQueryFacade);

  protected setServiceScheduleSlotCommand: Command<string, unknown> =
    this.commandService.create<string>(
      (scheduledAt) =>
        this.checkoutPreconditions().pipe(
          switchMap(([userId, cartId]) =>
            this.serviceDetailsConnector
              .setServiceScheduleSlot(userId, cartId, {
                scheduledAt,
              })
              .pipe(
                tap(() =>
                  this.eventService.dispatch(
                    {
                      userId,
                      cartId,
                      scheduledAt,
                    },
                    CheckoutServiceDetailsSetEvent
                  )
                )
              )
          )
        ),
      {
        strategy: CommandStrategy.CancelPrevious,
      }
    );

  protected checkoutPreconditions(): Observable<[string, string]> {
    return combineLatest([
      this.userIdService.takeUserId(),
      this.activeCartFacade.takeActiveCartId(),
      this.activeCartFacade.isGuestCart(),
    ]).pipe(
      take(1),
      map(([userId, cartId, isGuestCart]) => {
        if (
          !userId ||
          !cartId ||
          (userId === OCC_USER_ID_ANONYMOUS && !isGuestCart)
        ) {
          throw new Error('Checkout conditions not met');
        }
        return [userId, cartId];
      })
    );
  }

  setServiceScheduleSlot(scheduledAt: string): Observable<unknown> {
    return this.setServiceScheduleSlotCommand.execute(scheduledAt);
  }

  getServiceScheduleSlotState(): Observable<
    QueryState<ServiceDetails | undefined>
  > {
    return this.checkoutQueryFacade.getCheckoutDetailsState().pipe(
      map((state) => ({
        ...state,
        data: state.data?.scheduledAt,
      }))
    );
  }
}
