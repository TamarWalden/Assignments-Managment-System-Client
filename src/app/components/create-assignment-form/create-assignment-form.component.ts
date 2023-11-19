import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Assignment } from 'src/domain/assignment';
import { AssignmentType } from 'src/domain/assignmentType';
import { AssignmentService } from 'src/service/assignmentService';

@Component({
  selector: 'app-create-assignment-form',
  templateUrl: './create-assignment-form.component.html',
  styleUrls: ['./create-assignment-form.component.scss']
})
export class CreateAssignmentFormComponent {
  @Output() addAssignment = new EventEmitter<void>();
  @Input() assignmentDialog: boolean;
  assignment: Assignment = new Assignment(0, '', new Date(), false, false, '', new Date(), AssignmentType.Default);
  assignmentForm: FormGroup;
  selectedAssignmentType: any;
  @Input() assignmentsTypes!: any[];

  constructor(private assignmentsService: AssignmentService, private messageService: MessageService, private confirmationService: ConfirmationService, private fb: FormBuilder) {
      this.assignmentForm = this.fb.group({
      assignmentsTypes: ['',Validators.required],
      name: ['', Validators.required],
      description: [''],
      startDate: ['', Validators.required],
      endDate: [''],
      isRecurring: [false],
    });
  }

  getSeverity(type: string) {
    return this.assignmentsService.getSeverity(type);
  }

  saveAssignment(): void {
    if (this.assignmentForm.valid) {
      const newAssignment: Assignment = {
        id: 0,
        name: this.assignmentForm.value.name,
        startDate: this.assignmentForm.value.startDate,
        isRecurring: this.assignmentForm.value.isRecurring,
        isFinished: false,
        description: this.assignmentForm.value.description || 'no description',
        endDate: this.assignmentForm.value.endDate || new Date('1690,01,01'),
        assignmentType: this.assignmentForm.value.assignmentsTypes
      };
      this.assignmentsService.addAssignment(newAssignment).subscribe(
        //add in the client and sort
        value=>{      
          this.addAssignment.emit();
        },
        err=>{console.log("failes to add assignment")+err}
      )
      this.assignmentDialog = false;
    }
  }
}