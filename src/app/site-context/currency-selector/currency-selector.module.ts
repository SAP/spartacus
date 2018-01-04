import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CurrencySelectorComponent } from "./currency-selector.component";

import { MaterialModule } from "../../material.module";
import { SharedModule } from "../shared/shared.module";
import { ConfigService } from "../config.service";

@NgModule({
  imports: [CommonModule, SharedModule.forRoot(ConfigService), MaterialModule],
  declarations: [CurrencySelectorComponent],
  exports: [CurrencySelectorComponent],
  providers: [ConfigService]
})
export class CurrencySelectorModule {}
