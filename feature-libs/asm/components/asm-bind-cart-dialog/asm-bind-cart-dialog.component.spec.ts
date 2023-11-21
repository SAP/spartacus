import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FocusDirective, LaunchDialogService } from '@spartacus/storefront';
import {
  AsmBindCartDialogComponent,
  BIND_CART_DIALOG_ACTION,
} from './asm-bind-cart-dialog.component';

@Pipe({
  name: 'cxTranslate',
})
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog(_reason: any) {}
}

describe('AsmBindCartDialogComponent', () => {
  let component: AsmBindCartDialogComponent;
  let fixture: ComponentFixture<AsmBindCartDialogComponent>;

  let launchDialogService: LaunchDialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AsmBindCartDialogComponent,
        MockTranslatePipe,
        FocusDirective,
      ],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmBindCartDialogComponent);
    component = fixture.componentInstance;

    launchDialogService = TestBed.inject(LaunchDialogService);

    spyOn(launchDialogService, 'closeDialog').and.stub();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close with replace action when replace button is clicked', () => {
    fixture.detectChanges();

    fixture.debugElement
      .query(By.css('.btn-primary'))
      .triggerEventHandler('click');

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      BIND_CART_DIALOG_ACTION.REPLACE
    );
  });

  it('should close with cancel action when cancel button is clicked', () => {
    fixture.detectChanges();

    fixture.debugElement
      .query(By.css('.btn-secondary'))
      .triggerEventHandler('click');

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      BIND_CART_DIALOG_ACTION.CANCEL
    );
  });
});
