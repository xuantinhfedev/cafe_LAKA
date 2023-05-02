import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Toastr } from '../services/toastr.service';
import { ContactService } from '../services/contact/contact.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  onContact = new EventEmitter();
  contactForm: any = FormGroup;
  responseMessage: any = '';
  name: any = '';
  email: any = '';
  contactNumber: any = '';
  message: any = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private toastr: Toastr,
    public dialogRef: MatDialogRef<ContactComponent>,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.emailRegex)],
      ],
      contactNumber: [null, Validators.required],
      message: [null, Validators.required],
    });
  }

  async handleSubmit() {
    let res = await this.contactService.postData(this.contactForm.value);
    if (res.results.responseCode == '200') {
      this.dialogRef.close();
      this.onContact.emit();
    } else {
      this.dialogRef.close();
      if (res.results.message) {
        this.responseMessage = res.results.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.toastr.toastError(this.responseMessage, 'Lỗi');
    }
  }
}
