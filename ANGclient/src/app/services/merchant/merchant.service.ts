import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  private apiUrl: string;

  constructor(
    private HttpClient: HttpClient
  ) {
    this.apiUrl = environment.apiUrl
  }

  // Function to connect to API & get all merchants data
  public readAllItems = (): Promise<any> => {
      return this.HttpClient.get(`${this.apiUrl}/merchant`)
      .toPromise().then(this.getData).catch(this.handleError)
  }

  // Get API response
  private getData(res: any) {
    return res || {}
  };


  // Get API error
  private handleError(err: any) {
    return Promise.reject(err.error)
  }

}
