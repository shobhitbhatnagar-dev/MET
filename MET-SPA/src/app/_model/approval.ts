export interface Approval {
    id: number;
    finalEfforts: number;
    approver: string;
    approvalMail: string;
    title: string;
    publicId: string;
    approverId: number;
    approvalDate: Date;
    uat: boolean;
}
