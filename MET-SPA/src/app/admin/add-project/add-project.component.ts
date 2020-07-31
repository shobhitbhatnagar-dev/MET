import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/_services/request.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { MasterService } from 'src/app/_services/master.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent implements OnInit {
  model: any = {};

  constructor(
    private requestService: RequestService,
    private alertify: AlertifyService,
    private router: Router,
    private auth: AuthService,
    private master: MasterService
  ) {}

  ngOnInit() {}

  addProject() {

    console.log(this.model);
    this.master.addProject(this.model).subscribe(
      () => {
        this.alertify.success('Project Added Sucessfully');
      },
      (error) => {
        this.alertify.error(error);
      },
      () => {
        this.router.navigate(['project']);
      }
    );
  }
}
