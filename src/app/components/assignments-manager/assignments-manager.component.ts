import { Component, OnInit } from '@angular/core';
// import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { Assignment } from 'src/domain/assignment';
import { AssignmentService } from 'src/service/assignmentService';

@Component({
  selector: 'app-assignments-manager',
  templateUrl: './assignments-manager.component.html',
  styleUrls: ['./assignments-manager.component.scss']
})
export class AssignmentsManagerComponent implements OnInit {
  assignmentDialog: boolean = false;
  assignments!: Assignment[];

  assignment!: any;

  selectedAssignments!: Assignment[] | null;

  submitted: boolean = false;

  assignmentsTypes!: any[];
  showUpdateTransparentButton: boolean = false;


  constructor(private assignmentsService: AssignmentService, private confirmationService: ConfirmationService) { }
  // constructor(private assignmentsService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.assignmentsService.getAssignments().subscribe(
      data => {
        this.assignments = data;
        this.loadAssignmentsTypes();
      },
      err => {
        console.log("Cannot find assignments");
      }
    );

  }

  loadAssignmentsTypes() {
    this.assignmentsService.getAssignmentsTypes().subscribe(
      data => {
        this.assignmentsTypes = data;
      },
      err => {
        console.log("Cannot find assignmentsTypes");
        this.assignmentsTypes = [
          { label: 'PERSONAL', value: 1 },
          { label: 'JOB', value: 2 },
          { label: 'STUDY', value: 3 }
        ];
      }
    );
  }

  openNew() {
    this.assignment = {};
    this.submitted = false;
    this.assignmentDialog = true;
  }

  editAssignment(assignment: Assignment, isFinished: boolean) {
    this.assignmentsService.markAssignmentAsFinished(assignment).subscribe(
      sucs => {
        const foundAssignment = this.assignments.find(a => a.id === assignment.id);
        foundAssignment.isFinished = isFinished;
        this.showUpdateTransparentButton = !isFinished;
      },
      err => { console.log("failes to edit assignment") })
  }

  deleteAssignment(assignment: Assignment) {

    this.assignmentsService.deleteAssignment(assignment.id).subscribe(
      sucs => {
        const index = this.assignments.findIndex((val) => val.id === assignment.id);
        this.assignments.splice(index, 1);
        this.assignment = {};
      },
      err => { console.log("failes to delete assignment") }
    );
  }

  getSeverity(type: string) {
    return this.assignmentsService.getSeverity(type);
  }

  updateAssignments() {
    this.assignments.push(this.assignmentsService.getNewAssignment());
    this.assignmentDialog = false;
  }
}
