import { NgModule } from '@angular/core';
import { ConfigModule } from '@spartacus/core';
import { testOutletPagesCmsContentConfig } from './test-outlet-cms-page.config';
import { TestOutletComponentModule } from './test-outlet-component/test-outlet-component.module';
import { TestOutletSlotModule } from './test-outlet-slot/test-outlet-slot.module';
import { TestOutletTemplateModule } from './test-outlet-template/test-outlet-template.module';

@NgModule({
  imports: [
    TestOutletTemplateModule,
    TestOutletSlotModule,
    TestOutletComponentModule,
    ConfigModule.withConfigFactory(testOutletPagesCmsContentConfig),
  ],
})
export class TestOutletModule {}
