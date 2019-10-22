import {Observable, of} from 'rxjs';
import {Injectable, Inject } from '@angular/core';
import {Hero} from './hero.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {LoggerService} from '../../../shared/services/logger.service';
import {AppConfig} from '../../../configs/app.config';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {EndpointsConfig} from '../../../configs/endpoints.config';
import {CookieService} from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private headers = new HttpHeaders().set('Authorization', AppConfig.jwt);
  constructor(private httpClient: HttpClient,
              private snackBar: MatSnackBar,
              private i18n: I18n,
              private cookieService: CookieService
              ) {
              }

  private static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      LoggerService.log(`${operation} failed: ${error.message}`);

      if (error.status >= 500) {
        throw error;
      }

      return of(result);
    };
  }

  checkIfUserCanVote(): boolean {
    const votes = this.cookieService.get('votes');
    return Number(votes ? votes : 0) < AppConfig.votesLimit;
  }

  getHeroes(): Observable<Hero[]> {
    const url = AppConfig.apiRoot + AppConfig.apiHeroesList;
    return this.httpClient.get<Hero[]>(
      url,
      { headers: this.headers }
    ).pipe(
      map((dataset) => {
        return dataset.map((data) => new Hero().deserialize(data));
      }),
      tap(() => LoggerService.log(`fetched heroes`)),
      catchError(HeroService.handleError('getHeroes', []))
    );
  }

  getHero(id: string): Observable<Hero> {
    return this.httpClient.get<Hero>(
      AppConfig.apiRoot + AppConfig.apiHeroById + id,
      { headers: this.headers }
    ).pipe(
      map((hero) => {
        return new Hero().deserialize(hero);
      }),
      tap(() => LoggerService.log(`fetched hero ${id}`)),
      catchError(HeroService.handleError('getHero', []))
    );
  }

  createHero(hero: Hero): Promise<Hero> {
    return this.httpClient.post<Hero>(
      AppConfig.apiRoot + AppConfig.apiHeroesList,
      JSON.parse(JSON.stringify(hero)),
      { headers: this.headers }
    ).toPromise<Hero>();
  }

  updateHero(hero: Hero): Promise<void> {
    return this.httpClient.patch<void>(
      AppConfig.apiRoot + AppConfig.apiHeroById + hero.id,
      JSON.parse(JSON.stringify(hero)),
      { headers: this.headers }
    ).toPromise<void>().then(() => {
        LoggerService.log(`updated hero w/ id=${hero.id}`);
        this.showSnackBar(this.i18n({value: 'Saved', id: '@@saved'}));
      });
  }

  deleteHero(id: string): Promise<void> {
    return this.httpClient.delete<void>(
      AppConfig.apiRoot + AppConfig.apiHeroById + id,
      { headers: this.headers }
    ).toPromise<void>().then(() => {
      LoggerService.log(`updated hero w/ id=${id}`);
      this.showSnackBar(this.i18n({value: 'Saved', id: '@@saved'}));
    });
  }

  showSnackBar(name): void {
    const config: any = new MatSnackBarConfig();
    config.duration = AppConfig.snackBarDuration;
    this.snackBar.open(name, 'OK', config);
  }
}
