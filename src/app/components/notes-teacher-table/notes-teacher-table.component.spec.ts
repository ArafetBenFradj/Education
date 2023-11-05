import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesTeacherTableComponent } from './notes-teacher-table.component';

describe('NotesTeacherTableComponent', () => {
  let component: NotesTeacherTableComponent;
  let fixture: ComponentFixture<NotesTeacherTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesTeacherTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesTeacherTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
