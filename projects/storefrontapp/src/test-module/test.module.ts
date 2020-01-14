import { NgModule } from '@angular/core';
import { TestEnablerModule } from './test-enabler.module';
import { TestOutletModule } from './test-outlets/test-outlet.module';

@NgModule({
  imports: [TestEnablerModule, TestOutletModule],
})
export class TestModule {}
