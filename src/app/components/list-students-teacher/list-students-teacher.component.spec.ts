import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStudentsTeacherComponent } from './list-students-teacher.component';

describe('ListStudentsTeacherComponent', () => {
  let component: ListStudentsTeacherComponent;
  let fixture: ComponentFixture<ListStudentsTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListStudentsTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStudentsTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
