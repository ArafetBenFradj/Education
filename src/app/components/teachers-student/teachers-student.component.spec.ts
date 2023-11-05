import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersStudentComponent } from './teachers-student.component';

describe('TeachersStudentComponent', () => {
  let component: TeachersStudentComponent;
  let fixture: ComponentFixture<TeachersStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachersStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
