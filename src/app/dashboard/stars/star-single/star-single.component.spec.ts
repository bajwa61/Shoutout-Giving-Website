import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarSingleComponent } from './star-single.component';

describe('StarSingleComponent', () => {
  let component: StarSingleComponent;
  let fixture: ComponentFixture<StarSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
