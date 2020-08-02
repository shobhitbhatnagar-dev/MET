export interface Approval {
    id: number;
    finalEfforts: number;
    approver: string;
    approverId: number;
    approvalDate: Date;
    uat: boolean;
}
