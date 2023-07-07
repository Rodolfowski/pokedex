import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) {}

  getPopularPokemons(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/1`);
  }

  getListPokemonsInGeneral(
    offset: number = 0,
    limit: number = 20
  ): Observable<any> {
    return this.http.get(`${this.apiUrl}?offset=${offset}&limit=${limit}`);
  }
  getPokemonDetail(pokemon: string | number) {
    return this.http.get<any>(this.apiUrl + pokemon);
  }
}
