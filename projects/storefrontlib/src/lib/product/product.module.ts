import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducerToken, reducerProvider } from './store/reducers/index';
import { effects } from './store/effects/index';
import { metaReducers } from './store/reducers/index';

import { MediaModule } from './../ui/components/media/media.module';
import { CmsModule } from './../cms/cms.module';

import { MaterialModule } from './../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

// guards
import { guards } from './guards/index';

// converter
import { services } from './converters/index';
import { ProductListModule } from './components/product-list/product-list.module';
import { ProductDetailsModule } from './components/product-details/product-details.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MediaModule,
    MaterialModule,
    FlexLayoutModule,
    CmsModule,
    StoreModule.forFeature('products', reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  exports: [ProductListModule, ProductDetailsModule],
  providers: [reducerProvider, ...services, ...guards]
})
export class ProductModule {}