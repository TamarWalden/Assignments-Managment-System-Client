import { AssignmentType } from "./assignmentType";

export class Assignment {
    constructor(
        public id: number,
        public name: string,
        public startDate: Date,
        public isRecurring: boolean,
        public isFinished: boolean,
        public description: string,
        public endDate: Date,
        public assignmentType: AssignmentType,
    ){}
}
