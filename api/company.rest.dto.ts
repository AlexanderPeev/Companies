export interface CompanyRestDTO {
    id?: string;        // optional when creating
    version: number;    // used for handling concurrent edits
    name: string;
    address: string;
    city: string;
    country: string;
    email?: string;     // optional
    phone?: string;      // optional
    beneficialOwners?: string[]; // optional
}