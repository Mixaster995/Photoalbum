export class ChangePasswordModel{
    constructor(
        public OldPassword:string,
        public NewPassword:string,
        public ConfirmPassword:string
    ){}
}