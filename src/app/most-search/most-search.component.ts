import {
  AfterViewChecked,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { tap } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-most-search',
  templateUrl: './most-search.component.html',
  styleUrls: ['./most-search.component.css'],
})
export class MostSearchComponent implements AfterViewChecked {
  @ViewChildren('liElements') liElements!: QueryList<any>;
  @Output() pokemonSelected = new EventEmitter<any>();
  @Input() selectedCard!: any;
  imNextCompensated: boolean = false;
  imPreviousCompensated: boolean = false;
  cards: Pokemon[] = [];
  totalItems: number = 20;
  allItemsBetweenTweenty: any[];
  currentPopularItemsPosition: number = 0;
  endPopularItemsPosition: number = 20;
  visibleItemsInPopular: number = 0;
  windowResized: boolean = false;
  constructor(private pokemonsService: PokemonService) {
    this.allItemsBetweenTweenty = [];
  }

  ngOnInit() {
    this.pokemonsService
      .getListPokemonsInGeneral(0, 20)
      .pipe(
        tap((data) => {
          for (let i = 0; i < data.results.length; i++) {
            const name = data.results[i].name;
            this.allItemsBetweenTweenty.push(name);
          }
        })
      )
      .subscribe({
        next: () => {
          for (let i = 0; i < this.allItemsBetweenTweenty.length; i++) {
            this.pokemonsService
              .getPokemonDetail(this.allItemsBetweenTweenty[i])
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

  ngAfterViewChecked() {
    this.countVisibleLiElements();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.countVisibleLiElements();
  }
  selectPokemon(pokemon: any) {
    this.selectedCard = pokemon;
    this.pokemonSelected.emit(pokemon);
  }
  countVisibleLiElements() {
    const visibleLiElements = this.liElements.filter((li) =>
      this.isElementVisible(li.nativeElement)
    );

    let liCount = visibleLiElements.length;
    liCount = liCount === 0 ? 1 : liCount;
    this.visibleItemsInPopular = liCount;
  }

  isElementVisible(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const isElementVisible = rect.top >= 0 && rect.bottom <= windowHeight;
    return isElementVisible;
  }

  scrollCarousel(arrowDirection: string) {
    this.countVisibleLiElements();
    this.cards.sort((a, b) => a.id - b.id);

    setTimeout(() => {
      if (arrowDirection === 'next') {
        this.currentPopularItemsPosition += this.visibleItemsInPopular;
        this.endPopularItemsPosition =
          this.currentPopularItemsPosition + this.visibleItemsInPopular;
        if (
          this.imNextCompensated == true ||
          this.imPreviousCompensated == true
        ) {
          this.currentPopularItemsPosition = 0;
          this.endPopularItemsPosition = this.visibleItemsInPopular;
          this.imNextCompensated = false;
          this.imPreviousCompensated = false;
        } else if (
          this.currentPopularItemsPosition >= this.totalItems &&
          this.totalItems % this.visibleItemsInPopular == 0
        ) {
          this.currentPopularItemsPosition = 0;
          this.endPopularItemsPosition = this.visibleItemsInPopular;
        } else if (
          this.totalItems % this.visibleItemsInPopular != 0 &&
          this.currentPopularItemsPosition + this.visibleItemsInPopular >
            this.totalItems
        ) {
          this.currentPopularItemsPosition =
            this.totalItems - this.visibleItemsInPopular;
          this.endPopularItemsPosition = this.totalItems;
          this.imNextCompensated = true;
        }
      } else {
        this.currentPopularItemsPosition -= this.visibleItemsInPopular;
        this.endPopularItemsPosition =
          this.endPopularItemsPosition - this.visibleItemsInPopular;
        if (
          this.currentPopularItemsPosition < 0 &&
          this.totalItems % this.visibleItemsInPopular == 0
        ) {
          this.endPopularItemsPosition = this.totalItems;
          this.currentPopularItemsPosition =
            this.totalItems - this.visibleItemsInPopular;
        } else if (
          this.currentPopularItemsPosition < 0 &&
          this.totalItems % this.visibleItemsInPopular != 0 &&
          this.currentPopularItemsPosition == 0 - this.visibleItemsInPopular
        ) {
          this.currentPopularItemsPosition =
            this.totalItems - this.visibleItemsInPopular;
          this.endPopularItemsPosition = this.totalItems;
          this.imPreviousCompensated = true;
        } else if (
          this.currentPopularItemsPosition < 0 &&
          this.totalItems % this.visibleItemsInPopular != 0 &&
          this.currentPopularItemsPosition != 0 - this.visibleItemsInPopular
        ) {
          this.currentPopularItemsPosition = 0;
          this.endPopularItemsPosition = this.visibleItemsInPopular;
        }
      }
    }, 300);
  }
}
