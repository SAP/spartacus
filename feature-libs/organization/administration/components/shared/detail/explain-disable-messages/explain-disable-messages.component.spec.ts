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
      const element = fixture.debugElement.queryAll(
        By.css('section > ul > li')
      )[0].nativeElement;
      expect(element.innerText).toEqual('orgUnit.messages.disabledEdit');
    });

    it('should not display disabledEdit message when edit button is enabled', () => {
      current$.next({ active: true });
      fixture.detectChanges();
      const element = fixture.debugElement.queryAll(
        By.css('section > ul > li')
      )[0].nativeElement;
      expect(element.innerText).not.toEqual('orgUnit.messages.disabledEdit');
    });

    it('should display disabledEdit and disabledEnable messages when enable is disabled', () => {
      current$.next({ active: false, orgUnit: { active: false } });
      fixture.detectChanges();
      const element = fixture.debugElement.queryAll(
        By.css('section > ul > li')
      );
      expect(element[0].nativeElement.innerText).toEqual(
        'orgUnit.messages.disabledEdit'
      );
      expect(element[1].nativeElement.innerText).toEqual(
        'orgUnit.messages.disabledEnable'
      );
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
      const element = fixture.debugElement.queryAll(
        By.css('section > ul > li')
      )[0].nativeElement;
      expect(element.innerText).toEqual('myRoot.messages.disabledEnable');
    });

    it('should display disabledDisable message if it is a root unit', () => {
      const mockItem = {
        uid: 'test',
        name: 'test',
        parentOrgUnit: 'test',
      };
      current$.next(mockItem as any);
      fixture.detectChanges();
      const element = fixture.debugElement.queryAll(
        By.css('section > ul > li')
      )[1].nativeElement;
      expect(element.innerText).toEqual('orgUnit.messages.disabledDisable');
    });

    it('should not display disabledEnable message if it is a root unit', () => {
      current$.next({
        uid: 'test',
        name: 'test',
        parentOrgUnit: 'test',
      });
      fixture.detectChanges();
      const element = fixture.debugElement.queryAll(
        By.css('section > ul > li')
      )[0].nativeElement;
      expect(element.innerText).not.toEqual('orgUnit.messages.disabledEnable');
    });
  });

  describe('displayMessageConfig', () => {
    const displayMessageConfigTrue = [
      {
        key: 'disabledEdit',
        currentValue: { active: false, orgUnit: { active: true } },
        displayMessageConfig: { disabledEdit: true },
        expectedValue: ['orgUnit.messages.disabledEdit'],
      },
      {
        key: 'disabledEnable',
        currentValue: { orgUnit: { active: false } },
        displayMessageConfig: { disabledEnable: true },
        expectedValue: [
          'orgUnit.messages.disabledEdit',
          'orgUnit.messages.disabledEnable',
        ],
      },
      {
        key: 'disabledCreate',
        currentValue: { active: false },
        displayMessageConfig: {
          disabledEdit: false,
          disabledEnable: false,
          disabledCreate: true,
        },
        expectedValue: ['orgUnit.messages.disabledCreate'],
      },
      {
        key: 'disabledDisable',
        currentValue: {
          uid: 'test',
          name: 'test',
          parentOrgUnit: 'test',
          active: true,
        },
        displayMessageConfig: {
          disabledDisable: true,
        },
        expectedValue: ['orgUnit.messages.disabledDisable'],
      },
    ];
    const displayMessageConfigFalse = [
      {
        key: 'disabledEdit',
        currentValue: { active: true, orgUnit: { active: true } },
        displayMessageConfig: { disabledEdit: true },
      },
      {
        key: 'disabledEnable',
        currentValue: { active: true, orgUnit: { active: true } },
        displayMessageConfig: { disabledEnable: true },
      },
      {
        key: 'disabledCreate',
        currentValue: { active: true },
        displayMessageConfig: {
          disabledEdit: false,
          disabledEnable: false,
          disabledCreate: true,
        },
      },
      {
        key: 'disabledDisable',
        currentValue: { active: true, orgUnit: { active: true } },
        displayMessageConfig: {
          disabledDisable: true,
        },
      },
    ];

    displayMessageConfigTrue.forEach((action) => {
      it(`should display ${action.key} message when ${action.key} is enabled`, () => {
        component.displayMessageConfig = action.displayMessageConfig;
        component.ngOnInit();
        current$.next(action.currentValue);
        fixture.detectChanges();
        const values = fixture.debugElement
          .queryAll(By.css('section > ul > li'))
          .map((el) => el.nativeNode.innerText);
        expect(values).toEqual(action.expectedValue);
      });
    });

    displayMessageConfigFalse.forEach((action) => {
      it(`should not display ${action.key} message when ${action.key} is disabled`, () => {
        component.displayMessageConfig = action.displayMessageConfig;
        component.ngOnInit();
        current$.next(action.currentValue);
        fixture.detectChanges();
        const values = fixture.debugElement
          .queryAll(By.css('section > ul > li'))
          .map((el) => el.nativeNode.innerText);
        expect(values).toEqual([]);
      });
    });
  });
});
