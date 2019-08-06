import { NgModule } from '@angular/core';
import { TestOutletTemplateModule } from './test-outlet-template/test-outlet-template.module';
import { TestOutletComponentModule } from './test-outlet-component/test-outlet-component.module';
import { TestOutletSlotModule } from './test-outlet-slot/test-outlet-slot.module';
import { ConfigModule } from '@spartacus/core';
import { testOutletPagesCmsContentConfig } from './test-outlet-cms-page.config';

@NgModule({
  imports: [
    TestOutletTemplateModule,
    TestOutletSlotModule,
    TestOutletComponentModule,
    ConfigModule.withConfigFactory(testOutletPagesCmsContentConfig),
  ],
})
export class TestOutletModule {}
