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
  MatSlideToggleModule
} from '@angular/material';

import { MatDialogModule } from '@angular/material/dialog';

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
    MatSlideToggleModule,
    MatDialogModule
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
    MatSlideToggleModule,
    MatDialogModule
  ]
})
export class MaterialModule {}
