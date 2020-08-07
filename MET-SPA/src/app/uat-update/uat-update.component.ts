import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/_model/request';
import { RequestService } from '../_services/request.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-uat-update',
  templateUrl: './uat-update.component.html',
  styleUrls: ['./uat-update.component.css'],
})
export class UatUpdateComponent implements OnInit {
  requestbyid: Request;
  model: any = {};
  fileSelected: any = null;
  requestInProgress: boolean;
  minDate: Date;
  minstartDate: Date;

  constructor(
    private requestService: RequestService,
    private alertify: AlertifyService,
    private Activeroute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: Router
  ) 
  {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.minstartDate = new Date();
    this.minstartDate.setDate(this.minDate.getDate() - 365);
  }

  ngOnInit() {
    this.Activeroute.data.subscribe((data) => {
      // tslint:disable-next-line: no-string-literal
      this.requestbyid = data['request'];
    });
  }

  updateUAT() {
    console.log(this.model);
    this.spinner.show();
    this.requestInProgress = false;
    this.requestService.ClearAttachment();
    if (this.fileSelected == null) {
      this.alertify.error('WBS is required to submit efforts');
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
          this.requestInProgress = true;
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
                this.alertify.success('Efforts updated sucessfully');
                this.route.navigate(['requests/status/uat']);
              },
              (error) => {
                this.requestInProgress = true;
                this.alertify.error(error);
              }
            );
        }
      );
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
      console.log(toFile);
    }
  }
}
