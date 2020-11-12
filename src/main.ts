import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { persistState } from '@datorama/akita';
import { debounceTime } from 'rxjs/operators';

const storage = persistState({
  include: ['routed-tab'],
  preStorageUpdateOperator: () => debounceTime(2000), // update the localstorage 2 seconds after a change have been made, to reduce writes to localstorage
});

const providers = [{ provide: 'persistStorage', useValue: storage }];

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers)
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
