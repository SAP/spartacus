import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Budget } from '@spartacus/organization/administration/core';

import { EditEnableMessageComponent } from './edit-enable-message.component';

describe('EditEnableMessageComponent', () => {
  let component: EditEnableMessageComponent<Budget>;
  let fixture: ComponentFixture<EditEnableMessageComponent<Budget>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditEnableMessageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEnableMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
