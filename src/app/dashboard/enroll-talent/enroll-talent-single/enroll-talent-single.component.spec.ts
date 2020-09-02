import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollTalentSingleComponent } from './enroll-talent-single.component';

describe('EnrollTalentSingleComponent', () => {
  let component: EnrollTalentSingleComponent;
  let fixture: ComponentFixture<EnrollTalentSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollTalentSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollTalentSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
