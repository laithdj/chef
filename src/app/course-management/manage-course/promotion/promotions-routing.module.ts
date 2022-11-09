import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneratePromoCodeComponent } from './promo-codes/generate-promo-code/generate-promo-code.component';
import { PromoCodesComponent } from './promo-codes/promo-codes.component';
import { PromotionComponent } from './promotion.component';

const routes: Routes = [
  {
  path: '',
  component: PromotionComponent},
  {
    path:'promocode',
    // component:PromoCodesComponent
    loadChildren :()=> import("./promo-codes/promo-codes.module").then(m=>m.PromoCodesModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionsRoutingModule { }
