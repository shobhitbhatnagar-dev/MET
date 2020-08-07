import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { RequestService } from 'src/app/_services/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { Project } from 'src/app/_model/project';
import { Module } from 'src/app/_model/module';
import { MasterService } from 'src/app/_services/master.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css'],
})
export class NewRequestComponent implements OnInit {
  model: any = {}; // To submit request
  projects: Project[]; // To load Projects
  modules: Module[]; // To load Modules
  moduleActive = false; // To activate & deactivate module drop down
  requestUrl: any; // For your Request redirect
  fileSelected: File = null; // To Display and maintain file selected
  requestInProgress: boolean; // To disable Submit button when request in progress
  isJustification: boolean; // To make Justification visible and invisible

  constructor(
    private requestService: RequestService,
    private alertify: AlertifyService,
    private router: Router,
    private auth: AuthService,
    private master: MasterService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.master.getProjects().subscribe(
      (projects: Project[]) => {
        this.projects = projects;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
    setTimeout(() => {
      /** spinner ends after 0.5 seconds */
      this.spinner.hide();
    }, 500);
  }

  addRequest() {
    this.spinner.show();
    this.requestInProgress = false;
    this.requestService.ClearAttachment();
    this.model.userId = this.auth.getUserId();
    this.model.status = 'new';

    // Attachment Uploaded
    if (this.fileSelected != null) {
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
          // New Request Creation with Attachment
          this.model.attachmentTitle = localStorage.getItem('attachmentTitle');
          this.model.attachmentUrl = localStorage.getItem('attachmentUrl');
          this.model.publicId = localStorage.getItem('publicId');

          this.requestService.addRequest(this.model).subscribe(
            () => {
              this.alertify.success('Request Added Sucessfully');
            },
            (error) => {
              this.requestInProgress = true;
              this.alertify.error(error);
            },
            () => {
              this.requestbyUser();
            }
          );
        }
      );
    } else {
      console.log(this.model);
      this.model.attachmentId = 0;

      // New Request Creation without Attachment
      this.requestService.addRequest(this.model).subscribe(
        () => {
          this.alertify.success('Request Added Sucessfully');
        },
        (error) => {
          this.requestInProgress = true;
          this.alertify.error(error);
        },
        () => {
          this.requestbyUser();
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

  onChangeProject(event): void {
    this.spinner.show();
    this.master.getModulesbyProject(event.target.value).subscribe(
      (modules: Module[]) => {
        this.modules = modules;
      },
      (error) => {
        this.moduleActive = false;
        this.alertify.error(error);
      },
      () => {
        this.moduleActive = true;
      }
    );
    this.spinner.hide();
  }

  onChange(event) {
    const toFile = event.target.files[0];
    if (toFile) {
      this.fileSelected = toFile;
    }
  }

  onChangePriority(event): void {
    this.spinner.show();
    const priotiy = event.target.value;
    if ( priotiy === 'High')
    {
      this.isJustification = true;
    }
    else
    {
      this.isJustification = false;
      this.model.justification = 'NA';
    }
    this.spinner.hide();
  }

  requestbyUser() {
    const userId = this.auth.getUserId();
    this.requestUrl = 'requests/user/' +  userId;
    this.router.navigate([this.requestUrl]);
  }
}
