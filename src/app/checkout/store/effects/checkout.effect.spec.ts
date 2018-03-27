import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Actions } from '@ngrx/effects';

import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { OccCartService } from '../../../occ/cart/cart.service';
import { ConfigService } from '../../../occ/config.service';
import * as fromEffects from './checkout.effect';
import * as fromActions from '../actions/checkout.action';

@Injectable()
class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

function getActions() {
  return new TestActions();
}

describe('Checkout effect', () => {
  let cartService: OccCartService;
  let entryEffects: fromEffects.CheckoutEffects;
  let actions$: TestActions;

  const userId = 'testUserId';
  const cartId = 'testCartId';
  const address: any = {
    id: 'testAddressId',
    firstName: 'John',
    lastName: 'Doe',
    titleCode: 'mr',
    line1: 'Toyosaki 2 create on cart'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCartService,
        fromEffects.CheckoutEffects,
        ConfigService,
        { provide: Actions, useFactory: getActions }
      ]
    });

    entryEffects = TestBed.get(fromEffects.CheckoutEffects);
    cartService = TestBed.get(OccCartService);
    actions$ = TestBed.get(Actions);

    spyOn(cartService, 'createAddressOnCart').and.returnValue(of(address));
    spyOn(cartService, 'setDeliveryAddress');
  });

  describe('addDeliveryAddress$', () => {
    it('should add delivery address to cart', () => {
      const action = new fromActions.AddDeliveryAddress({
        userId: userId,
        cartId: cartId,
        address: address
      });
      const completion = new fromActions.AddDeliveryAddressSuccess(address);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.addDeliveryAddress$).toBeObservable(expected);
      expect(cartService.setDeliveryAddress).toHaveBeenCalledWith(
        'testUserId',
        'testCartId',
        'testAddressId'
      );
    });
  });
});