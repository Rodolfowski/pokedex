import { AfterContentInit, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PokemonService } from './services/pokemon.service';
import { EMPTY, catchError, tap } from 'rxjs';
import { Pokemon } from './models/pokemon.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'Pokedex Layout 1';
  selectedPokemon: any;
  showModal: boolean = false;
  currentUrl!: string;
  idOrName!: any;
  pokemonFound: boolean = false;

  constructor(
    private router: Router,
    private location: Location,
    private pokemonsService: PokemonService
  ) {}

  ngOnInit() {
    this.currentUrl = this.location.path();
    if (this.currentUrl !== '/pokemon' && this.currentUrl !== '') {
      this.idOrName = this.currentUrl
        .substring('/pokemon/'.length)
        .toLowerCase();
      this.searchAndReturIdAndName();
    } else {
    }
  }

  handlePokemonSelected(pokemon: any) {
    this.selectedPokemon = pokemon;
    this.pokemonFound = true;
    this.openModal();
  }
  openModal() {
    this.showModal = true;
  }

  closeModal(value: any) {
    this.showModal = value;
    this.selectedPokemon = undefined;
    this.router.navigate(['/']);
  }
  handleSearchIdOrNameChange(data: any) {
    this.idOrName = data.toLowerCase();
    if (this.idOrName !== undefined && this.idOrName !== '') {
      this.searchAndReturIdAndName();
    }
  }

  searchAndReturIdAndName() {
    this.pokemonsService
      .getPokemonDetail(this.idOrName)
      .pipe(
        tap((data) => {
          this.handlePokemonSelected(data);
          this.router.navigate(['/pokemon/' + this.idOrName]);
          this.pokemonFound = true;
        })
      )
      .subscribe({
        next: () => {},
        error: (error) => {
          this.router.navigate(['/pokemon/' + this.idOrName]);
          this.pokemonFound = false;
          this.openModal();
          console.log('Ocorreu um erro ao obter a lista de Pokemons:', error);
        },
      });
  }
}
