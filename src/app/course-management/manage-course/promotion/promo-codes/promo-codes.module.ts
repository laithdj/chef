import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromoCodesRoutingModule } from './promo-codes-routing.module';
import { CoreModule } from 'src/app/common/modules/core/core.module';
import { GeneratePromoCodeComponent } from './generate-promo-code/generate-promo-code.component';


@NgModule({
  declarations: [
    GeneratePromoCodeComponent
  ],
  imports: [
    CommonModule,
    PromoCodesRoutingModule,
    CoreModule
  ]
})
export class PromoCodesModule { }
