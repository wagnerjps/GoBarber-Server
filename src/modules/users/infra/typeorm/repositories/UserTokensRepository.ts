// import { v4 as uuid } from 'uuid';

// import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
// import UserToken from '../entities/UserToken';

// class UserTokensRepository implements IUserTokensRepository {
//     private userTokens: UserToken[] = [];

//     public async generate(user_id: string): Promise<UserToken> {
//         const userToken = new UserToken();

//         Object.assign(userToken, {
//             id: uuid(),
//             token: uuid(),
//             user_id,
//         });

//         this.userTokens.push(userToken);

//         return userToken;
//     }
// }
// export default UserTokensRepository;
