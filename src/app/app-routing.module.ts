import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { FaturamentoComponent } from './views/faturamento/faturamento.component';

const routes: Routes = [
  { path: '',  component: HomeComponent},
  { path: 'faturamento',  component: FaturamentoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
