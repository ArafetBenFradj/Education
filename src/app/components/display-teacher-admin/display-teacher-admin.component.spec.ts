import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTeacherAdminComponent } from './display-teacher-admin.component';

describe('DisplayTeacherAdminComponent', () => {
  let component: DisplayTeacherAdminComponent;
  let fixture: ComponentFixture<DisplayTeacherAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayTeacherAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayTeacherAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
