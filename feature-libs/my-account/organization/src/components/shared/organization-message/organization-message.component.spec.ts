import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import {
  OrganizationMessageComponent,
  OrganizationMessageType,
} from './organization-message.component';

describe('OrganizationSubListComponent', () => {
  let component: OrganizationMessageComponent;
  let fixture: ComponentFixture<OrganizationMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, I18nTestingModule, IconTestingModule],
      declarations: [OrganizationMessageComponent],
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

  it('should call notify on input message?', () => {
    spyOn(component, 'notify');
    component.message = 'msg...';
    expect(component.notify).toHaveBeenCalledWith('msg...');
  });

  describe('prompt', () => {
    it('should show on prompt', () => {
      component.close();
      component.prompt('anything');
      expect(component.hide).toBeFalsy();
    });
    it('should change type to prompt', () => {
      component.prompt('anything');
      expect(component.type).toEqual(OrganizationMessageType.PROMPT);
    });
    it('should emit prompt message', () => {
      component.prompt('prompt...');
      let result;
      component.message$.subscribe((msg) => (result = msg));
      expect(result).toEqual('prompt...');
    });
  });

  describe('notify', () => {
    it('should show on notify', () => {
      component.close();
      component.notify('anything');
      expect(component.hide).toBeFalsy();
    });
    it('should change type to notify', () => {
      component.notify('anything');
      expect(component.type).toEqual(OrganizationMessageType.NOTIFY);
    });
    it('should emit notify message', () => {
      component.notify('notify...');
      let result;
      component.message$.subscribe((msg) => (result = msg));
      expect(result).toEqual('notify...');
    });
  });

  describe('close', () => {
    it('should hide on close', () => {
      component.close();
      expect(component.hide).toBeTruthy();
    });

    it('should keep type on close', () => {
      component.type = OrganizationMessageType.NOTIFY;
      component.close();
      expect(component.type).toEqual(OrganizationMessageType.NOTIFY);
    });

    it('should keep message on close', () => {
      component.message$.next('test');
      component.close();
      let result;
      component.message$.subscribe((msg) => (result = msg));
      expect(result).toEqual('test');
    });
  });

  it('should emit confirmation', () => {
    spyOn(component.confirm, 'emit');
    component.handleConfirm();
    expect(component.confirm.emit).toHaveBeenCalledWith(true);
  });
});
