import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { PrototypeComponent } from "./prototype.component";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    PrototypeComponent,
  ],
  exports: [
    PrototypeComponent,
  ],
})
export class PrototypeComponentModule {
}
