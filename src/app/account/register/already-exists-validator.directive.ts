import { Directive, Input } from "@angular/core";
import {
  AsyncValidator,
  AbstractControl,
  NG_ASYNC_VALIDATORS,
} from "@angular/forms";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

@Directive({
  selector: "[appAlreadyExistsValidator]",
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: AlreadyExistsValidatorDirective,
      multi: true,
    },
  ],
})
export class AlreadyExistsValidatorDirective implements AsyncValidator {
  @Input("records") records: Observable<string[]>;

  constructor() {}
  validate(
    control: AbstractControl
  ):
    | Promise<import("@angular/forms").ValidationErrors | null>
    | import("rxjs").Observable<
        import("@angular/forms").ValidationErrors | null
      > {
    if (
      !control ||
      Object.keys(control.errors || []).filter((u) => u !== "alreadyExists")
        .length > 0
    ) {
      return of(null);
    }

    return this.records.pipe(
      map((item) => {
        return item.indexOf(control.value) > -1
          ? { alreadyExists: true }
          : null;
      })
    );
  }
}
