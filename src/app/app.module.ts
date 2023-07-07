import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MostSearchComponent } from './most-search/most-search.component';
import { GeneralPokedexComponent } from './general-pokedex/general-pokedex.component';
import { DetailsPokemonComponent } from './details-pokemon/details-pokemon.component';
import { PokemonService } from './services/pokemon.service';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MostSearchComponent,
    GeneralPokedexComponent,
    DetailsPokemonComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgChartsModule],
  providers: [PokemonService],
  bootstrap: [AppComponent],
})
export class AppModule {}
