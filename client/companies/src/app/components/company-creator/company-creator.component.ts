import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CompanyRestService} from "../../services/rest/company-rest.service";
import {Company} from "../../model/company";

@Component({
  selector: 'app-company-creator',
  templateUrl: './company-creator.component.html',
  styleUrls: ['./company-creator.component.scss']
})
export class CompanyCreatorComponent implements OnInit, OnDestroy {
  public company: Company = CompanyCreatorComponent.createBlankCompany();
  public createdCompany: Company = null;
  public creating = false;
  public created = false;
  public error = false;
  private destroyed = false;

  constructor(private route: ActivatedRoute, private companyRest: CompanyRestService, private cdr: ChangeDetectorRef) {
  }

  private static createBlankCompany() {
    return new Company({
      version: 0,
      name: '',
      address: '',
      city: '',
      country: ''
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroyed = true;
  }

  retry() {
    this.creating = true;
    this.error = false;
    this.detectChanges();
    this.createCompany();
  }

  public createCompany() {
    this.companyRest.createCompany(this.company).subscribe(company => {
      this.createdCompany = company;
      this.company = CompanyCreatorComponent.createBlankCompany();
      this.error = false;
      this.creating = false;
      this.created = true;
      this.detectChanges();
    }, e => {
      this.error = true;
      this.creating = false;
      this.created = false;
      this.detectChanges();
    });
  }

  public detectChanges() {
    if (!this.destroyed) {
      this.cdr.detectChanges();
    }
  }

  public get canCreate(): boolean {
    return !this.creating
      && !!this.company
      && !!this.company.name
      && !!this.company.address
      && !!this.company.city
      && !!this.company.country;
  }

}
