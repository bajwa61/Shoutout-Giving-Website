import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewStarComponent } from './add-new-star.component';

describe('AddNewStarComponent', () => {
  let component: AddNewStarComponent;
  let fixture: ComponentFixture<AddNewStarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewStarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
