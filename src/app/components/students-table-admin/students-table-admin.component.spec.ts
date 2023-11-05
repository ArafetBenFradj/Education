import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsTableAdminComponent } from './students-table-admin.component';

describe('StudentsTableAdminComponent', () => {
  let component: StudentsTableAdminComponent;
  let fixture: ComponentFixture<StudentsTableAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsTableAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsTableAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
