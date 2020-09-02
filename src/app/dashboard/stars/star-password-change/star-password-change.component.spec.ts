import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StarPasswordChangeComponent } from './star-password-change.component';

describe('CelebPasswordChangeComponent', () => {
  let component: StarPasswordChangeComponent;
  let fixture: ComponentFixture<StarPasswordChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarPasswordChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarPasswordChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
