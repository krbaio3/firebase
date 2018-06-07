import { Component, OnInit, Input } from '@angular/core';
import { FileUpload } from '../../models/fileUpload';
import { UploadFileService } from '../../services/upload-file.service';

@Component({
  selector: 'app-details-upload',
  templateUrl: './details-upload.component.html',
  styleUrls: ['./details-upload.component.scss']
})
export class DetailsUploadComponent implements OnInit {

  @Input() fileUpload: FileUpload;

  constructor(private uploadService: UploadFileService) {}

  ngOnInit() {}

  deleteFileUpload( fileUpload) {
    this.uploadService.deleteFileupload(fileUpload);
  }
}
