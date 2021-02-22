import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { ItemService } from '../../item.service';
import { BaseItem } from '../../organization.model';

import { ExplainDisableMessagesComponent } from './explain-disable-messages.component';

const current$ = new BehaviorSubject({});
class MockItemService {
  current$ = current$.asObservable();
}

describe('ExplainDisableMessagesComponent', () => {
  let component: ExplainDisableMessagesComponent<BaseItem>;
  let fixture: ComponentFixture<ExplainDisableMessagesComponent<BaseItem>>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, I18nTestingModule, IconModule],
      declarations: [ExplainDisableMessagesComponent],
      providers: [
        {
          provide: ItemService,
          useClass: MockItemService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExplainDisableMessagesComponent);
    component = fixture.componentInstance;
    component.i18nRoot = 'orgUnit';
    component.displayMessageConfig = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('default', () => {
    beforeEach(() => {
      component.ngOnInit();
    });
    it('should display disabledEdit message when edit is disabled', () => {
      current$.next({ active: false });
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('section > ul'))
        .nativeElement;
      expect(element.innerText).toContain('orgUnit.messages.disabledEdit');
    });

    it('should not display disabledEdit message when edit button is enabled', () => {
      current$.next({ active: true });
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('section > ul'))
        .nativeElement;
      expect(element.innerText).not.toContain('orgUnit.messages.disabledEdit');
    });

    it('should display disabledEdit and disabledEnable messages when enable is disabled', () => {
      current$.next({ active: false, orgUnit: { active: false } });
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('section > ul'))
        .nativeElement;
      expect(element.innerText).toContain('orgUnit.messages.disabledEdit');
      expect(element.innerText).toContain('orgUnit.messages.disabledEnable');
    });

    it('should not display disabledEdit and disabledEnable messages when enable and edit is enabled', () => {
      current$.next({ active: true, orgUnit: { active: true } });
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('section'))).toBeNull();
    });

    it('should use the i18n root provided from the parent component', () => {
      component.i18nRoot = 'myRoot';
      current$.next({ active: true });
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('section > ul'))
        .nativeElement;
      expect(element.innerText).toContain('myRoot.messages.disabledEnable');
    });

    it('should display disabledDisable message if it is a root unit', () => {
      const mockItem = {
        uid: 'test',
        name: 'test',
        parentOrgUnit: 'test',
      };
      current$.next(mockItem as any);
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('section > ul'))
        .nativeElement;
      expect(element.innerText).toContain('orgUnit.messages.disabledDisable');
    });

    it('should not display disabledEnable message if it is a root unit', () => {
      current$.next({ orgUnit: { active: false } });
      spyOn(component, 'isRootUnit').and.returnValue(true);
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('section > ul'))
        .nativeElement;
      expect(element.innerText).not.toContain(
        'orgUnit.messages.disabledEnable'
      );
    });
  });

  describe('disabledEdit', () => {
    beforeEach(() => {
      component.displayMessageConfig = { disabledEdit: true };
      component.ngOnInit();
    });
    it('should display disabledEdit message when edit button is disabled', () => {
      current$.next({ active: false });
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('section > ul'))
        .nativeElement;
      expect(element.innerText).toContain('orgUnit.messages.disabledEdit');
    });

    it('should not display disabledEdit message when edit button is enabled', () => {
      current$.next({ active: true });
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('section > ul'))
        .nativeElement;
      expect(element.innerText).not.toContain('orgUnit.messages.disabledEdit');
    });
  });

  describe('disabledEnable', () => {
    beforeEach(() => {
      component.displayMessageConfig = { disabledEnable: true };
      component.ngOnInit();
    });
    it('should display disabledEnable message when enable button is disabled', () => {
      current$.next({ orgUnit: { active: false } });
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('section > ul'))
        .nativeElement;
      expect(element.innerText).toContain('orgUnit.messages.disabledEnable');
    });

    it('should not display disabledEnable message when enable button is enabled', () => {
      current$.next({ orgUnit: { active: true } });
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('section > ul'))
        .nativeElement;
      expect(element.innerText).not.toContain(
        'orgUnit.messages.disabledEnable'
      );
    });
  });

  describe('disabledCreate', () => {
    beforeEach(() => {
      component.displayMessageConfig = { disabledCreate: true };
      component.ngOnInit();
    });
    it('should display disabledCreate message when create button is disabled', () => {
      current$.next({ active: false });
      component.displayMessageConfig = {
        disabledCreate: true,
        disabledEdit: false,
      };

      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('section > ul'))
        .nativeElement;
      expect(element.innerText).toContain('orgUnit.messages.disabledCreate');
    });

    it('should not display disabledCreate message when create button is enabled', () => {
      current$.next({ active: true });
      component.displayMessageConfig = { disabledCreate: true };
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('section'))).toBeNull();
    });
  });

  describe('disabledDisable', () => {
    beforeEach(() => {
      component.displayMessageConfig = { disabledDisable: true };
      component.ngOnInit();
    });
    it('should display disabledDisable message when disable button is disabled', () => {
      const mockItem = {
        uid: 'test',
        name: 'test',
        parentOrgUnit: 'test',
      };
      current$.next(mockItem as any);
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('section > ul'))
        .nativeElement;
      expect(element.innerText).toContain('orgUnit.messages.disabledDisable');
    });

    it('should not display disabledDisable message when disable button is enabled', () => {
      current$.next({});
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('section > ul'))
        .nativeElement;
      expect(element.innerText).not.toContain(
        'orgUnit.messages.disabledDisable'
      );
    });
  });
});
