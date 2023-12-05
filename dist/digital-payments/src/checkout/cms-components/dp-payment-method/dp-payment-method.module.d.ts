import { CheckoutPaymentMethodModule as CorePaymentMethodModule } from '@spartacus/checkout/base/components';
import * as i0 from "@angular/core";
import * as i1 from "./dp-payment-method.component";
import * as i2 from "@angular/common";
import * as i3 from "./dp-payment-form/dp-payment-form.module";
import * as i4 from "@angular/router";
import * as i5 from "@spartacus/storefront";
import * as i6 from "@spartacus/core";
import * as i7 from "./dp-payment-callback/dp-payment-callback.module";
export declare class DpPaymentMethodModule extends CorePaymentMethodModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<DpPaymentMethodModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<DpPaymentMethodModule, [typeof i1.DpPaymentMethodComponent], [typeof i2.CommonModule, typeof i3.DpPaymentFormModule, typeof i4.RouterModule, typeof i5.CardModule, typeof i5.SpinnerModule, typeof i6.I18nModule, typeof i7.DpPaymentCallbackModule, typeof i6.ConfigModule], [typeof i1.DpPaymentMethodComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<DpPaymentMethodModule>;
}
