import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/_services/request.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from 'src/app/_model/request';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-efforts-update',
  templateUrl: './efforts-update.component.html',
  styleUrls: ['./efforts-update.component.css'],
})
export class EffortsUpdateComponent implements OnInit {
  requestbyid: Request;
  model: any = {};
  fileSelected: any = null;

  constructor(
    private requestService: RequestService,
    private alertify: AlertifyService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.activeRoute.data.subscribe((data) => {
      // tslint:disable-next-line: no-string-literal
      this.requestbyid = data['request'];
    });
    setTimeout(() => {
      /** spinner ends after 0.5 seconds */
      this.spinner.hide();
    }, 500);
  }

  updateEfforts() {
    this.spinner.show();
    this.requestService.ClearAttachment();
    if ((this.fileSelected == null)) {
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
          this.model.title = localStorage.getItem('attachmentTitle');
          this.model.wbsUrl = localStorage.getItem('attachmentUrl');
          this.model.publicId = localStorage.getItem('publicId');
          console.log(this.model);
          this.requestService
            .UpdateEfforts(this.requestbyid.id, this.model)
            .subscribe((next) => {
              this.alertify.success('Efforts updated sucessfully');
              this.route.navigate(['requests/status/new']);
            });
        });
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
