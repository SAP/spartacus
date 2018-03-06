import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialModule } from '../../../material.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BannerModule } from '../../banner/banner.module';
import { CartDialogComponent } from './cart-dialog.component';

describe('CartDialogComponent', () => {
  let component: CartDialogComponent;
  let fixture: ComponentFixture<CartDialogComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MaterialModule,
          FormsModule,
          BrowserAnimationsModule,
          RouterModule,
          BannerModule
        ],
        declarations: [CartDialogComponent],
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
    fixture = TestBed.createComponent(CartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
