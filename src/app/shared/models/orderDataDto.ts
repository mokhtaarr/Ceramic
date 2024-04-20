export interface OrderDataDto
{
    salesOfferId : number;
    notPaid : number;
    createdAt : number
    details :  OrderDetailDataDto[]
}

export interface OrderDetailDataDto
{
    itemCardId : number;
    itemDescA : string;
    itemDescE : string;
    quantity : number;
    price : number
}
