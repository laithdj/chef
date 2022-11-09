import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneratePromoCodeComponent } from './generate-promo-code/generate-promo-code.component';
import { PromoCodesComponent } from './promo-codes.component';

const routes: Routes = [
  {
    path: '',
    component: PromoCodesComponent
  },
  {
    path: 'GenerateCode',
      component:GeneratePromoCodeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromoCodesRoutingModule { }
