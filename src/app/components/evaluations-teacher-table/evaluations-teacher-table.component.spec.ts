import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationsTeacherTableComponent } from './evaluations-teacher-table.component';

describe('EvaluationsTeacherTableComponent', () => {
  let component: EvaluationsTeacherTableComponent;
  let fixture: ComponentFixture<EvaluationsTeacherTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationsTeacherTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationsTeacherTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
