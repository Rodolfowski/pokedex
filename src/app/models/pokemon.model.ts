export interface Pokemon {
  abilities?: Abilitie[];
  base_experience?: number;
  forms: Form[];
  game_indices: GameIndice[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: any;
  name: string;
  order: number;
  past_types: any;
  species: any;
  sprites: any;
  stats: any;
  types: any;
  weight: number;
}
interface Abilitie {
  name?: string;
  url?: string;
}
interface Form {
  name?: string;
  url?: string;
}
interface GameIndice {
  game_index?: number;
  version?: Version;
}
export interface Version {
  name?: string;
  url?: string;
}
