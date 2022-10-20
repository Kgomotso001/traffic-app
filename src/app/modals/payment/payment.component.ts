import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {


  quoteForm: FormGroup;
  sending = false;
  sent;

  constructor(
    private formBldr: FormBuilder,
    private contactSrvc: ContactService,
  ) { }

  ngOnInit(): void {
    this.quoteForm = this.formBldr.group({

      firstName: [
        null, [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/)
        ]
      ],
      lastName: [
        null, [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/)
        ]
      ],
      email: [
        null, [
          Validators.required,
          Validators.email
        ]
      ],
      phone: [
        null, [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern("^[0-9]*$")
        ]
      ],
      quantity: [
        null, [
          Validators.required,
        ]
      ],
      message: [
        null, [
          Validators.required,
          Validators.minLength(2),
        ]
      ],

    });

  }

  errorMessage(ctrl): string {
    const form: FormControl = (this.quoteForm.get(ctrl) as FormControl);
    return form.hasError('required') ?
      'is required' :
      form.hasError('maxlength') ?
        'is too long' :
        form.hasError('minlength') ?
          'is too short' :
          form.hasError('pattern') ? 'can not contain special characters or numbers' : form.hasError('email') ? 'is invalid' : '';
  }

  phoneErrorMessage(ctrl): string {
    const form: FormControl = (this.quoteForm.get(ctrl) as FormControl);
    return form.hasError('required') ? 'is required' :
      form.hasError('pattern') ? 'should be only contain numbers' :
        form.hasError('maxlength') ? 'is too long' :
          form.hasError('minlength') ? 'is too short' : '';
  }

  sendMessage(formDirective) {
    this.sending = true;
    let email = {
      name: `${this.quoteForm.value.firstName} ${this.quoteForm.value.lastName}`,
      replyTo: this.quoteForm.value.email,
      subject: "Quote from " + this.quoteForm.value.firstName + ' ' + this.quoteForm.value.lastName,
      message: `${this.quoteForm.value.firstName} ${this.quoteForm.value.lastName} has requested ${this.quoteForm.value.quantity} vouchers. contact number is ${this.quoteForm.value.phone}. Message: ${this.quoteForm.value.message}`
    };

    if (this.quoteForm.status != "VALID") {
      return
    }



    this.contactSrvc.sendEmail(email).then(
      resp => {
        //console.log(resp);

        formDirective.resetForm();
        this.quoteForm.reset()
        this.sent = true;
        this.sending = false;
      }
    ).catch(error => {
      //console.log(error);
      formDirective.resetForm();
      this.quoteForm.reset();
      this.sent = false;
      this.sending = false;

    });

  }

}
