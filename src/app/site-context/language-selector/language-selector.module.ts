import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LanguageSelectorComponent } from "./language-selector.component";

import { MaterialModule } from "../../material.module";
import { SharedModule } from "../shared/shared.module";
import { ConfigService } from "../config.service";

@NgModule({
  imports: [CommonModule, SharedModule.forRoot(ConfigService), MaterialModule],
  declarations: [LanguageSelectorComponent],
  exports: [LanguageSelectorComponent]
})
export class LanguageSelectorModule {}
