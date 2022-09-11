import { TestBed } from '@angular/core/testing';

import { UpdateRecipeService } from './update-recipe.service';

describe('UpdateRecipeService', () => {
  let service: UpdateRecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateRecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
