import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { of } from 'rxjs';
import { CommerceQuotesRequestQuoteButtonComponent } from './commerce-quotes-request-quote-button.component';
import createSpy = jasmine.createSpy;

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialog = createSpy().and.returnValue(of({}));
}

describe('CommerceQuotesRequestQuoteButtonComponent', () => {
  let component: CommerceQuotesRequestQuoteButtonComponent;
  let fixture: ComponentFixture<CommerceQuotesRequestQuoteButtonComponent>;
  let launchDialogService: LaunchDialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommerceQuotesRequestQuoteButtonComponent, MockUrlPipe],
      imports: [I18nTestingModule],
      providers: [
        {
          provide: LaunchDialogService,
          useClass: MockLaunchDialogService,
        },
      ],
    }).compileComponents();

    launchDialogService = TestBed.inject(LaunchDialogService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CommerceQuotesRequestQuoteButtonComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call showDialog method to invoke dialog component', () => {
    component.showDialog();

    expect(launchDialogService.openDialog).toHaveBeenCalledWith(
      LAUNCH_CALLER.REQUEST_QUOTE,
      component.element,
      component['vcr']
    );
  });
});
