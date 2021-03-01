import { CommonModule } from '@angular/common';
import { I18nTestingModule } from '@spartacus/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedCartFormComponent } from './saved-cart-form.component';
import { ModalService } from '@spartacus/storefront';

class MockModalService {
  dismissActiveModal(): void {}
}

describe('SavedCartFormComponent', () => {
  let component: SavedCartFormComponent;
  let fixture: ComponentFixture<SavedCartFormComponent>;

  let mockModalService: MockModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, I18nTestingModule],
      declarations: [SavedCartFormComponent],
      providers: [
        {
          provide: ModalService,
          useClass: MockModalService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedCartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dismiss modal on dismissModal call', () => {
    spyOn(mockModalService, 'dismissActiveModal').and.callThrough();

    component.dismissModal();

    expect(mockModalService.dismissActiveModal).toHaveBeenCalled();
  });
});
