import { Component, Input, Output } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { DialogMode } from '@spartacus/storefront';
import { of } from 'rxjs';
import { BreakpointService } from '../../../../layout/breakpoint/breakpoint.service';
import { ICON_TYPE } from '../../../misc/icon/icon.model';
import { ProductFacetNavigationComponent } from './product-facet-navigation.component';

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}
@Component({
  selector: 'cx-active-facets',
  template: '',
})
class MockActiveFacetsComponent {
  @Input() facetList;
}
@Component({
  selector: 'cx-facet-list',
  template: '',
})
class MockFacetListComponent {
  @Input() dialogMode;
  @Output() closeDialog;
}

class MockBreakpointService {
  get breakpoint$() {
    return of({});
  }
}

// const mockFacetList: FacetList = {
//   facets: [{ name: 'facet-A' }],
//   activeFacets: [{ facetName: 'facet-B' }],
// };

fdescribe('ProductFacetNavigationComponent', () => {
  let component: ProductFacetNavigationComponent;
  let fixture: ComponentFixture<ProductFacetNavigationComponent>;
  // let element: DebugElement;
  let service: BreakpointService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        ProductFacetNavigationComponent,
        MockActiveFacetsComponent,
        MockFacetListComponent,
        MockCxIconComponent,
      ],
      providers: [
        {
          provide: BreakpointService,
          useClass: MockBreakpointService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.inject(BreakpointService);
  });

  describe('All', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ProductFacetNavigationComponent);
      component = fixture.componentInstance;
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    fit('should have inline dialogMode', async(async () => {
      let result;
      // spyOnProperty(component, 'hasTrigger').and.returnValue(false);

      component.dialogMode$
        .subscribe(async (dialogMode) => {
          await fixture.whenStable();
          fixture.detectChanges();
          result = dialogMode;
        })
        .unsubscribe();
      // await fixture.whenStable();

      expect(result).toEqual(DialogMode.POP);
    }));

    xit('should set isOpen to false', () => {
      component.isOpen = true;
      component.ngOnInit();
      component.dialogMode$.subscribe().unsubscribe();
      expect(component.isOpen).toBeFalsy();
    });

    // it('should store the facetList', () => {
    //   component.updateFacetList(mockFacetList);
    //   expect(component.facetList).toEqual(mockFacetList);
    // });
  });

  describe('Mobile', () => {
    beforeEach(() => {
      spyOnProperty(service, 'breakpoint$').and.returnValue(of({}));

      fixture = TestBed.createComponent(ProductFacetNavigationComponent);
      // element = fixture.debugElement;
      component = fixture.componentInstance;
      // fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    // it('should resolve the dialog in POP mode', () => {
    //   let result: DialogMode;
    //   component.dialogMode$.subscribe((mode) => (result = mode)).unsubscribe();
    //   expect(result).toEqual(DialogMode.POP);
    // });

    // it('should return false for isInline()', () => {
    //   expect(component.isInline(DialogMode.POP)).toBeFalsy();
    // });

    // it('should have an activeDialog by default', () => {
    //   expect(component.activeDialog).toBeFalsy();
    // });

    // it('should have an activeDialog if it is toggled', () => {
    //   component.toggleDialog();
    //   expect(component.activeDialog).toBeTruthy();
    // });

    // it('should not have an activeDialog if it is toggled twice', () => {
    //   component.activeDialog = false;
    //   component.toggleDialog();
    //   expect(component.activeDialog).toBeTruthy();
    //   component.toggleDialog();
    //   expect(component.activeDialog).toBeFalsy();
    // });

    // it('should focus the trigger button if activeDialog becomes false', () => {
    //   const trigger = component.dialogTrigger.nativeElement;
    //   spyOn(trigger, 'focus').and.callThrough();

    //   component.activeDialog = true;
    //   component.toggleDialog();

    //   expect(trigger.focus).toHaveBeenCalled();
    // });

    // it('should not focus the trigger button if activeDialog becomes true', () => {
    //   const trigger = component.dialogTrigger.nativeElement;
    //   spyOn(trigger, 'focus').and.callThrough();

    //   component.activeDialog = false;
    //   component.toggleDialog();

    //   expect(trigger.focus).not.toHaveBeenCalled();
    // });

    // describe('UI', () => {
    //   describe('dialogTrigger', () => {
    //     it('should render dialogTrigger button', () => {
    //       expect(component.dialogTrigger.nativeElement).toBeTruthy();
    //     });

    //     it('should not have active class on dialogTrigger', () => {
    //       const triggerElement: HTMLElement =
    //         component.dialogTrigger.nativeElement;
    //       expect(triggerElement.classList).not.toContain('active');
    //     });

    //     it('should have active class on dialogTrigger', () => {
    //       component.facetList = mockFacetList;
    //       fixture.detectChanges();
    //       const triggerElement: HTMLElement =
    //         component.dialogTrigger.nativeElement;
    //       expect(triggerElement.classList).toContain('active');
    //     });
    //   });

    //   describe('dialog', () => {
    //     it('should not render dialog', () => {
    //       fixture.detectChanges();
    //       const dialog = element.query(By.css('cx-facet-dialog'));
    //       expect(dialog).toBeFalsy();
    //     });

    //     it('should render dialog when it is toggled', () => {
    //       component.toggleDialog();
    //       fixture.detectChanges();
    //       const dialog = element.query(By.css('cx-facet-dialog'));
    //       expect(dialog).toBeTruthy();
    //     });

    //     it('should render dialog when there are active facets', () => {
    //       component.facetList = mockFacetList;
    //       fixture.detectChanges();
    //       const dialog = element.query(By.css('cx-facet-dialog'));
    //       expect(dialog).toBeTruthy();
    //     });

    //     it('should not have active class on dialog', () => {
    //       component.facetList = mockFacetList;
    //       fixture.detectChanges();
    //       const dialog = element.query(By.css('cx-facet-dialog')).nativeElement;
    //       expect(dialog.classList).not.toContain('active');
    //     });

    //     it('should have active class on dialog', () => {
    //       component.activeDialog = true;
    //       fixture.detectChanges();
    //       const dialog = element.query(By.css('cx-facet-dialog')).nativeElement;
    //       expect(dialog.classList).toContain('active');
    //     });

    //     it('should call updateFacetList on load', () => {
    //       spyOn(component, 'updateFacetList').and.stub();
    //       component.activeDialog = true;
    //       fixture.detectChanges();
    //       const dialog = element.query(By.css('cx-facet-dialog'));
    //       (dialog.nativeElement as HTMLElement).dispatchEvent(
    //         new Event('load')
    //       );
    //       expect(component.updateFacetList).toHaveBeenCalled();
    //     });

    //     it('should call toggleDialog on close', () => {
    //       spyOn(component, 'toggleDialog').and.stub();
    //       component.activeDialog = true;
    //       fixture.detectChanges();
    //       const dialog = element.query(By.css('cx-facet-dialog'));
    //       (dialog.nativeElement as HTMLElement).dispatchEvent(
    //         new Event('close')
    //       );
    //       expect(component.toggleDialog).toHaveBeenCalled();
    //     });
    //   });
    // });
  });

  // describe('Desktop', () => {
  //   beforeEach(() => {
  //     spyOn(service, 'isDown').and.returnValue(of(false));

  //     fixture = TestBed.createComponent(ProductFacetNavigationComponent);
  //     component = fixture.componentInstance;
  //     fixture.detectChanges();
  //   });

  //   it('should create', () => {
  //     expect(component).toBeTruthy();
  //   });

  //   it('should resolve the dialog in INLINE mode', () => {
  //     let result: DialogMode;
  //     component.dialogMode$.subscribe((mode) => (result = mode)).unsubscribe();
  //     expect(result).toEqual(DialogMode.INLINE);
  //   });

  //   it('should return true for isInline()', () => {
  //     expect(component.isInline(DialogMode.INLINE)).toBeTruthy();
  //   });

  //   describe('UI', () => {
  //     it('should not render dialogTrigger button', () => {
  //       expect(component.dialogTrigger).toBeFalsy();
  //     });
  //   });
  // });
});
