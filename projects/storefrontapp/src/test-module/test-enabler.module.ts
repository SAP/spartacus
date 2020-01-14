import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { TestModeEnablerService } from './test-enabler.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: testModeFactory,
      deps: [TestModeEnablerService],
      multi: true,
    },
  ],
})
export class TestEnablerModule {}

export function testModeFactory(
  testModeEnablerService: TestModeEnablerService
) {
  const isReady = () => {
    testModeEnablerService.initialize();
  };
  return isReady;
}
