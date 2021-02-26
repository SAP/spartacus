import { CommonModule } from '@angular/common';
import { I18nTestingModule } from '@spartacus/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AddToSavedCartComponent } from './add-to-saved-cart.component';
import { ModalService } from '@spartacus/storefront';

class MockModalService {
  open(): void {}
}

describe('AddToSavedCartComponent', () => {
  let component: AddToSavedCartComponent;
  let fixture: ComponentFixture<AddToSavedCartComponent>;
  let mockModalService: MockModalService;

  beforeEach(() => {
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CommonModule, I18nTestingModule],
        declarations: [AddToSavedCartComponent],
        providers: [
          {
            provide: ModalService,
            useClass: MockModalService,
          },
        ],
      }).compileComponents();
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToSavedCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal on saveCartForLater call', () => {
    spyOn(mockModalService, 'open').and.callThrough();

    component.saveCartForLater();

    expect(mockModalService.open).toHaveBeenCalled();
  });
});
