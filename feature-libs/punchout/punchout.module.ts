import { NgModule } from '@angular/core';
import { PunchoutComponentsModule } from '@spartacus/punchout/components';
import { PunchoutCoreModule } from '@spartacus/punchout/core';
import { PunchoutOccModule } from '@spartacus/punchout/occ';

@NgModule({
  imports: [PunchoutCoreModule, PunchoutOccModule, PunchoutComponentsModule],
})
export class PunchoutModule {}
