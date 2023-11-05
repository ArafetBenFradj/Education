import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayStudentAdminComponent } from './display-student-admin.component';

describe('DisplayStudentAdminComponent', () => {
  let component: DisplayStudentAdminComponent;
  let fixture: ComponentFixture<DisplayStudentAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayStudentAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayStudentAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
