import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMockModule } from '../../app.mock.module';
import { CompanyCreatorComponent } from './company-creator.component';

describe('CompanyCreatorComponent', () => {
  let component: CompanyCreatorComponent;
  let fixture: ComponentFixture<CompanyCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyCreatorComponent ],
      imports: [AppMockModule,]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
