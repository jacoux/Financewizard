import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { EffectsEffects } from './users.effects';

describe('EffectsEffects', () => {
  let actions$: Observable<any>;
  let effects: EffectsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EffectsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(EffectsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
