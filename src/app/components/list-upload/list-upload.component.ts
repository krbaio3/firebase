import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../services/upload-file.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.scss']
})
export class ListUploadComponent implements OnInit {
  fileUploads: any[];

  constructor(private uploadService: UploadFileService) {}

  ngOnInit() {
    // Use snapshotChanges().map() to store the key
    this.uploadService
      .getFileUpload(1)
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      )
      .subscribe(fileUploads => {
        this.fileUploads = fileUploads;
      });
  }
}
