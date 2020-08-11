import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/_model/request';
import { RequestService } from 'src/app/_services/request.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

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

  constructor(
    private requestService: RequestService,
    private alertify: AlertifyService,
    private Activeroute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
  }

  ngOnInit() {
    this.Activeroute.data.subscribe((data) => {
      // tslint:disable-next-line: no-string-literal
      this.requestbyid = data['request'];
    });
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
