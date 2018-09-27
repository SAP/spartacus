import { NgModule } from '@angular/core';

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
  MatSlideToggleModule,
  MatDialogModule
} from '@angular/material';

const materialModules = [
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
  MatSlideToggleModule,
  MatDialogModule
];
@NgModule({
  imports: [...materialModules],
  exports: [...materialModules]
})
export class MaterialModule {}
