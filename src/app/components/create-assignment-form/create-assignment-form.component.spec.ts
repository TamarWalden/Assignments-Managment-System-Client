import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssignmentFormComponent } from './create-assignment-form.component';

describe('CreateAssignmentFormComponent', () => {
  let component: CreateAssignmentFormComponent;
  let fixture: ComponentFixture<CreateAssignmentFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAssignmentFormComponent]
    });
    fixture = TestBed.createComponent(CreateAssignmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
