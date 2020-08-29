import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/_services/request.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from 'src/app/_model/request';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-efforts-update',
  templateUrl: './efforts-update.component.html',
  styleUrls: ['./efforts-update.component.css'],
})
export class EffortsUpdateComponent implements OnInit {
  requestbyid: Request;
  model: any = {};
  fileSelected: any = null;
  buttonDisable = false;
  projectId: any;
  requestProjectId: any = 0;

  constructor(
    private requestService: RequestService,
    private alertify: AlertifyService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private spinner: NgxSpinnerService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.buttonDisable = false;
    this.spinner.show();
    this.activeRoute.data.subscribe((data) => {
      // tslint:disable-next-line: no-string-literal
      this.requestbyid = data['request'];
    });
    if (this.requestbyid == null) {
      this.alertify.error('Request Does Not Exsist');
      this.route.navigate(['/requests/status/new']);
    } else {
      this.requestProjectId = +this.requestbyid.project.id;
      this.projectId = +this.auth.getProjectAccess();
      console.log(this.projectId + '=' + this.requestProjectId);
      if (this.projectId !== this.requestProjectId && this.projectId !== 0) {
        this.alertify.error(
          'You do not have access to requests of this project'
        );
        this.route.navigate(['/requests/status/new']);
      } else {
        if (this.requestbyid.status !== 'new') {
          this.alertify.error(
            'The selected request is not in Effort Submission phase'
          );
          this.route.navigate(['/requests/status/new']);
        }
      }
    }
    setTimeout(() => {
      /** spinner ends after 0.2 seconds */
      this.spinner.hide();
    }, 500);
  }

  updateEfforts() {
    this.buttonDisable = true;
    this.spinner.show();
    this.requestService.ClearAttachment();
    if (this.fileSelected == null) {
      this.alertify.error('WBS file is mandatory to submit efforts');
      this.buttonDisable = false; 
      this.spinner.hide();
    } else {
      const formData: FormData = new FormData();
      formData.append('fileRecived', this.fileSelected);
      this.requestService.UploadAttachment(formData).subscribe(
        () => {
          console.log('attachment Upload sucessfull');
        },
        (error) => {
          this.buttonDisable = false;
          this.alertify.error(error);
        },
        () => {
          this.model.title = localStorage.getItem('attachmentTitle');
          this.model.wbsUrl = localStorage.getItem('attachmentUrl');
          this.model.publicId = localStorage.getItem('publicId');
          console.log(this.model);
          this.requestService
            .UpdateEfforts(this.requestbyid.id, this.model)
            .subscribe(
              (next) => {
                this.alertify.success('Efforts updated sucessfully');
                this.route.navigate(['requests/status/new']);
              },
              (error) => {
                this.buttonDisable = false;
                this.alertify.error(error);
              }
            );
        }
      );
    }
    this.requestService.ClearAttachment();
    setTimeout(() => {
      /** spinner ends after 4 seconds */
      this.spinner.hide();
    }, 3000);
  }

  onChange(event) {
    const toFile = event.target.files[0];
    if (toFile) {
      this.fileSelected = toFile;
      console.log(toFile);
    }
  }
}
