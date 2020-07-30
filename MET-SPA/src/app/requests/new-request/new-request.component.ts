import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { RequestService } from 'src/app/_services/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { Project } from 'src/app/_model/project';
import { Module } from 'src/app/_model/module';
import { MasterService } from 'src/app/_services/master.service';
import { Attachment } from 'src/app/_model/attachment';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css'],
})
export class NewRequestComponent implements OnInit {
  model: any = {};
  id: any;
  projects: Project[];
  modules: Module[];
  moduleActive = false;
  userId: any;
  requestUrl: any;
  toFile: any;
  attachment: Attachment;
  fileSelected: File = null;

  constructor(
    private requestService: RequestService,
    private alertify: AlertifyService,
    private router: Router,
    private auth: AuthService,
    private master: MasterService
  ) {}

  ngOnInit() {
    localStorage.removeItem('attachmentId');
    this.master.getProjects().subscribe(
      (projects: Project[]) => {
        this.projects = projects;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  addRequest() {
    localStorage.removeItem('attachmentTitle');
    localStorage.removeItem('attachmentUrl');
    localStorage.removeItem('publicId');
    this.model.userId = this.auth.getUserId();
    this.model.status = 'new';

    // Attachment Uploaded
    if (this.fileSelected != null) {
      const formData: FormData = new FormData();
      formData.append('fileRecived', this.fileSelected);
      this.requestService.UploadAttachment(formData).subscribe(
        () => {
          this.alertify.success('Attachment Uploaded');
        },
        (error) => {
          this.alertify.error(error);
        },
        () => {
          // New Request Creation with Attachment
          const AttachmentTitle = localStorage.getItem('attachmentTitle');
          const AttachmentUrl = localStorage.getItem('attachmentUrl');
          const PublicId = localStorage.getItem('publicId');
          this.model.attachmentTitle = AttachmentTitle;
          this.model.attachmentUrl = AttachmentUrl;
          this.model.publicId = PublicId;

          this.id = this.requestService.addRequest(this.model).subscribe(
            () => {
              this.alertify.success('Request Added Sucessfully');
            },
            (error) => {
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
      this.id = this.requestService.addRequest(this.model).subscribe(
        () => {
          this.alertify.success('Request Added Sucessfully');
        },
        (error) => {
          this.alertify.error(error);
        },
        () => {
          this.requestbyUser();
        }
      );
    }
    localStorage.removeItem('attachmentTitle');
    localStorage.removeItem('attachmentUrl');
    localStorage.removeItem('publicId');
  }

  onChangeProject(event): void {
    this.master.getModulesbyProject(event.target.value).subscribe(
      (modules: Module[]) => {
        this.modules = modules;
      },
      (error) => {
        this.alertify.error(error);
      },
      () => {
        this.moduleActive = true;
      }
    );
  }

  onChange(event) {
    this.toFile = event.target.files[0];
    if (this.toFile) {
      if (this.toFile.type === 'application/pdf')
      {
        this.alertify.error('PDF format is not acceptable');
        this.fileSelected = null;
      } else
      {
      this.fileSelected = this.toFile;
      console.log(this.toFile);
      }
    }
  }

  requestbyUser() {
    this.userId = this.auth.getUserId();
    this.requestUrl = 'requests/user/' + this.userId;
    this.router.navigate([this.requestUrl]);
  }
}
