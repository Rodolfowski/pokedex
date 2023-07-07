import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() searchIdOrNameChange = new EventEmitter<any>();
  @Input() idOrName: any;
  isMobile = false;

  constructor() {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkMediaQuery();
  }

  ngOnInit() {
    this.checkMediaQuery();
  }

  checkMediaQuery() {
    this.isMobile = window.innerWidth <= 1210;
  }
  searchPokemonIdorName(inputValue: string | number) {
    this.searchIdOrNameChange.emit(inputValue);
  }
}
