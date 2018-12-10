import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AccountPage } from '../pages/account/account';
import { BalancePage } from '../pages/balance/balance';
import { IncomesExpensesPage } from '../pages/incomes-expenses/incomes-expenses';
import { GroupPage } from '../pages/group/group';
import { SavingPage } from '../pages/saving/saving';
import { EditPage } from '../pages/edit/edit';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { GroupDetailPage } from '../pages/group-detail/group-detail';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { SQLite } from '@ionic-native/sqlite';
import { AuthProvider } from '../providers/auth/auth';
import { DatabaseProvider } from '../providers/database/database';
import { SavesProvider } from '../providers/saves/saves';
import { GroupProvider } from '../providers/group/group';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    AccountPage,
    BalancePage,
    IncomesExpensesPage,
    GroupPage,
    SavingPage,
    EditPage,
    ChangePasswordPage,
    GroupDetailPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    AccountPage,
    BalancePage,
    IncomesExpensesPage,
    GroupPage,
    SavingPage,
    EditPage,
    ChangePasswordPage,
    GroupDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    DatabaseProvider,
    SavesProvider,
    GroupProvider,
    LocalNotifications
  ]
})
export class AppModule {}
