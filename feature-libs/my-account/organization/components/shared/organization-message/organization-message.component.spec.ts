import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { OrganizationMessageComponent } from './organization-message.component';
import { MessageService } from './services';

describe('OrganizationMessageComponent', () => {
  let component: OrganizationMessageComponent;
  let fixture: ComponentFixture<OrganizationMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, I18nTestingModule, IconTestingModule],
      declarations: [OrganizationMessageComponent],
      providers: [{ provide: MessageService, useClass: MessageService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
