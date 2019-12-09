import { NgModule } from '@angular/core';

import { TranslationService } from '../translation.service';
import { MockDatePipe } from './mock-date.pipe';
import { MockTranslatePipe } from './mock-translate.pipe';
import { MockTranslationService } from './mock-translation.service';

@NgModule({
  declarations: [MockTranslatePipe, MockDatePipe],
  exports: [MockTranslatePipe, MockDatePipe],
  providers: [
    { provide: TranslationService, useClass: MockTranslationService },
  ],
})
export class I18nTestingModule {}
