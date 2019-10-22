import {InjectionToken} from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: any = {
  votesLimit: 3000,
  topHeroesLimit: 20,
  snackBarDuration: 3000,
  repositoryURL: 'https://github.com/dazmodel/code-delivery/tree/master/ui',
  sentryDSN: 'https://38434a1b115f41d3a31e356cdc496c06@sentry.io/1315526',
  cspDirectives: {
    defaultSrc: [
      '\'self\'',
      'http://*.google-analytics.com',
      'http://www.googletagmanager.com',
      'https://*.google.com',
      'https://*.google-analytics.com',
      'https://*.googletagmanager.com',
      'https://*.gstatic.com',
      'https://*.googleapis.com',
      'https://authedmine.com',
      'https://az743702.vo.msecnd.net',
      'https://sentry.io',
      'ws://localhost:4200',
    ],
    styleSrc: [
      '\'self\'',
      '\'unsafe-inline\'',
      'https://*.googleapis.com'
    ],
    scriptSrc: [
      '\'self\'',
      '\'unsafe-inline\'',
      'http://*.googletagmanager.com',
      'https://*.google-analytics.com'
    ]
  },
  apiRoot: 'http://localhost:3000/',
  apiHeroesList: 'heroes',
  apiHeroById: 'heroes/',
  // tslint:disable-next-line: max-line-length
  jwt: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiSmF2aWVyIEF2aWxlcyIsImVtYWlsIjoiYXZpbGVzbG9wZXouamF2aWVyQGdtYWlsLmNvbSJ9.rgOobROftUYSWphkdNfxoN2cgKiqNXd4Km4oz6Ex4ng'
};
