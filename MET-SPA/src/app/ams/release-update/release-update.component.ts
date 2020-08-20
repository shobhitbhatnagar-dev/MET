import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/_model/request';
import { RequestService } from 'src/app/_services/request.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-release-update',
  templateUrl: './release-update.component.html',
  styleUrls: ['./release-update.component.css'],
})
export class ReleaseUpdateComponent implements OnInit {
  requestbyid: Request;
  model: any = {};
  fileSelected: any = null;
  requestInProgress: boolean;
  minDate: Date;
  projectId: any;
  requestProjectId: any = 0;

  constructor(
    private requestService: RequestService,
    private alertify: AlertifyService,
    private Activeroute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private auth: AuthService
  ) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
  }

  ngOnInit() {
    this.spinner.show();
    this.Activeroute.data.subscribe((data) => {
      // tslint:disable-next-line: no-string-literal
      this.requestbyid = data['request'];
    });

    if (this.requestbyid == null) {
      this.alertify.error('Request Does Not Exsist');
      this.router.navigate(['/requests/status/release']);
    } else {
      this.requestProjectId = +this.requestbyid.project.id;
      this.projectId = +this.auth.getProjectAccess();
      console.log(this.projectId + '=' + this.requestProjectId);
      if (this.projectId !== this.requestProjectId && this.projectId !== 0) {
        this.alertify.error(
          'You do not have access to requests of this project'
        );
        this.router.navigate(['/requests/status/release']);
      } else {
        if (this.requestbyid.status !== 'release') {
          this.alertify.error(
            'The selected request is not in Release Update phase'
          );
          this.router.navigate(['/requests/status/release']);
        }
      }
    }
    setTimeout(() => {
      /** spinner ends after 0.5 seconds */
      this.spinner.hide();
    }, 500);
  }

  updateRelease() {
    this.spinner.show();
    this.requestService.ClearAttachment();
    if (this.fileSelected == null) {
      this.alertify.error('Release Note is required');
      this.spinner.hide();
    } else {
      const formData: FormData = new FormData();
      formData.append('fileRecived', this.fileSelected);
      this.requestService.UploadAttachment(formData).subscribe(
        () => {
          console.log('attachment Upload sucessfull');
        },
        (error) => {
          this.alertify.error(error);
        },
        () => {
          console.log(this.model);
          this.requestService
            .UpdateRelease(this.requestbyid.id, this.model)
            .subscribe((next) => {
              this.alertify.success('Release has been updated sucessfully');
              this.router.navigate(['/requests/status/timelines']);
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
        this.fileSelected = toFile;
    }
  }
}
