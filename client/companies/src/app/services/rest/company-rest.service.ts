import { Injectable } from '@angular/core';
import { RestService } from '../rest.service';
import { CompanyDTO } from '../../model/dto/company.dto';
import { Company } from '../../model/company';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyRestService {
  private static readonly baseUrl = 'rest/companies/';

  constructor(private rest: RestService) { }

  public getCompanies(): Observable<Company[]> {
    return this.rest.get<CompanyDTO[]>(CompanyRestService.baseUrl).pipe(map(dtos => dtos.map(dto => new Company(dto))));
  }

  public getCompanyById(id: string): Observable<Company> {
    return this.rest.get<CompanyDTO>(CompanyRestService.baseUrl + id).pipe(map(dto => new Company(dto)));
  }

  public createCompany(company: Company): Observable<Company> {
    const dto = company.toDto();
    return this.rest.post<CompanyDTO>(CompanyRestService.baseUrl, dto).pipe(map(dto => new Company(dto)));
  }

  public updateCompany(company: Company): Observable<Company> {
    const dto = company.toDto();
    return this.rest.put<CompanyDTO>(CompanyRestService.baseUrl + dto.id, dto).pipe(map(dto => new Company(dto)));
  }

  public deleteCompany(company: Company): Observable<any> {
    const dto = company.toDto();
    return this.rest.del(CompanyRestService.baseUrl + dto.id);
  }
}
