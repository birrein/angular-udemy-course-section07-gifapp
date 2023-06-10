import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class CardListComponent {
  get results() {
    return this.gifsService.results;
  }

  constructor(private gifsService: GifsService) {}
}
