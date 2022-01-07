import { NgModule } from '@angular/core';
import { DebounceTimePipe } from './debounce-time.pipe';

@NgModule({
  declarations: [DebounceTimePipe],
  exports: [DebounceTimePipe],
})
export class DebounceTimeModule {}
