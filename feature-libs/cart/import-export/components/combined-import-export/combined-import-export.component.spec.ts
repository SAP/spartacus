import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { PageComponentModule } from '@spartacus/storefront';
import { CombinedImportExportComponent } from './combined-import-export.component';

describe('CombinedImportExportComponent', () => {
  let component: CombinedImportExportComponent;
  let fixture: ComponentFixture<CombinedImportExportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), PageComponentModule],
      declarations: [CombinedImportExportComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CombinedImportExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
