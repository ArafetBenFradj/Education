import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationTeacherComponent } from './evaluation-teacher.component';

describe('EvaluationTeacherComponent', () => {
  let component: EvaluationTeacherComponent;
  let fixture: ComponentFixture<EvaluationTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
