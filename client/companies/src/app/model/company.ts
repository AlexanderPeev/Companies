import {CompanyDTO} from './dto/company.dto';

export class Company {
  constructor(private dto: CompanyDTO) {
  }

  get id(): string | null {
    return this.dto.id || null;
  }

  set id(value: string | null) {
    if(value) {
      this.dto.id = value;
    }
  }

  get version(): number {
    return this.dto.version;
  }

  set version(value: number) {
    this.dto.version = value;
  }

  get name(): string {
    return this.dto.name;
  }

  set name(value: string) {
    this.dto.name = value;
  }

  get address(): string {
    return this.dto.address;
  }

  set address(value: string) {
    this.dto.address = value;
  }

  get city(): string {
    return this.dto.city;
  }

  set city(value: string) {
    this.dto.city = value;
  }

  get country(): string {
    return this.dto.country;
  }

  set country(value: string) {
    this.dto.country = value;
  }

  get email(): string | null {
    return this.dto.email || null;
  }

  set email(value: string | null) {
    if(value) {
      this.dto.email = value;
    } else if ('email' in this.dto) {
      delete this.dto.email;
    }
  }

  get phone(): string | null {
    return this.dto.phone || null;
  }

  set phone(value: string | null) {
    if(value) {
      this.dto.phone = value;
    } else if ('phone' in this.dto) {
      delete this.dto.phone;
    }
  }

  get beneficialOwners(): string[] | null {
    return this.dto.beneficialOwners || null;
  }

  set beneficialOwners(value: string[] | null) {
    if(value) {
      this.dto.beneficialOwners = value;
    } else if ('beneficialOwners' in this.dto) {
      delete this.dto.beneficialOwners;
    }
  }

  public copy(): Company {
    return new Company(Object.assign({}, this.dto));
  }

  public toDto(): CompanyDTO {
    return this.dto;
  }
}
