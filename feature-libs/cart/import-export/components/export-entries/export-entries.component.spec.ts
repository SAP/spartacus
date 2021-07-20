import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { ExportService } from '@spartacus/cart/import-export/core';
import { ExportEntriesService } from './export-entries.service';
import { of } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { ExportEntriesComponent } from './export-entries.component';

class MockRoutingService {
  getRouterState() {
    return of();
  }
}

class MockExportEntriesService {
  getEntries() {
    return of([]);
  }
}

describe('ExportEntriesComponent', () => {
  let component: ExportEntriesComponent;
  let fixture: ComponentFixture<ExportEntriesComponent>;
  let exportService: ExportService;
  let exportEntriesService: ExportEntriesService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          StoreModule.forRoot({}),
          I18nTestingModule,
          RouterTestingModule,
        ],
        providers: [
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
          {
            provide: ExportEntriesService,
            useClass: MockExportEntriesService,
          },
        ],
        declarations: [ExportEntriesComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportEntriesComponent);
    component = fixture.componentInstance;
    exportService = TestBed.inject(ExportService);
    exportEntriesService = TestBed.inject(ExportEntriesService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display export to csv link and run downloadCsv on click', () => {
    spyOn(exportService, 'dataToCsv').and.callThrough();

    const btn = fixture.debugElement.query(By.css('button.cx-action-link'));
    expect(btn.nativeElement).toBeTruthy();

    btn.nativeElement.click();

    fixture.whenStable().then(() => {
      expect(component.exportToCsv).toHaveBeenCalled();
      expect(component.downloadCsv).toHaveBeenCalled();
      expect(exportService.dataToCsv).toHaveBeenCalled();
      expect(exportEntriesService.exportEntries).toHaveBeenCalled();
    });
  });
});
