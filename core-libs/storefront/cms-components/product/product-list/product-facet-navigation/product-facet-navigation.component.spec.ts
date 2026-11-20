import { Component, DebugElement, output, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { IconComponent } from '@spartacus/storefront';
import { of } from 'rxjs';
import { BreakpointService } from '../../../../layout/breakpoint/breakpoint.service';
import { ICON_TYPE } from '../../../misc/icon/icon.model';
import { ActiveFacetsComponent } from './active-facets';
import { FacetListComponent } from './facet-list';
import { ProductFacetNavigationComponent } from './product-facet-navigation.component';

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  readonly type = input<ICON_TYPE>();
}
@Component({
  selector: 'cx-active-facets',
  template: '',
})
class MockActiveFacetsComponent {
  readonly facetList = input(undefined);
}
@Component({
  selector: 'cx-facet-list',
  template: '',
})
class MockFacetListComponent {
  readonly isDialog = input(undefined);
  readonly closeDialog = output();
}

class MockBreakpointService {
  get breakpoint$() {
    return of({});
  }
}

describe('ProductFacetNavigationComponent', () => {
  let component: ProductFacetNavigationComponent;
  let fixture: ComponentFixture<ProductFacetNavigationComponent>;
  let element: DebugElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        {
          provide: BreakpointService,
          useClass: MockBreakpointService,
        },
      ],
    })
      .overrideComponent(ProductFacetNavigationComponent, {
        add: {
          imports: [
            MockActiveFacetsComponent,
            MockFacetListComponent,
            MockCxIconComponent,
          ],
        },
        remove: {
          imports: [ActiveFacetsComponent, FacetListComponent, IconComponent],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFacetNavigationComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('mobile', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      // Simulate mobile: trigger button is visible so hasTrigger returns true
      // (jsdom offsetParent is always null so we must mock this explicitly)
      vi.spyOn(component, 'hasTrigger', 'get').mockReturnValue(true);
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should not have facet list when trigger button is visible', async () => {
      fixture.detectChanges();
      await vi.advanceTimersByTimeAsync(0);
      fixture.detectChanges();

      const facetList = element.query(By.css('cx-facet-list'));
      expect(facetList).toBeNull();
    });

    it('should invoke launch when trigger button is clicked', () => {
      vi.spyOn(component, 'launch');
      fixture.detectChanges();
      const button: HTMLElement = element.query(By.css('button')).nativeElement;
      button.click();
      expect(component.launch).toHaveBeenCalled();
    });

    it('should have facet list after trigger button is clicked', async () => {
      fixture.detectChanges();
      const button: HTMLElement = element.query(By.css('button')).nativeElement;
      button.click();

      await vi.advanceTimersByTimeAsync(0);
      fixture.detectChanges();

      const facetList = element.query(By.css('cx-facet-list')).nativeElement;
      expect(facetList).toBeTruthy();
    });

    it('should invoke close when closeList is emitted', async () => {
      vi.spyOn(component, 'close');
      fixture.detectChanges();
      const button: HTMLElement = element.query(By.css('button')).nativeElement;
      button.click();

      await vi.advanceTimersByTimeAsync(0);
      fixture.detectChanges();

      const facetList = element.query(By.css('cx-facet-list')).nativeElement;
      facetList.dispatchEvent(new Event('closeList'));

      expect(component.close).toHaveBeenCalled();
    });

    it('should keep the dialog open when launched before the initial close delay expires', async () => {
      fixture.detectChanges();
      await vi.advanceTimersByTimeAsync(0);

      component.launch();
      await vi.advanceTimersByTimeAsync(0);
      fixture.detectChanges();
      expect(element.query(By.css('cx-facet-list'))).not.toBeNull();

      await vi.advanceTimersByTimeAsync(300);
      fixture.detectChanges();
      expect(element.query(By.css('cx-facet-list'))).not.toBeNull();
    });

    it('should cancel a pending close when the dialog is reopened', async () => {
      fixture.detectChanges();
      await vi.advanceTimersByTimeAsync(300);
      component.launch();
      await vi.advanceTimersByTimeAsync(0);
      fixture.detectChanges();

      component.close();
      await vi.advanceTimersByTimeAsync(100);
      fixture.detectChanges();
      expect(element.query(By.css('cx-facet-list'))).not.toBeNull();

      component.launch();
      await vi.advanceTimersByTimeAsync(300);
      fixture.detectChanges();
      expect(element.query(By.css('cx-facet-list'))).not.toBeNull();

      component.close();
      await vi.advanceTimersByTimeAsync(300);
      fixture.detectChanges();
      expect(element.query(By.css('cx-facet-list'))).toBeNull();
    });
  });

  describe('desktop', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      // Simulate desktop: trigger button is hidden so hasTrigger returns false
      // (jsdom offsetParent is always null so we must mock this explicitly)
      vi.spyOn(component, 'hasTrigger', 'get').mockReturnValue(false);
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should have facet list when trigger button is hidden', async () => {
      fixture.detectChanges();

      const button: HTMLElement = element.query(By.css('button')).nativeElement;
      button.style.display = 'none';

      await vi.advanceTimersByTimeAsync(0);
      fixture.detectChanges();

      const facetList = element.query(By.css('cx-facet-list')).nativeElement;
      expect(facetList).toBeTruthy();
    });
  });
});
