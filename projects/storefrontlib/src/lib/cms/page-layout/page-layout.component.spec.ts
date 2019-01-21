import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NgModule, Component } from '@angular/core';
import { CmsService, Page } from '@spartacus/core';
import { of, Observable } from 'rxjs';
import { PageTemplateComponent } from './page-layout.component';
import { PageTemplateModule } from './page-layout.module';

@Component({
  selector: 'cx-test',
  template: `
    <cx-page-template></cx-page-template>
  `
})
export class TestComponent {}

@NgModule({
  imports: [PageTemplateModule],
  declarations: [TestComponent],
  entryComponents: [TestComponent],
  exports: [TestComponent]
})
export class TestModule {}

class MockCmsService {
  getContentSlot(): Observable<Page> {
    return of({
      uid: 'page_uid',
      template: 'pageTemplateUid',
      slots: {
        slotA: {
          uid: 'Section1'
        }
      }
    });
  }
}

fdescribe('DynamicSlotComponent', () => {
  let pagetTemplateComponent: PageTemplateComponent;
  let fixture: ComponentFixture<PageTemplateComponent>;
  let cmsService: CmsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [PageTemplateComponent],
      providers: [
        {
          provide: CmsService,
          useClass: MockCmsService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTemplateComponent);
    pagetTemplateComponent = fixture.componentInstance;
    fixture.detectChanges();

    cmsService = TestBed.get(CmsService);
  });

  it('should be created', () => {
    expect(pagetTemplateComponent).toBeTruthy();
  });

  it('should render page template slots', () => {
    const native = fixture.debugElement.nativeElement;
  });

  //   it('should not add smart edit slot contract if app not launch in smart edit', () => {
  //     spyOn(cmsService, 'isLaunchInSmartEdit').and.returnValue(false);

  //     fixture = TestBed.createComponent(DynamicSlotComponent);
  //     pagetTemplateComponent = fixture.componentInstance;
  //     pagetTemplateComponent.position = 'left';
  //     fixture.detectChanges();

  //     const native = fixture.debugElement.nativeElement;
  //     expect(native.classList.contains('smartEditComponent')).toBeFalsy();
  //     expect(native.getAttribute('data-smartedit-component-id')).toEqual(null);
  //   });
});
