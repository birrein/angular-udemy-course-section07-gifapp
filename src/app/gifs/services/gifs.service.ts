import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SearchGifsResults, Gif } from '../interfaces/search-gifs-results';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _history: string[] = [];

  public results: Gif[] = [];

  get history() {
    return [...this._history];
  }

  constructor(private http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  searchGifs = (query: string) => {
    query = query.trim().toLowerCase();
    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 10);

      localStorage.setItem('history', JSON.stringify(this._history));
    }
    const params = new HttpParams()
      .set('api_key', environment.giphyApiKey)
      .set('limit', '10')
      .set('q', query);
    this.http
      .get<SearchGifsResults>(`${environment.giphyApiUrl}/search?`, { params })
      .subscribe((resp) => {
        this.results = resp.data;
        localStorage.setItem('results', JSON.stringify(this.results));
      });
  };
}
