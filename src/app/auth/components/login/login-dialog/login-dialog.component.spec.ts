import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginDialogComponent } from './../login-dialog/login-dialog.component';
import { MaterialModule } from '../../../../material.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('LoginDialogComponent', () => {
  let component: LoginDialogComponent;
  let fixture: ComponentFixture<LoginDialogComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [MaterialModule, FormsModule, BrowserAnimationsModule],
        declarations: [LoginDialogComponent],
        providers: [
          {
            provide: MatDialogRef
          },
          { provide: MAT_DIALOG_DATA, useValue: {} }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
