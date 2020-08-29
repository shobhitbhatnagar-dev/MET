import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/_services/request.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { Request } from 'src/app/_model/request';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-effort-approval',
  templateUrl: './effort-approval.component.html',
  styleUrls: ['./effort-approval.component.css'],
})
export class EffortApprovalComponent implements OnInit {
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
    private auth: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.buttonDisable = false;
    this.activeRoute.data.subscribe((data) => {
      // tslint:disable-next-line: no-string-literal
      this.requestbyid = data['request'];
    });

    if (this.requestbyid == null) {
      this.alertify.error('Request Does Not Exsist');
      this.route.navigate(['/requests/status/effort']);
    } else {
      this.requestProjectId = +this.requestbyid.project.id;
      this.projectId = +this.auth.getProjectAccess();
      console.log(this.projectId + '=' + this.requestProjectId);
      if (this.projectId !== this.requestProjectId && this.projectId !== 0) {
        this.alertify.error(
          'You do not have access to requests of this project'
        );
        this.route.navigate(['/requests/status/effort']);
      } else {
        if (this.requestbyid.status !== 'effort') {
          this.alertify.error(
            'The selected request is not in Effort Approval phase'
          );
          this.route.navigate(['/requests/status/effort']);
        }
      }
    }

    setTimeout(() => {
      /** spinner ends after 0.5 seconds */
      this.spinner.hide();
    }, 500);
  }

  updateApproval() {
    this.spinner.show();
    this.buttonDisable = true;
    this.requestService.ClearAttachment();
    if (this.fileSelected == null) {
      this.alertify.error('Approval mail is required to approve efforts');
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
          this.model.approverId = this.auth.getUserId();
          this.model.approver = this.auth.getUsername();
          this.model.title = localStorage.getItem('attachmentTitle');
          this.model.approvalMail = localStorage.getItem('attachmentUrl');
          this.model.publicId = localStorage.getItem('publicId');
          console.log(this.model);
          this.requestService
            .UpdateApproval(this.requestbyid.id, this.model)
            .subscribe(
              (next) => {
                this.alertify.success('Approval has been updated sucessfully');
                this.route.navigate(['requests/status/effort']);
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
    }
  }
}
