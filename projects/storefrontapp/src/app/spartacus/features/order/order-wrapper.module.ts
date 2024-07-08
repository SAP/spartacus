import { NgModule, Type } from '@angular/core';
import { OrderModule } from '@spartacus/order';
import { environment } from '../../../../environments/environment';
import { S4ServiceOrderModule } from 'integration-libs/s4-service/order/public_api';


const extensions: Type<any>[] = [];
if (environment.s4Service) {
  extensions.push(S4ServiceOrderModule);
}
@NgModule({
  imports: [OrderModule, ...extensions],
})
export class OrderWrapperModule {}
