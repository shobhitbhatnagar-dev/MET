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
  requestInProgress: boolean;

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
    this.activeRoute.data.subscribe((data) => {
      // tslint:disable-next-line: no-string-literal
      this.requestbyid = data['request'];
    });
    setTimeout(() => {
      /** spinner ends after 0.2 seconds */
      this.spinner.hide();
    }, 200);
  }

  updateApproval() {
    this.spinner.show();
    this.requestInProgress = false;
    this.requestService.ClearAttachment();
    if (this.fileSelected == null) {
      this.alertify.error('Approval is required to submit efforts');
      this.spinner.hide();
      this.requestInProgress = true;
    } else {
      const formData: FormData = new FormData();
      formData.append('fileRecived', this.fileSelected);
      this.requestService.UploadAttachment(formData).subscribe(
        () => {
          console.log('attachment Upload sucessfull');
        },
        (error) => {
          this.alertify.error(error);
          this.requestInProgress = true;
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
            .subscribe((next) => {
              this.alertify.success('Approval has been updated sucessfully');
              this.route.navigate(['requests/status/effort']);
            });
        });
    }
    this.requestService.ClearAttachment();
    this.requestInProgress = true;
    setTimeout(() => {
      /** spinner ends after 4 seconds */
      this.spinner.hide();
    }, 3000);
  }

  onChange(event) {
    const toFile = event.target.files[0];
    if (toFile) {
      if (toFile.type === 'application/pdf') {
        this.alertify.error('PDF format is not acceptable');
        this.fileSelected = null;
      } else {
        this.fileSelected = toFile;
        console.log(toFile);
      }
    }
  }
}
