import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalEvaluationsTeacherTableComponent } from './global-evaluations-teacher-table.component';

describe('GlobalEvaluationsTeacherTableComponent', () => {
  let component: GlobalEvaluationsTeacherTableComponent;
  let fixture: ComponentFixture<GlobalEvaluationsTeacherTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalEvaluationsTeacherTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalEvaluationsTeacherTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
