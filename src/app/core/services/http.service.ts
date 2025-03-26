import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { retry, timer } from 'rxjs';

import { HTTP_INCREMENTAL_DELAY_MS, HTTP_MAX_RETRY } from '~core/constants/http-retry-configuration.const';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly httpClient = inject(HttpClient);

  get<T>(apiUrl: string, endpoint: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient.get<T>(`${apiUrl}/${endpoint}`, { headers }).pipe(
      retry({
        count: HTTP_MAX_RETRY,
        delay: (_error, retryCount) => timer(retryCount * HTTP_INCREMENTAL_DELAY_MS),
      })
    );
  }
}
