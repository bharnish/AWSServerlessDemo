/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { DbRecord } from '../models/db-record';
import { StringDto } from '../models/string-dto';
@Injectable({
  providedIn: 'root',
})
class ValuesService extends __BaseService {
  static readonly getApiValuesPath = '/api/Values';
  static readonly postApiValuesPath = '/api/Values';
  static readonly getApiValuesIdPath = '/api/Values/{id}';
  static readonly putApiValuesIdPath = '/api/Values/{id}';
  static readonly deleteApiValuesIdPath = '/api/Values/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  getApiValuesResponse(): __Observable<__StrictHttpResponse<Array<DbRecord>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Values`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<DbRecord>>;
      })
    );
  }
  /**
   * @return Success
   */
  getApiValues(): __Observable<Array<DbRecord>> {
    return this.getApiValuesResponse().pipe(
      __map(_r => _r.body as Array<DbRecord>)
    );
  }

  /**
   * @param body undefined
   */
  postApiValuesResponse(body?: StringDto): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Values`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param body undefined
   */
  postApiValues(body?: StringDto): __Observable<null> {
    return this.postApiValuesResponse(body).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  getApiValuesIdResponse(id: string): __Observable<__StrictHttpResponse<DbRecord>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Values/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DbRecord>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  getApiValuesId(id: string): __Observable<DbRecord> {
    return this.getApiValuesIdResponse(id).pipe(
      __map(_r => _r.body as DbRecord)
    );
  }

  /**
   * @param params The `ValuesService.PutApiValuesIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiValuesIdResponse(params: ValuesService.PutApiValuesIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/Values/${encodeURIComponent(String(params.id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `ValuesService.PutApiValuesIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiValuesId(params: ValuesService.PutApiValuesIdParams): __Observable<null> {
    return this.putApiValuesIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  deleteApiValuesIdResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/Values/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id undefined
   */
  deleteApiValuesId(id: string): __Observable<null> {
    return this.deleteApiValuesIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ValuesService {

  /**
   * Parameters for putApiValuesId
   */
  export interface PutApiValuesIdParams {
    id: string;
    body?: StringDto;
  }
}

export { ValuesService }
