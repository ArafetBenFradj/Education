import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEvaluationParentComponent } from './search-evaluation-parent.component';

describe('SearchEvaluationParentComponent', () => {
  let component: SearchEvaluationParentComponent;
  let fixture: ComponentFixture<SearchEvaluationParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchEvaluationParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchEvaluationParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
