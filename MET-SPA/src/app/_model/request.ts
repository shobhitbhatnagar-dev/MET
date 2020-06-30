import { User } from './user';
import { Project } from './project';
import { Module } from './module';
import { Effort } from './effort';
import { Approval } from './approval';
import { Release } from './release';
import { Timeline } from './timeline';

export interface Request {
    id: number;
    user: User;
    project: Project;
    module: Module;
    title: string;
    requierment: string;
    priority?: string;
    justification?: string;
    attachmentUrl?: string;
    creationDate: Date;
    status: string;
    effort?: Effort;
    approval?: Approval;
    release?: Release;
    timeline?: Timeline;
}
