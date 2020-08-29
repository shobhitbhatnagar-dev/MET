import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/_model/request';
import { RequestService } from '../_services/request.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-uat-update',
  templateUrl: './uat-update.component.html',
  styleUrls: ['./uat-update.component.css'],
})
export class UatUpdateComponent implements OnInit {
  requestbyid: Request;
  model: any = {};
  fileSelected: any = null;
  projectId: any;
  requestProjectId: any = 0;
  minDate: Date;
  minstartDate: Date;
  buttonDisable = false;

  constructor(
    private requestService: RequestService,
    private alertify: AlertifyService,
    private Activeroute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private route: Router,
    private auth: AuthService
  )
  {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.minstartDate = new Date();
    this.minstartDate.setDate(this.minDate.getDate() - 365);
  }

  ngOnInit() {
    this.spinner.show();
    this.buttonDisable = false;
    this.Activeroute.data.subscribe((data) => {
      // tslint:disable-next-line: no-string-literal
      this.requestbyid = data['request'];
    });

    if (this.requestbyid == null) {
      this.alertify.error('Request Does Not Exsist');
      this.route.navigate(['/requests/status/uat']);
    } else {
      this.requestProjectId = +this.requestbyid.project.id;
      this.projectId = +this.auth.getProjectAccess();
      console.log(this.projectId + '=' + this.requestProjectId);
      if (this.projectId !== this.requestProjectId && this.projectId !== 0) {
        this.alertify.error(
          'You do not have access to requests of this project'
        );
        this.route.navigate(['/requests/status/uat']);
      } else {
        if (this.requestbyid.status !== 'uat') {
          this.alertify.error(
            'The selected request is not in UAT phase'
          );
          this.route.navigate(['/requests/status/uat']);
        }
      }
    }

    setTimeout(() => {
      /** spinner ends after 0.5 seconds */
      this.spinner.hide();
    }, 500);
  }

  updateUAT() {
    this.buttonDisable = true;
    this.spinner.show();
    this.requestService.ClearAttachment();
    if (this.fileSelected == null) {
      this.alertify.error('UAT Sign off Mails are required');
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
          this.model.uatApproval = localStorage.getItem('attachmentUrl');
          this.model.publicId = localStorage.getItem('publicId');
          console.log(this.model);
          this.requestService
            .UpdateUat(this.requestbyid.id, this.model)
            .subscribe(
              (next) => {
                this.alertify.success('UAT Details updated sucessfully');
                this.route.navigate(['requests/status/uat']);
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
