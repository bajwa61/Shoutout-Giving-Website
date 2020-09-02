import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CelebPasswordChangeComponent } from './celeb-password-change.component';

describe('CelebPasswordChangeComponent', () => {
  let component: CelebPasswordChangeComponent;
  let fixture: ComponentFixture<CelebPasswordChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CelebPasswordChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CelebPasswordChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
