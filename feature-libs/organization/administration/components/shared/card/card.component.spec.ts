import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  CxDatePipe,
  FeatureDirective,
  GlobalMessageService,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
} from '@spartacus/core';
import {
  IconComponent,
  PopoverModule,
  SplitViewService,
} from '@spartacus/storefront';
import { IconTestingModule } from 'projects/storefrontlib/cms-components/misc/icon/testing/icon-testing.module';
import { ViewComponent } from 'projects/storefrontlib/shared/components/split-view/view/view.component';
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';
import { of } from 'rxjs';
import { ItemService } from '../item.service';
import { MessageComponent } from '../message/message.component';
import { MessageTestingModule } from '../message/message.testing.module';
import { CardComponent } from './card.component';
import createSpy = jasmine.createSpy;

const mockItem = { foo: 'bar' };

class MockItemService {
  key$ = of('key');
  current$ = of(mockItem);
  launchDetails = createSpy('launchDetails');
}

class MockGlobalMessageService {
  add() {}
}

describe('CardComponent', () => {
  let component: CardComponent<any>;
  let fixture: ComponentFixture<CardComponent<any>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        // SplitViewTestingModule,
        PopoverModule,
        CardComponent,
        ViewComponent,
        I18nTestingModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        {
          provide: ItemService,
          useClass: MockItemService,
        },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        SplitViewService,
      ],
    })
      .overrideComponent(CardComponent, {
        remove: {
          imports: [
            TranslatePipe,
            CxDatePipe,
            FeatureDirective,
            IconComponent,
            MessageComponent,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockFeatureDirective,
            IconTestingModule,
            MessageTestingModule,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.i18nRoot = 'organization.budget';
    component.showHint = true;
    // no change detection here because angular will not detect changes
    // when inputs changed directly.
    // See https://github.com/angular/angular/issues/12313
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should resolve current item', () => {
    let result;
    component.item$.subscribe((item) => (result = item)).unsubscribe();
    expect(result).toEqual(mockItem);
  });

  describe('UI', () => {
    describe('default inputs', () => {
      beforeEach(() => {
        fixture.detectChanges();
      });
      it('should have localized h3 title', () => {
        const el: HTMLElement = fixture.debugElement.query(
          By.css('.title h3')
        ).nativeElement;
        expect(el.innerText).toContain('organization.budget.title');
      });

      it('should have localized h4 subtitle', () => {
        const el: HTMLElement = fixture.debugElement.query(
          By.css('.title h4')
        ).nativeElement;
        expect(el.innerText).toContain('organization.budget.subtitle');
      });

      it('should have back button by default', () => {
        const el: HTMLElement = fixture.debugElement.query(
          By.css('button.close')
        ).nativeElement;
        expect(el).toBeDefined();
      });
    });

    describe('custom inputs', () => {
      it('should not have back button', () => {
        component.previous = false;
        fixture.detectChanges();
        const el = fixture.debugElement.query(By.css('button.close'));
        expect(el).toBeFalsy();
      });

      it('should have back button with localized text', () => {
        component.previous = 'organization.assign';
        fixture.detectChanges();
        const el: HTMLElement = fixture.debugElement.query(
          By.css('button.close')
        ).nativeElement;
        expect(el.innerText).toContain('organization.assign');
      });
    });
  });

  describe('close', () => {
    it('should close the view', () => {
      fixture.detectChanges();
      const ev = {
        stopPropagation: () => {},
      };
      spyOn(component.view, 'toggle');
      component.closeView(ev as MouseEvent);
      expect(component.view.toggle).toHaveBeenCalledWith(true);
    });
  });

  describe('hint', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });
    it('should not show hint by default', () => {
      const el = fixture.debugElement.query(
        By.css('cx-popover > .popover-body > p')
      );
      expect(el).toBeFalsy();
    });

    it('should display hint after click info button', () => {
      const infoButton = fixture.debugElement.query(
        By.css('.title h3 button cx-icon')
      ).parent?.nativeElement;
      infoButton.click();
      const el = fixture.debugElement.query(
        By.css('cx-popover > .popover-body > p')
      );
      expect(el).toBeTruthy();
      expect(el.nativeElement.innerText.trim()).toBe(
        'organization.budget.hint'
      );
    });
  });
});
