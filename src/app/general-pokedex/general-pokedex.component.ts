import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { tap } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
@Component({
  selector: 'app-general-pokedex',
  templateUrl: './general-pokedex.component.html',
  styleUrls: ['./general-pokedex.component.css'],
})
export class GeneralPokedexComponent {
  @Output() pokemonSelected = new EventEmitter<any>();
  @Input() selectedCard!: any;
  imNextCompensated: boolean = false;
  imPreviousCompensated: boolean = false;
  cards: Pokemon[] = [];
  totalItems: number = 10;
  allItemsBetweenTen: any[];
  currentPopularItemsPosition: number = 0;
  endPopularItemsPosition: number = 5;
  @Input() idOrName!: any;

  constructor(private pokemonsService: PokemonService) {
    this.allItemsBetweenTen = [];
  }

  ngOnInit() {
    this.pokemonsService
      .getListPokemonsInGeneral(0, 10)
      .pipe(
        tap((data) => {
          for (let i = 0; i < data.results.length; i++) {
            const name = data.results[i].name;
            this.allItemsBetweenTen.push(name);
          }
        })
      )
      .subscribe({
        next: () => {
          for (let i = 0; i < this.allItemsBetweenTen.length; i++) {
            this.pokemonsService
              .getPokemonDetail(this.allItemsBetweenTen[i])
              .pipe(
                tap((data) => {
                  this.cards.push(data);
                })
              )
              .subscribe();
          }
        },
        error: (error) => {
          console.log('Ocorreu um erro ao obter a lista de Pokemons:', error);
        },
      });
  }
  selectPokemon(pokemon: any) {
    this.selectedCard = pokemon;
    this.pokemonSelected.emit(pokemon);
  }
  scrollCarousel(arrowDirection: string) {
    setTimeout(() => {
      this.allItemsBetweenTen = [];

      if (arrowDirection === 'next') {
        this.cards = [];
        this.currentPopularItemsPosition += 10;
        this.endPopularItemsPosition = this.currentPopularItemsPosition + 10;
        this.pokemonsService
          .getListPokemonsInGeneral(
            this.currentPopularItemsPosition,
            this.totalItems
          )
          .pipe(
            tap((data) => {
              for (let i = 0; i < data.results.length; i++) {
                const name = data.results[i].name;
                this.allItemsBetweenTen.push(name);
              }
            })
          )
          .subscribe({
            next: () => {
              for (let i = 0; i < this.allItemsBetweenTen.length; i++) {
                this.pokemonsService
                  .getPokemonDetail(this.allItemsBetweenTen[i])
                  .pipe(
                    tap((data) => {
                      this.cards.push(data);
                    })
                  )
                  .subscribe();
              }
            },
            error: (error) => {
              console.log(
                'Ocorreu um erro ao obter a lista de Pokemons:',
                error
              );
            },
          });
      } else if (
        arrowDirection === 'previous' &&
        this.currentPopularItemsPosition !== 0
      ) {
        this.cards = [];
        this.currentPopularItemsPosition -= 10;
        this.endPopularItemsPosition = this.currentPopularItemsPosition - 10;
        this.pokemonsService
          .getListPokemonsInGeneral(
            this.currentPopularItemsPosition,
            this.totalItems
          )
          .pipe(
            tap((data) => {
              for (let i = 0; i < data.results.length; i++) {
                const name = data.results[i].name;
                this.allItemsBetweenTen.push(name);
              }
            })
          )
          .subscribe({
            next: () => {
              for (let i = 0; i < this.allItemsBetweenTen.length; i++) {
                this.pokemonsService
                  .getPokemonDetail(this.allItemsBetweenTen[i])
                  .pipe(
                    tap((data) => {
                      this.cards.push(data);
                    })
                  )
                  .subscribe();
              }
            },
            error: (error) => {
              console.log(
                'Ocorreu um erro ao obter a lista de Pokemons:',
                error
              );
            },
          });
      }
    }, 300);
  }
}
