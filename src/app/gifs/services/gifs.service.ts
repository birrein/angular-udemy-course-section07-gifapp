import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _history: string[] = [];

  public gifList: Gif[] = [];

  get history() {
    return [...this._history];
  }

  constructor(private http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.gifList = JSON.parse(localStorage.getItem('results')!) || [];
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
      .get<SearchResponse>(`${environment.giphyApiUrl}/search?`, { params })
      .subscribe((resp) => {
        this.gifList = resp.data;
        localStorage.setItem('results', JSON.stringify(this.gifList));
      });
  };
}
