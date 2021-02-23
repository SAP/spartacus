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
      current$.next({ orgUnit: { active: false } });
      spyOn(component, 'isRootUnit').and.returnValue(true);
      fixture.detectChanges();
      const element = fixture.debugElement.queryAll(
        By.css('section > ul > li')
      )[1].nativeElement;
      expect(element.innerText).not.toContain(
        'orgUnit.messages.disabledEnable'
      );
    });
  });

  describe('displayMessageConfig', () => {
    const displayMessageConfigTrue = [
      { disabledEdit: [{ active: false }, { disabledEdit: true }] },
      {
        disabledEnable: [
          { orgUnit: { active: false } },
          { disabledEnable: true },
        ],
      },
      {
        disabledCreate: [
          { active: false },
          {
            disabledCreate: true,
          },
        ],
      },
      {
        disabledDisable: [
          {
            uid: 'test',
            name: 'test',
            parentOrgUnit: 'test',
          },
          { disabledDisable: true },
        ],
      },
    ];

    const displayMessageConfigFalse = [
      { disabledEdit: [{ active: true }, { disabledEdit: true }] },
      {
        disabledEnable: [
          { orgUnit: { active: true } },
          { disabledEnable: true },
        ],
      },
      {
        disabledCreate: [
          { active: true },
          {
            disabledCreate: true,
          },
        ],
      },
      { disabledDisable: [{}, { disabledDisable: true }] },
    ];

    displayMessageConfigTrue.forEach((action) => {
      const key = Object.keys(action)[0];
      const value = Object.values(action)[0];
      it(`should display ${key} message when ${key} is disabled`, () => {
        component.displayMessageConfig = value[1];
        component.ngOnInit();
        current$.next(value[0]);
        fixture.detectChanges();
        const element = fixture.debugElement.query(By.css('section > ul'))
          .nativeElement;
        expect(element.innerText).toContain(`orgUnit.messages.${key}`);
      });
    });

    displayMessageConfigFalse.forEach((action) => {
      const key = Object.keys(action)[0];
      const value = Object.values(action)[0];
      it(`should not display ${key} message when ${key} is disabled`, () => {
        component.displayMessageConfig = value[1];
        component.ngOnInit();
        current$.next(value[0]);
        fixture.detectChanges();
        const element = fixture.debugElement.query(By.css('section > ul'))
          .nativeElement;
        expect(element.innerText).not.toContain(`orgUnit.messages.${key}`);
      });
    });
  });
});
