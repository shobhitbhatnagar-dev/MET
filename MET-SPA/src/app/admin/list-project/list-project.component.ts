import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/_services/request.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { MasterService } from 'src/app/_services/master.service';
import { Project } from 'src/app/_model/project';
import { Module } from 'src/app/_model/module';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent implements OnInit {
  projectlist: Project[];
  modules: Module[];
  modulesExsists: boolean;
  projectSelected: string;

  constructor(
    private requestService: RequestService,
    private alertify: AlertifyService,
    private router: Router,
    private auth: AuthService,
    private master: MasterService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
    this.spinner.show();
    this.modulesExsists = false;
    this.master.getProjects().subscribe((projects: Project[]) => {
      this.projectlist = projects;
    }, error => {
      this.alertify.error(error);
    });
    setTimeout(() => {
      /** spinner ends after 0.5 seconds */
      this.spinner.hide();
    }, 500);
  }

  GetModules(projectId: number, projectName: string): void {
    console.log(projectId);
    this.master.getModulesbyProject(projectId).subscribe((modules: Module[]) => {
      this.modules = modules;
    }, error => {
      this.alertify.error(error);
    },
    () => {
      this.modulesExsists = true;
      this.projectSelected = projectName;
    });
   }

}
