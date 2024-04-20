export interface ResetPassword{
    token : string;
    email : string;
    newPassword : string;
    message ?: string;
    messageEn ?: string;
    statu ?: boolean;
}