import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentSingleComponent } from './agent-single.component';

describe('AgentSingleComponent', () => {
  let component: AgentSingleComponent;
  let fixture: ComponentFixture<AgentSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
