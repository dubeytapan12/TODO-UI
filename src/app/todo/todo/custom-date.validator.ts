import { AbstractControl, ValidationErrors, FormGroup } from "@angular/forms";

export class CustomDateValidator {
  static dateValidator(form: FormGroup): ValidationErrors | null {
    const startDate = form.get("startDate");
    const endDate = form.get("endDate");

    if (startDate.pristine || endDate.pristine) {
      return null;
    }

    if (new Date(startDate.value) > new Date(endDate.value)) {
      return { dateValidator: true };
    }
    return null;
  }
}
