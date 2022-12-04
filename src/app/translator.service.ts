import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class TranslatorService {
  public lang = "en";
  private headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Ocp-Apim-Subscription-Key', '<25e969097e8a4708b812b982c989b9ea>')
    .set('Ocp-Apim-Subscription-Region', 'eastus');
  private url = "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to="

  constructor(private httpClien: HttpClient) {
    if (localStorage.getItem('lamguage')) {
      this.lang = localStorage.getItem('lamguage');
    }
  }

  translateText(input: string): Observable<string> {
    let body = [
      {
        "text": input
      }
    ]
    return this.httpClien.post<string>(this.url + this.lang, body, { headers: this.headers })
      .pipe(map(data => data[0]["translations"][0].text), catchError(err => {
        console.log('caught mapping error and rethrowing', err);
        return of(input);
      }));
  }
}
