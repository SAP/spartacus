import { Directive, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AsmService } from '@spartacus/core';
import { of } from 'rxjs';
import { AsmLoaderComponent } from './asm-loader.component';

class MockActivatedRoute {
  queryParamMap = of();
}

class MockAsmService {
  getAsmUiState() {
    return of({});
  }
  updateAsmUiState(): void {}
}

@Directive({
  selector: '[cxComponentWrapper]',
})
export class MockComponentWrapperDirective {
  @Input() cxComponentWrapper: any;
}

describe('AsmLoaderComponent', () => {
  let component: AsmLoaderComponent;
  let fixture: ComponentFixture<AsmLoaderComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AsmLoaderComponent, MockComponentWrapperDirective],
      providers: [
        { provide: AsmService, useClass: MockAsmService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmLoaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
