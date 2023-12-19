import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Address, I18nTestingModule } from '@spartacus/core';
import { FocusDirective, LaunchDialogService } from '../../../../../layout';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { ICON_TYPE } from '../../../../misc/index';
import { SuggestedAddressDialogComponent } from './suggested-addresses-dialog.component';
import createSpy = jasmine.createSpy;

const mockData = {
  enteredAddress: {},
  suggestedAddresses: null,
};

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog = createSpy();

  data$ = of(mockData);
}

describe('SuggestedAddressDialogComponent', () => {
  let component: SuggestedAddressDialogComponent;
  let fixture: ComponentFixture<SuggestedAddressDialogComponent>;

  let launchDialogService: LaunchDialogService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, I18nTestingModule],
        providers: [
          { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        ],
        declarations: [
          SuggestedAddressDialogComponent,
          MockCxIconComponent,
          FocusDirective,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedAddressDialogComponent);
    component = fixture.componentInstance;
    launchDialogService = TestBed.inject(LaunchDialogService);
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should close the modal', () => {
    const reason = 'Cross click';

    component.closeModal(reason);
    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(reason);
  });

  it('should call setSelectedData when component constructed', () => {
    spyOn(component, 'setSelectedAddress');

    component.data$.pipe(take(1)).subscribe((result) => {
      expect(result).toEqual(mockData);
    });
  });

  it('should set suggested address as selected if defined', () => {
    const suggestedAddresses = [{ id: '1' }, { id: '2' }];
    const enteredAddress = { id: '3' };

    component.setSelectedAddress({ suggestedAddresses, enteredAddress });

    expect(component.selectedAddress).toEqual(suggestedAddresses[0]);
  });

  it('should set entered address as selected if suggested addresses are not defined', () => {
    const suggestedAddresses = [] as Address[];
    const enteredAddress = { id: '3' };

    component.setSelectedAddress({ suggestedAddresses, enteredAddress });

    expect(component.selectedAddress).toEqual(enteredAddress);
  });

  it('should closeModal when user click outside', () => {
    const el = fixture.debugElement.nativeElement;
    spyOn(component, 'closeModal');

    el.click();
    expect(component.closeModal).toHaveBeenCalledWith('Cross click');
  });
});
