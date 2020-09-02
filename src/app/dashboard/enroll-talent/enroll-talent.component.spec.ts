import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollTalentComponent } from './enroll-talent.component';

describe('EnrollTalentComponent', () => {
  let component: EnrollTalentComponent;
  let fixture: ComponentFixture<EnrollTalentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollTalentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollTalentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
