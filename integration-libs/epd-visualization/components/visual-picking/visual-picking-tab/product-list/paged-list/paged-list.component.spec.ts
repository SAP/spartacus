import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ICON_TYPE } from '@spartacus/storefront';
import { of } from 'rxjs';
import { PagedListComponent } from './paged-list.component';

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

@Component({
  template: `
    <ng-template #itemTemplate>
      <div id="templateEl"></div>
    </ng-template>
  `,
})
class MockTemplateComponent {
  @ViewChild('itemTemplate') template: TemplateRef<any>;
}

@Component({
  template: `
    <ng-template #headerTemplate>
      <div id="headerTemplateEl"></div>
    </ng-template>
  `,
})
class MockHeaderTemplateComponent {
  @ViewChild('headerTemplate') template: TemplateRef<any>;
}

describe('PagedList Component', () => {
  let component: PagedListComponent;
  let fixture: ComponentFixture<PagedListComponent>;

  let templateFixture: ComponentFixture<MockTemplateComponent>;
  let template: any;
  let headerTemplateFixture: ComponentFixture<MockHeaderTemplateComponent>;
  let headerTemplate: any;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [
          PagedListComponent,
          MockCxIconComponent,
          MockHeaderTemplateComponent,
          MockTemplateComponent,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PagedListComponent);
    component = fixture.componentInstance;

    headerTemplateFixture = TestBed.createComponent(
      MockHeaderTemplateComponent
    );
    headerTemplateFixture.detectChanges();
    headerTemplate = headerTemplateFixture.componentInstance.template;

    templateFixture = TestBed.createComponent(MockTemplateComponent);
    templateFixture.detectChanges();
    template = templateFixture.componentInstance.template;
  });

  describe('component tests', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should log an error when there is no header template given', () => {
      spyOn(console, 'error');
      component.template = template;
      component.ngOnInit();
      expect(console.error).toHaveBeenCalledWith(
        'No template reference provided to render the header for the `cx-epd-visualization-paged-list`'
      );
    });

    it('should log an error when there is no template given', () => {
      spyOn(console, 'error');
      component.headerTemplate = headerTemplate;
      component.ngOnInit();
      expect(console.error).toHaveBeenCalledWith(
        'No template reference provided to render the items for the `cx-epd-visualization-paged-list`'
      );
    });

    it('should default to 10 items per slide', () => {
      component.headerTemplate = headerTemplate;
      component.template = template;
      component.ngOnInit();

      expect(component.itemsPerSlide).toEqual(10);
    });

    it('should default to first activeSlideStart', () => {
      component.headerTemplate = headerTemplate;
      component.template = template;
      component.ngOnInit();
      expect(component.activeSlideStartIndex).toEqual(0);
    });

    it('should default hideIndicators to false', () => {
      component.headerTemplate = headerTemplate;
      component.template = template;
      expect(component.hideIndicators).toEqual(false);
    });

    it('indicatorIcon should default to "CIRCLE"', () => {
      component.headerTemplate = headerTemplate;
      component.template = template;
      component.ngOnInit();
      component.ngOnInit();
      expect(component.indicatorIcon).toEqual('CIRCLE');
    });

    it('indicatorIcon should default to "CARET_LEFT"', () => {
      component.headerTemplate = headerTemplate;
      component.template = template;
      component.ngOnInit();
      expect(component.previousIcon).toEqual('CARET_LEFT');
    });

    it('indicatorIcon should default to "CARET_RIGHT"', () => {
      component.headerTemplate = headerTemplate;
      component.template = template;
      component.ngOnInit();
      expect(component.nextIcon).toEqual('CARET_RIGHT');
    });
  });

  describe('(UI tests)', () => {
    beforeEach(() => {
      component.headerTemplate = headerTemplate;
      component.template = template;
    });
    describe('list title', () => {
      beforeEach(() => {
        component.itemsPerSlide = 1;
        component.items = [of()];
      });

      it('should have h3 with title', () => {
        component.title = 'test list with title';
        component.ngOnInit();
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('h3'));
        expect(el.nativeElement).toBeTruthy();

        expect((<HTMLElement>el.nativeElement).innerText).toEqual(
          'test list with title'
        );
      });

      it('should not have a h3', () => {
        component.ngOnInit();
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('h3'));
        expect(el).toBeNull();
      });
    });

    describe('list buttons', () => {
      beforeEach(() => {
        component.itemsPerSlide = 4;
        component.items = [of(), of(), of(), of(), of()];
        component.ngOnInit();
        fixture.detectChanges();
      });

      it('should have previous button', () => {
        const el = fixture.debugElement.query(By.css('button.previous'));
        expect(el.nativeElement).toBeTruthy();
      });

      it('should have next button', () => {
        const el = fixture.debugElement.query(By.css('button.next'));
        expect(el.nativeElement).toBeTruthy();
      });

      it('should have disabled previous button on slide 1', () => {
        const el = fixture.debugElement.query(
          By.css('button.previous[disabled]')
        );
        expect(el.nativeElement).toBeTruthy();
      });

      it('should have enabled next button on slide 1', () => {
        const el = fixture.debugElement.query(By.css('button.next[disabled]'));
        expect(el).toBeNull();
      });

      it('should have disabled state after clicking on next button', () => {
        const el = fixture.debugElement.query(By.css('button.next'));
        (<HTMLElement>el.nativeElement).click();
        fixture.detectChanges();
        expect(el.nativeElement.disabled).toBe(true);
      });

      it('should enabled previous button after clicking on next button', () => {
        const prevButton = fixture.debugElement.query(
          By.css('button.previous')
        );
        expect(prevButton.nativeElement.disabled).toBe(true);

        const nextButton = fixture.debugElement.query(By.css('button.next'));
        (<HTMLElement>nextButton.nativeElement).click();

        fixture.detectChanges();
        expect(prevButton.nativeElement.disabled).toBe(false);
      });

      it('should toggle disabled state of previous/next buttons after navigating to next slide', () => {
        const prevButton = fixture.debugElement.query(
          By.css('button.previous')
        );
        const nextButton = fixture.debugElement.query(By.css('button.next'));
        (<HTMLElement>nextButton.nativeElement).click();

        fixture.detectChanges();
        expect(prevButton.nativeElement.disabled).toBe(false);
        expect(nextButton.nativeElement.disabled).toBe(true);
      });

      it('should have 2 slide indicators', () => {
        const el = fixture.debugElement.queryAll(
          By.css('div.indicators button.slide-indicator')
        );
        expect(el.length).toEqual(2);
      });

      it('should have disabled indicator', () => {
        const el = fixture.debugElement.queryAll(
          By.css('div.indicators button.slide-indicator')
        );
        expect(el[0].nativeElement.disabled).toEqual(true);
      });

      it('should have enabled indicator', () => {
        const el = fixture.debugElement.queryAll(
          By.css('div.indicators button.slide-indicator')
        );
        expect(el[1].nativeElement.disabled).toEqual(false);
      });

      it('should toggle disabled state after navigating with the slide indicators', () => {
        const indicators = fixture.debugElement.queryAll(
          By.css('div.indicators button.slide-indicator')
        );
        expect(indicators[0].nativeElement.disabled).toBe(true);
        expect(indicators[1].nativeElement.disabled).toBe(false);

        indicators[1].nativeElement.click();

        fixture.detectChanges();

        expect(indicators[0].nativeElement.disabled).toBe(false);
        expect(indicators[1].nativeElement.disabled).toBe(true);
      });
    });

    describe('list with 5 items divided by 2 slides', () => {
      beforeEach(() => {
        component.itemsPerSlide = 4;
        component.items = [of(), of(), of(), of(), of()];
        component.ngOnInit();
        fixture.detectChanges();
      });

      it('should have previous button', () => {
        const el = fixture.debugElement.query(By.css('button.previous'));
        expect(el.nativeElement).toBeTruthy();
      });

      it('should have next button', () => {
        const el = fixture.debugElement.query(By.css('button.next'));
        expect(el.nativeElement).toBeTruthy();
      });

      it('should have 2 indicators', () => {
        const el = fixture.debugElement.queryAll(
          By.css('div.indicators button.slide-indicator')
        );
        expect(el.length).toEqual(2);
      });
    });

    describe('list with 7 items divided by 3 slides', () => {
      beforeEach(() => {
        component.itemsPerSlide = 3;
        component.title = 'test list with title';
        component.items = [of(), of(), of(), of(), of(), of(), of()];
        component.ngOnInit();
        fixture.detectChanges();
      });

      it('should have previous button', () => {
        const el = fixture.debugElement.query(By.css('button.previous'));
        expect(el.nativeElement).toBeTruthy();
      });

      it('should have next button', () => {
        const el = fixture.debugElement.query(By.css('button.next'));
        expect(el.nativeElement).toBeTruthy();
      });

      it('should have 3 slide indicators', () => {
        const el = fixture.debugElement.queryAll(
          By.css('div.indicators button.slide-indicator')
        );
        expect(el.length).toEqual(3);
      });
    });

    describe('list with 3 items divided by 1 slide', () => {
      beforeEach(() => {
        component.itemsPerSlide = 3;
        component.title = 'test list with title';
        component.items = [of(), of(), of()];
        component.ngOnInit();
        fixture.detectChanges();
      });

      it('should not have a previous button', () => {
        const el = fixture.debugElement.query(By.css('button.previous'));
        expect(el).toBeNull();
      });

      it('should not have a next button', () => {
        const el = fixture.debugElement.query(By.css('button.next'));
        expect(el).toBeNull();
      });

      it('should have no slide indicators ', () => {
        const el = fixture.debugElement.queryAll(
          By.css('div.indicators button.slide-indicator')
        );
        expect(el.length).toEqual(0);
      });
    });

    describe('empty list', () => {
      beforeEach(() => {
        component.itemsPerSlide = 1;
        component.items = [];
      });

      it('should not render the list', () => {
        component.ngOnInit();
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('div.list-panel'));
        expect(el).toBeNull();
      });
    });
  });
});
