import { NgModule } from '@angular/core';
import { HttpErrorHandler } from '@spartacus/core';
import { CartPersistenceModule } from './cart-persistence.module';
import { CartEventModule } from './event/cart-event.module';
import { BadCartRequestHandler } from './http-interceptors/handlers/bad-cart-request.handler';
import { MultiCartStoreModule } from './store/multi-cart-store.module';

@NgModule({
  imports: [
    MultiCartStoreModule,
    CartEventModule,
    CartPersistenceModule.forRoot(),
  ],
  providers: [
    {
      provide: HttpErrorHandler,
      useExisting: BadCartRequestHandler,
      multi: true,
    },
  ],
})
export class CartCoreModule {}
