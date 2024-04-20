export interface User {
    email: string;
    displayName: string;
    phoneNumber: string;
    city: string;
    message:string;
    messageEn:string;
    street: string;
    token: string;
    statu:boolean;
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