import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { DeleteAccountDialogComponent } from '../delete-account-dialog/delete-account-dialog.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings-root',
  templateUrl: './settings-root.component.html',
  styleUrls: [ './settings-root.component.scss' ]
})
export class SettingsRootComponent implements OnInit {
  userId: string;
  public changePasswordForm: FormGroup;

  constructor(private authService: AuthService, public dialog: MatDialog, private snackBar: MatSnackBar) {}

  onChangePassword() {
    if (this.changePasswordForm.value.newPassword !== this.changePasswordForm.value.confirmNewPassword) {
      const snackBarRef = this.snackBar.open('Passwords do not match', 'Close');
    }

    const formData = {
      oldPassword: this.changePasswordForm.value.oldPassword,
      newPassword: this.changePasswordForm.value.newPassword
    };

    this.authService.changePassword(formData).subscribe(
      (response) => {
        const snackBarRef = this.snackBar.open('Password Changed.', 'Close');
        this.changePasswordForm.reset();
      },
      (error) => {
        const snackBarRef = this.snackBar.open('Password not changed. Please try again.', 'Close');
      }
    );
  }

  openDeleteUserDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: this.userId
    };
    this.dialog.open(DeleteAccountDialogComponent, dialogConfig);
  }

  ngOnInit() {
    this.userId = this.authService.getUserId();

    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl(null, {
        validators: [ Validators.compose([ Validators.required, Validators.minLength(6) ]) ]
      }),
      newPassword: new FormControl(null, {
        validators: [ Validators.compose([ Validators.required, Validators.minLength(6) ]) ]
      }),
      confirmNewPassword: new FormControl(null, {
        validators: [ Validators.compose([ Validators.required, Validators.minLength(6) ]) ]
      })
    });
  }
}
