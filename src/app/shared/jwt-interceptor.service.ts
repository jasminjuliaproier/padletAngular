import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ToastrService} from "ngx-toastr";

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          //handle response
        }
      },

      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            confirm("Incorrect username or password");
          }
        }
      }));
  }
}
