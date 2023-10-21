import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksByCategoryComponent } from './tasks-by-category.component';

describe('TasksByCategoryComponent', () => {
  let component: TasksByCategoryComponent;
  let fixture: ComponentFixture<TasksByCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasksByCategoryComponent]
    });
    fixture = TestBed.createComponent(TasksByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
