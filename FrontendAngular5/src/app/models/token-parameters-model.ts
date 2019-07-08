export class TokenParameters {
    constructor(
        public access_token: string,
        public token_type: string,
        public expires_in: string,
        public userName: string) {}
}