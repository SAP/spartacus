import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { SchemaService } from '../schema.service';
import { SchemaComponent } from './schema.component';

@Component({
  selector: 'cx-json-ld',
  template: '',
})
export class MockJsonLdComponent {
  @Input() schema;
}

class MockSchemaService {
  load(): Observable<any> {
    return of('test');
  }
}

describe('SchemaComponent', () => {
  let component: SchemaComponent;
  let fixture: ComponentFixture<SchemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [MockJsonLdComponent, SchemaComponent],
      providers: [
        {
          provide: SchemaService,
          useClass: MockSchemaService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return schema', () => {
    component
      .load()
      .subscribe(schema => {
        expect(schema).toEqual('test');
      })
      .unsubscribe();
  });
});
