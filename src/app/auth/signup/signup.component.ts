import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";
import { mimeType } from "./mime-type.validator";

@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent {
  isLoading = false;
  form: FormGroup;

  constructor(public authService: AuthService) {}



  onFilePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ doc: file });
    this.form.get("doc").updateValueAndValidity();
    const reader = new FileReader();
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password, form.value.candidateName, form.value.mobile, form.value.experience, form.value.technology);
  }
}
