import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignment } from 'src/domain/assignment';
import { AssignmentType } from 'src/domain/assignmentType';

@Injectable()
export class AssignmentService {
    Url = "https://localhost:7092/api/Assignment/";

    assignmentDialog: boolean = false;
    constructor(private myHttp: HttpClient) { }
    newAssignment: Assignment

    getAssignments(): Observable<Array<Assignment>> {
        var assignmentsList = this.myHttp.get<Array<Assignment>>(this.Url + "GetAssignments");
        return assignmentsList;
    }

    getAssignmentsTypes(): Observable<Array<AssignmentType>> {
        try {
            var assignmentsTypes = this.myHttp.get<Array<AssignmentType>>(this.Url + "GetAssignmentsTypes");
            return assignmentsTypes;
        } catch (error) {
            console.log("failed to get assignment:", error);
            throw error;
        }
    }

    deleteAssignment(id: number): Observable<any> {
        var assignment = this.myHttp.delete(this.Url + 'DeleteAssignment/' + id);
        return assignment;
    }
    markAssignmentAsFinished(assignment: Assignment): Observable<any> {
        try {
            return this.myHttp.put<Assignment>(this.Url, assignment);
        }
        catch (error) {
            debugger
            console.log("update assinment was failed:", error);
        }
    }

    addAssignment(assignment: Assignment): Observable<any> {
        var _assignment = this.myHttp.post<Assignment>(this.Url,assignment)
        this.newAssignment=assignment
        return _assignment
    }

    getSeverity(type: string) {
        switch (type) {
            case 'PERSONAL':
                return 'success';
            case 'JOB':
                return 'warning';
            case 'STUDY':
                return 'danger';
        }
    }
    getNewAssignment() {
        return this.newAssignment
    }

};