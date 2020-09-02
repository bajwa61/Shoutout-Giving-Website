import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStarsComponent } from './all-stars.component';

describe('AllStarsComponent', () => {
  let component: AllStarsComponent;
  let fixture: ComponentFixture<AllStarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllStarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
