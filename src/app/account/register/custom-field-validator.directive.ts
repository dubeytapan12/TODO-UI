import { Directive, Input } from "@angular/core";
import {
  Validator,
  AbstractControl,
  ValidationErrors,
  NG_VALIDATORS,
  FormGroup,
} from "@angular/forms";

@Directive({
  selector: "[appCustomFieldValidator]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CustomFieldValidatorDirective,
      multi: true,
    },
  ],
})
export class CustomFieldValidatorDirective implements Validator {
  constructor() {}
  @Input("firstField") firstField: string;
  @Input("secondField") secondField: string;
  validate(form: FormGroup): ValidationErrors {
    if (!form.controls[this.firstField] || !form.controls[this.secondField]) {
      return null;
    }
    if (
      Object.keys(form.controls[this.firstField].errors || []).filter(
        (u) => u !== "comareFieldValidator"
      ).length > 0 ||
      Object.keys(form.controls[this.secondField].errors || []).filter(
        (u) => u !== "comareFieldValidator"
      ).length > 0
    ) {
      return null;
    }

    if (
      form.controls[this.firstField].value !==
      form.controls[this.secondField].value
    ) {
      form.controls[this.firstField].setErrors({ comareFieldValidator: true });
      form.controls[this.secondField].setErrors({ comareFieldValidator: true });
      return { comareFieldValidator: true };
    }
    if (form.controls[this.firstField].hasError("comareFieldValidator")) {
      delete form.controls[this.firstField].errors["comareFieldValidator"];
      form.controls[this.firstField].setErrors(null);
    }
    if (form.controls[this.secondField].hasError("comareFieldValidator")) {
      delete form.controls[this.secondField].errors["comareFieldValidator"];
      form.controls[this.secondField].setErrors(null);
    }
    return null;
  }
}
