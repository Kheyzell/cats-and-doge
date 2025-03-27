import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

import { HttpService } from '~core/services/http.service';
import { PlatformInfo } from '~core/types/platform-info.type';
import { ExchangePlatformsResponse } from '~core/types/responses/exchange-platforms-response.type';

@Injectable({
  providedIn: 'root',
})
export class ExchangePlatformResource {
  private readonly apiUrl = 'https://api.coincap.io/v2';

  private readonly httpService = inject(HttpService);

  getBestPlatform() {
    return this.httpService
      .get<ExchangePlatformsResponse>(this.apiUrl, `markets`)
      .pipe(
        map(response => response.data),
        map(platformList => platformList.map(platform => ({ // retrieve relevant information about the platforms as @PlatformInfo
          name: platform.baseId,
          last24hVolumeUsd: parseFloat(platform.volumeUsd24Hr) ?? 0
        } as PlatformInfo))),
        // sort by volume on the last 24h
        map(platformInfoList => platformInfoList.sort((p1, p2) => p2.last24hVolumeUsd - p1.last24hVolumeUsd)),
        // retrieve the best platform
        map(platformInfoSortedList => platformInfoSortedList[0])
      );
  }
}
