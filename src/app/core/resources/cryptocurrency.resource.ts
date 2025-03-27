import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

import { AppError } from '~core/enums/app-errors.enum';
import { HttpService } from '~core/services/http.service';
import { CryptocurrencyRateResponse } from '~core/types/responses/cryptocurrency-rate-response.type';

@Injectable({
  providedIn: 'root',
})
export class CryptocurrencyResource {
  private readonly apiUrl = 'https://api.coincap.io/v2';

  private readonly httpService = inject(HttpService);

  getPrice(cryptocurrencyId: string) {
    return this.httpService
      .get<CryptocurrencyRateResponse>(this.apiUrl, `rates/${cryptocurrencyId}`)
      .pipe(
        map(response => {
          const priceUsd = parseFloat(response.data.rateUsd);
          if (isNaN(priceUsd)) {
            throw AppError.CryptocurrencyRateNotANumber;
          }

          return priceUsd;
        })
      );
  }
}
