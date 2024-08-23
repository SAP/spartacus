import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import {
  ICON_TYPE,
  KeyboardFocusTestingModule,
  LaunchDialogService,
} from '@spartacus/storefront';
import { ProductImageZoomDialogComponent } from './product-image-zoom-dialog.component';

class MockLaunchDialogService {
  closeDialog() {}
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

@Component({
  selector: 'cx-product-image-zoom-view',
  template: '',
})
class MockProductImageZoomViewComponent {
  @Input() galleryIndex: number;
}

describe('ProductImageZoomDialogComponent', () => {
  let component: ProductImageZoomDialogComponent;
  let fixture: ComponentFixture<ProductImageZoomDialogComponent>;
  let launchDialogService: LaunchDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, KeyboardFocusTestingModule],
      providers: [
        {
          provide: LaunchDialogService,
          useClass: MockLaunchDialogService,
        },
      ],
      declarations: [
        ProductImageZoomDialogComponent,
        MockCxIconComponent,
        MockProductImageZoomViewComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductImageZoomDialogComponent);
    component = fixture.componentInstance;
    launchDialogService = TestBed.inject(LaunchDialogService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('close', () => {
    beforeEach(() => {
      spyOn(component, 'close').and.callThrough();
    });

    it('should call close dialog on handleClick', () => {
      const event = new Event('click', {});
      const button = fixture.nativeElement.querySelector('.close');
      button.dispatchEvent(event);

      expect(component.close).toHaveBeenCalledWith('cross click');
    });

    it('should call close dialog on click', () => {
      const button = fixture.nativeElement.querySelector('.close');
      button.click();

      expect(component.close).toHaveBeenCalledWith('cross click');
    });

    it('should call close dialog with the close reason', () => {
      spyOn(launchDialogService, 'closeDialog').and.callThrough();

      component.close('cross clicked');
      expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
        'cross clicked'
      );
    });
    it('should call close dialog without the close reason', () => {
      spyOn(launchDialogService, 'closeDialog').and.callThrough();

      component.close();
      expect(launchDialogService.closeDialog).toHaveBeenCalledWith('');
    });
  });
});
