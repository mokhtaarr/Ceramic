export interface User {
    email: string;
    displayName: string;
    phoneNumber: string;
    city: string;
    street: string;
    token: string;
}

export interface Address {
    FirstNameAr: string;
    FirstNameEn: string;
    LastNameAr: string;
    LastNameEn: string;
    street: string;
    city: string;
    state: string;
    zipCode?: string;
}