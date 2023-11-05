import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsCourseTeacherComponent } from './students-course-teacher.component';

describe('StudentsCourseTeacherComponent', () => {
  let component: StudentsCourseTeacherComponent;
  let fixture: ComponentFixture<StudentsCourseTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsCourseTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsCourseTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
