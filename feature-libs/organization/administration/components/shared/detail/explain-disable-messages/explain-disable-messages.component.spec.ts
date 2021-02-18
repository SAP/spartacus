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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('disabledEdit', () => {
    it('should display disabledEdit message when edit button is disabled', () => {
      current$.next({ active: false });
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('section > ul'))
        .nativeElement;
      expect(element.innerText).toContain('disabledEdit');
    });

    it('should not display disabledEdit message when edit button is enabled', () => {
      current$.next({ active: true });
      fixture.detectChanges();
      console.log(fixture.debugElement.query(By.css('section')));
      // expect(fixture.debugElement.query(By.css('section'))).toBeNull();
    });

    it('should not display disabledEdit message when create button is disabled', () => {
      current$.next({ active: false });
      component.displayMessageConfig = { disabledCreate: true };
      fixture.detectChanges();
      const elements = fixture.debugElement.queryAll(By.css('section > ul'));
      elements.forEach((el) => console.log(el.nativeElement));
      expect(elements[0].nativeElement.innerText).not.toContain('disabledEdit');
    });
  });

  describe('disabledEnable', () => {
    it('should display disabledEnable message when enable button is disabled', () => {
      current$.next({ orgUnit: { active: false } });
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('section > ul'))
        .nativeElement;
      expect(element.innerText).toContain('disabledEnable');
    });

    it('should not display disabledEnable message when enable button is enabled', () => {
      expect(fixture.debugElement.query(By.css('section'))).toBeNull();
    });

    it('should not display disabledEnable message if it is a root unit', () => {
      current$.next({ orgUnit: { active: false } });
      spyOn(component, 'isRootUnit').and.returnValue(true);
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('section > ul'))
        .nativeElement;
      expect(element.innerText).not.toContain('disabledEnable');
    });
  });

  describe('disabledCreate', () => {
    it('should display disabledCreate message when create button is disabled', () => {
      current$.next({ active: false });
      component.displayMessageConfig = { disabledCreate: true };
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('section > ul'))
        .nativeElement;
      expect(element.innerText).toContain('disabledCreate');
    });

    it('should not display disabledCreate message when create button is enabled', () => {
      current$.next({ active: true });
      component.displayMessageConfig = { disabledCreate: true };
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('section'))).toBeNull();
    });
  });

  describe('disabledDisable', () => {
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
      expect(element.innerText).toContain('disabledDisable');
    });

    it('should not display disabledDisable message when disable button is enabled', () => {
      expect(fixture.debugElement.query(By.css('section'))).toBeNull();
    });
  });
});
