import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMockModule } from '../../app.mock.module';
import { CompanyInfoComponent } from './company-info.component';

describe('CompanyInfoComponent', () => {
  let component: CompanyInfoComponent;
  let fixture: ComponentFixture<CompanyInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyInfoComponent ],
      imports: [AppMockModule,]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
