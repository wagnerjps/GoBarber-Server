export default interface IUserResponse {
    avatar: string;
    name: string;
    email: string;
    id: string;
    password?: string;
    created_at: Date;
    updated_at: Date;
}
