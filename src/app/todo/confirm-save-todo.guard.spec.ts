import { TestBed } from '@angular/core/testing';

import { ConfirmSaveTodoGuard } from './confirm-save-todo.guard';

describe('ConfirmSaveTodoGuard', () => {
  let guard: ConfirmSaveTodoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConfirmSaveTodoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
