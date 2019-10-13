import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMockModule } from '../../app.mock.module';
import { CompanyEditorComponent } from './company-editor.component';

describe('CompanyEditorComponent', () => {
  let component: CompanyEditorComponent;
  let fixture: ComponentFixture<CompanyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyEditorComponent ],
      imports: [AppMockModule,]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
