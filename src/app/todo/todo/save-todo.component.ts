import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from "@angular/forms";
import { formatDate } from "@angular/common";
import { CustomDateValidator } from "./custom-date.validator";
import { debounceTime } from "rxjs/operators";
import { TodoService } from "../todo.service";
import { TODO } from "./todo";

@Component({
  selector: "app-save-todo",
  templateUrl: "./save-todo.component.html",
  styleUrls: ["./save-todo.component.css"],
})
export class SaveTodoComponent implements OnInit {
  todoForm: FormGroup;
  alert = { type: "", isShowAlert: false, message: "" };
  validatorObj = {
    taskName: {
      required: "task name is required",
      minlength: "Task Name should be greater than 3 char",
      errorMessage: "",
    },
    category: { required: "Please select category", errorMessage: "" },
    startDate: { required: "start date is required", errorMessage: "" },
    endDate: { required: "end date is required", errorMessage: "" },
    autoClose: { errorMessage: "" },
  };
  constructor(private fb: FormBuilder, private service: TodoService) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      taskName: ["", [Validators.required, Validators.minLength(3)]],
      category: ["", Validators.required],
      dateGroup: this.fb.group(
        {
          startDate: ["", Validators.required],
          endDate: ["", Validators.required],
        },
        { validators: CustomDateValidator.dateValidator }
      ),
      autoClose: [true],
    });

    this.todoForm
      .get("autoClose")
      .valueChanges.subscribe((item) => this.isAutoClose(item));

    this.todoForm.valueChanges.pipe(debounceTime(3000)).subscribe((item) => {
      Object.keys(this.todoForm.controls).forEach((key) => {
        if (this.todoForm.get(key) instanceof FormGroup) {
          const dateGroup: FormGroup = this.todoForm.get(key) as FormGroup;

          Object.keys(dateGroup.controls).forEach((childKey) => {
            this.setTodoValidations(dateGroup.get(childKey), childKey);
          });
          if (dateGroup.errors?.dateValidator) {
            this.validatorObj.endDate.errorMessage =
              "end date should be greater than or equal to start date";
          }
        } else {
          this.setTodoValidations(this.todoForm.get(key), key);
        }
      });
    });
  }

  saveTodo() {
    const todoModel: TODO = {
      ...this.todoForm.value,
      startDate: this.todoForm.value.dateGroup.startDate,
      endDate: this.todoForm.value.dateGroup.endDate,
    };

    todoModel.endDate =
      todoModel.endDate.toString() === "" ? null : todoModel.endDate;
    this.service.saveTodo(todoModel).subscribe((item) => {
      this.todoForm.reset();
      this.alert.isShowAlert = true;
      this.alert.type = "success";
      this.alert.message = "record saved";
    });
  }
  private setTodoValidations(control: AbstractControl, key: string) {
    if (control.pristine || control.valid) {
      this.validatorObj[key].errorMessage = "";
    } else {
      Object.keys(control.errors).forEach((errorKey) => {
        this.validatorObj[key].errorMessage = this.validatorObj[key][errorKey];
      });
    }
  }
  TestData() {
    this.todoForm.patchValue({
      startDate: formatDate(new Date(Date.now()), "yyyy-MM-dd", "en"),
      endDate: formatDate(new Date(Date.now()), "yyyy-MM-dd", "en"),
      autoClose: false,
    });
  }
  isAutoClose(isAutoClose: boolean) {
    const endDate = this.todoForm.get("dateGroup.endDate");
    if (isAutoClose) {
      // end should be mandatory
      endDate.clearValidators();
      endDate.setValidators([Validators.required]);
      endDate.updateValueAndValidity();
    } else {
      // end date should be optional
      endDate.clearValidators();
      endDate.updateValueAndValidity();
    }
  }
  closeAlert() {
    this.alert.isShowAlert = false;
  }
}
