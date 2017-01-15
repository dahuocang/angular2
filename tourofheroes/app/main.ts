import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import {LoggedInGuard} from './login/login.guard';
platformBrowserDynamic().bootstrapModule(AppModule);
