import { NgModule } from '@angular/core';
import { UnitFormModule } from '../../../form/unit-form.module';
import { ChildUnitCreateComponent } from './child-unit-create.component';

@NgModule({
  imports: [UnitFormModule],
  declarations: [ChildUnitCreateComponent],
})
export class ChildUnitCreateModule {}
