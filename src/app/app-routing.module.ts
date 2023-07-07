import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: 'pokemon', pathMatch: 'full' },
  { path: 'pokemon', component: AppComponent },
  { path: 'pokemon/:name', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
