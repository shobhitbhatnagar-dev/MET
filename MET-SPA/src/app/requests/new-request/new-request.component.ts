import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { RequestService } from 'src/app/_services/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { Project } from 'src/app/_model/project';
import { Module } from 'src/app/_model/module';
import { MasterService } from 'src/app/_services/master.service';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css'],
})
export class NewRequestComponent implements OnInit {
  model: any = {};
  id: any;
  projects: Project[];
  modules: Module[];
  moduleActive = false;
  userId: any;
  requestUrl: any;

  constructor(
    private requestService: RequestService,
    private alertify: AlertifyService,
    private router: Router,
    private auth: AuthService,
    private master: MasterService
  ) {}

  ngOnInit() {
  this.master.getProjects().subscribe((projects: Project[]) => {
    this.projects = projects;
  }, error => {
    this.alertify.error(error);
  });
  }

  addRequest() {
    this.model.userId = this.auth.getUserId();
    this.model.status = 'new';
    console.log(this.model);
    this.id = this.requestService.addRequest(this.model).subscribe(
      () => {
        this.alertify.success('Request Added Sucessfully');
      },
      (error) => {
        this.alertify.error(error);
      },
      () => {
        this.requestbyUser();
      }
    );
  }

 onChangeProject(event): void {
  console.log(event.target.value);
  this.master.getModulesbyProject(event.target.value).subscribe((modules: Module[]) => {
    this.modules = modules;
  }, error => {
    this.alertify.error(error);
  },
  () => {
    this.moduleActive = true;
  });
 }

 requestbyUser() {
  this.userId = this.auth.getUserId();
  this.requestUrl  = 'requests/user/' + this.userId ;
  this.router.navigate([this.requestUrl]);
}

}
