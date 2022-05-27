import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { IconTestingModule, LaunchDialogService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { PickupDeliveryOptionDialogComponent } from './pickup-delivery-option-dialog.component';

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  get data$(): Observable<any> {
    return of({});
  }

  closeDialog(_reason: string): void {}
}

describe('PickupDeliveryOptionDialogComponent', () => {
  let component: PickupDeliveryOptionDialogComponent;
  let fixture: ComponentFixture<PickupDeliveryOptionDialogComponent>;
  let launchDialogService: LaunchDialogService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, IconTestingModule],
      declarations: [PickupDeliveryOptionDialogComponent],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PickupDeliveryOptionDialogComponent);
    component = fixture.componentInstance;
    launchDialogService = TestBed.inject(LaunchDialogService);

    fixture.detectChanges();
  });

  it('should create dialog', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog on close method', () => {
    const mockCloseReason = 'Close Dialog';
    spyOn(launchDialogService, 'closeDialog');
    component.close(mockCloseReason);

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      mockCloseReason
    );
  });
});
