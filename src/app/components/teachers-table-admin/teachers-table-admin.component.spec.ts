import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersTableAdminComponent } from './teachers-table-admin.component';

describe('TeachersTableAdminComponent', () => {
  let component: TeachersTableAdminComponent;
  let fixture: ComponentFixture<TeachersTableAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachersTableAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersTableAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
