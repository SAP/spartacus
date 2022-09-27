import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { CustomerTicketingDialogComponent } from './customer-ticketing-dialog.component';

@Component({
  template: '',
})
class DialogComponent extends CustomerTicketingDialogComponent {}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog(_reason: string): void {}
}

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

describe('CustomerTicketingDialogComponent', () => {
  let component: CustomerTicketingDialogComponent;
  let fixture: ComponentFixture<CustomerTicketingDialogComponent>;
  let launchDialogService: LaunchDialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [DialogComponent],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    }).compileComponents();

    launchDialogService = TestBed.inject(LaunchDialogService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
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
