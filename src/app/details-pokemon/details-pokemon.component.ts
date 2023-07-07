import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChartOptions, ChartType, ChartTypeRegistry } from 'chart.js';

@Component({
  selector: 'app-details-pokemon',
  templateUrl: './details-pokemon.component.html',
  styleUrls: ['./details-pokemon.component.css'],
})
export class DetailsPokemonComponent implements OnInit {
  @Input() data!: any;
  @Input() pokemonFound!: boolean;
  @Output() closeModalEvent = new EventEmitter<boolean>();
  selectedPokemon!: any;
  selectedImage: string = '';

  ngOnInit(): void {}

  chartOptions: ChartOptions<keyof ChartTypeRegistry> = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#C4C4C4',
        },
        angleLines: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: 300,
        ticks: {
          color: '#C4C4C4',
          font: {
            family: 'Nunito',
          },
          callback: (value: any) => {
            if (value === 60) return '20%';
            if (value === 150) return '50%';
            if (value === 240) return '80%';
            return null;
          },
          stepSize: 10,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  getChartData() {
    const dynamicData = [
      this.selectedPokemon.stats?.[0].base_stat,
      this.selectedPokemon.stats?.[2].base_stat,
      this.selectedPokemon.stats?.[5].base_stat,
      this.selectedPokemon.stats?.[1].base_stat,
    ];
    return {
      datasets: [
        {
          data: dynamicData,
          backgroundColor: ['#C4F789', '#F7802A', '#49D0B0', '#EA686D'],
        },
      ],
      labels: ['Vida', 'Defesa', 'Velocidade', 'Ataque'],
    };
  }

  ngOnChanges() {
    this.selectedPokemon = this.data;
  }

  closeModal() {
    this.closeModalEvent.emit(false);
  }

  getTypeColor(typeName: string): string {
    switch (typeName) {
      case 'grass':
        return '#9bcc50';
      case 'fire':
        return '#fd7d24';
      case 'water':
        return '#30a7d7';
      case 'poison':
        return '#b97fc9';
      case 'ice':
        return '#51c4e7';
      case 'psychic':
        return '#f366b9;';
      default:
        return 'black'; // Default background color
    }
  }

  getNonNullSprites(sprites: any): any[] {
    if (!sprites || typeof sprites !== 'object') {
      return [];
    }

    return Object.entries(sprites).filter(([key, value]) => {
      return value !== null && typeof value !== 'object';
    });
  }

  getSpriteImageUrl(sprite: string): string {
    if (sprite === 'official-artwork') {
      return this.selectedPokemon.sprites.other['official-artwork']
        .front_default;
    } else {
      return sprite[1];
    }
  }

  changeSelectedImage(imageUrl: string) {
    this.selectedImage = imageUrl;
  }
}
