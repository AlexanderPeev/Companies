export class Validator {
    public validate(dto: any): boolean {
        return !!dto
            && !!dto.name
            && typeof(dto.name) === 'string'
            && !!dto.address
            && typeof(dto.address) === 'string'
            && !!dto.city
            && typeof(dto.city) === 'string'
            && !!dto.country
            && typeof(dto.country) === 'string'
            && (!dto.beneficialOwners || (Array.isArray(dto.beneficialOwners) && dto.beneficialOwners.every((element: any) => typeof(element) === 'string')))
            && (!dto.email || typeof(dto.email) === 'string')
            && (!dto.phone || typeof(dto.phone) === 'string');
    }
}