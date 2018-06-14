import { Component, OnInit } from '@angular/core';
import { FileUpload } from '../../models/fileUpload';
import { UploadFileService } from '../../services/upload-file.service';

@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.scss']
})
export class FormUploadComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { porcentaje: number } = { porcentaje: 0 };

  constructor(private uploadService: UploadFileService) {}

  ngOnInit() {}

  selectFile(event) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileStorage(this.currentFileUpload, this.progress);
  }
}
