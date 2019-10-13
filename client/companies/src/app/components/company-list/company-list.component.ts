import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CompanyRestService } from '../../services/rest/company-rest.service';
import { Company } from '../../model/company';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit, OnDestroy {
  public loading = true;
  public error = false;
  public companies: Company[];
  private destroyed = false;

  constructor(private companyRest: CompanyRestService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.fetchCompanies();
  }

  ngOnDestroy() {
    this.destroyed = true;
  }

  retry() {
    this.loading = true;
    this.error = false;
    this.detectChanges();
    this.fetchCompanies();
  }

  public fetchCompanies() {
      this.companyRest.getCompanies().subscribe(companies => {
        this.companies = companies;
        this.error = false;
        this.loading = false;
        this.detectChanges();
      }, e => {
        this.error = true;
        this.loading = false;
        this.detectChanges();
      });
  }

  private detectChanges() {
    if(!this.destroyed) {
      this.cdr.detectChanges();
    }
  }

}
