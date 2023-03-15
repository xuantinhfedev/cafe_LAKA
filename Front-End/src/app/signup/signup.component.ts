import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Toastr } from '../services/toastr.service';
import { UserService } from '../services/user/user.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: any = FormGroup;
  responseMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr: Toastr,
    private dialogRef: MatDialogRef<SignupComponent>,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [
        null,
        // [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
        [Validators.required],
      ],
      email: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.emailRegex)],
      ],
      contactNumber: [
        null,
        [
          Validators.required,
          Validators.pattern(GlobalConstants.contactNumberRegex),
        ],
      ],
      password: [null, [Validators.required]],
    });
  }

  async handleSubmit() {
    this.ngxService.start();
    var formData = this.signupForm.value;
    var data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      password: formData.password,
    };

    let response = await this.userService.signUp(data);
    console.log('Response: ', response);
    if (response?.status == '200') {
      this.ngxService.stop();
      this.dialogRef.close();
      this.responseMessage = response?.message;
      this.toastr.toastSuccess(this.responseMessage, 'Thành công');
      this.router.navigate(['/']);
    } else {
      this.ngxService.stop();
      if (response.message) {
        console.log('Bước Message: ');
        this.responseMessage = response.error?.message;
      } else {
        console.log('Bước Global: ');
        this.responseMessage = GlobalConstants.genericError;
      }
      this.toastr.toastError(this.responseMessage, 'Lỗi');
    }
  }
}
