import { NgModule } from "@angular/core";

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatCheckboxModule,
  MatListModule,
  MatAutocompleteModule,
  MatChipsModule,
  MatSelectModule,
  MatProgressBarModule,
  MatTabsModule,
  MatSidenavModule,
  MatGridListModule,
  MatSlideToggleModule
} from "@angular/material";

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSelectModule,
    MatProgressBarModule,
    MatTabsModule,
    MatSidenavModule,
    MatGridListModule,
    MatSlideToggleModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSelectModule,
    MatProgressBarModule,
    MatTabsModule,
    MatSidenavModule,
    MatGridListModule,
    MatSlideToggleModule
  ]
})
export class MaterialModule {}
