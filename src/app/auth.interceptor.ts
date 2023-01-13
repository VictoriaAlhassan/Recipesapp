import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, take } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private afAuth: AngularFireAuth) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.afAuth.idToken.pipe(
      take(1),
      switchMap((idToken) => {
        console.log(idToken);
        const cloned = req.clone({
          params: (req.params ? req.params : new HttpParams()).set(
            'auth',
            idToken
          ),
        });
        return next.handle(cloned);
      })
    );
    // const idToken = localStorage.getItem('id_token');

    // if (idToken) {
    //   const cloned = req.clone({
    // headers: req.headers.set('Authorization', 'Bearer ' + idToken),
    //   });
    //   return next.handle(cloned);
    // } else {
    //   return next.handle(req);
    // }
  }
}
