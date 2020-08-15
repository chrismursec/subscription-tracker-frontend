import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: [ './delete-account-dialog.component.scss' ]
})
export class DeleteAccountDialogComponent implements OnInit {
  id;

  constructor(
    private dialogRef: MatDialogRef<DeleteAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private authService: AuthService
  ) {
    this.id = data.id;
  }

  close() {
    this.dialogRef.close();
  }

  onDeleteUser() {
    this.authService.deleteUser(this.id);
    this.close();
  }

  ngOnInit() {}
}
