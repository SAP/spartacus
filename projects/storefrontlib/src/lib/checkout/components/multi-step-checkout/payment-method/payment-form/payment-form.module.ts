import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardModule } from '../../../../../ui/components/card/card.module';

import { PaymentFormComponent } from './payment-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbModule.forRoot(),
    CardModule
  ],
  declarations: [PaymentFormComponent],
  entryComponents: [PaymentFormComponent],
  exports: [PaymentFormComponent]
})
export class PaymentFormModule {}
