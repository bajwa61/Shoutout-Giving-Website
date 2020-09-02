import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewAgentComponent } from './add-new-agent.component';

describe('AddNewAgentComponent', () => {
  let component: AddNewAgentComponent;
  let fixture: ComponentFixture<AddNewAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
