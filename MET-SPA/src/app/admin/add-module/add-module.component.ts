import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/_services/request.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { MasterService } from 'src/app/_services/master.service';
import { Project } from 'src/app/_model/project';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.css'],
})
export class AddModuleComponent implements OnInit {
  projects: Project[];
  model: any = {};
  buttonDisable = false;
  id: any;

  constructor(
    private alertify: AlertifyService,
    private router: Router,
    private auth: AuthService,
    private master: MasterService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.master.getProjects().subscribe((projects: Project[]) => {
      this.projects = projects;
    }, error => {
      this.alertify.error(error);
    });
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 100);
  }

  addModule() {
    this.spinner.show();
    this.buttonDisable = true;
    this.id = this.master.addModule(this.model).subscribe(
      () => {
        this.alertify.success('Module Added Sucessfully');
      },
      (error) => {
        this.alertify.error(error);
        this.buttonDisable = false;
      },
      () => {
        this.router.navigate(['project']);
      }
    );
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 500);
  }
}
