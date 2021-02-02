import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Budget } from '@spartacus/organization/administration/core';

import { ExplainDisableMessagesComponent } from './explain-disable-messages.component';

describe('EditEnableMessageComponent', () => {
  let component: ExplainDisableMessagesComponent<Budget>;
  let fixture: ComponentFixture<ExplainDisableMessagesComponent<Budget>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExplainDisableMessagesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplainDisableMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
