/* eslint-disable no-unused-vars */
export type serviceFunctionsResponseShape = {
    status: number,
    data: any
}

export interface serviceUserShape {
    editName: (userId: number, name: string) => Promise<serviceFunctionsResponseShape>;
    excludeAccount: (accountId: number) => Promise<serviceFunctionsResponseShape>;
    loginUserAccount: (body: any) => Promise<serviceFunctionsResponseShape>;
    postUser: (body: any) => Promise<serviceFunctionsResponseShape>;
    userById: (userId: number) => Promise<serviceFunctionsResponseShape>
}

export type UserDataShape = {
    id: number;
    name: string;
    email: string;
    iat: number;
    exp: number;
}

export interface serviceTweetShape {
    postTweet: (userData: UserDataShape, tweet: string) => Promise<serviceFunctionsResponseShape>;
    getAllTweets: () => Promise<serviceFunctionsResponseShape>;
    destroyTweet: (parsedId: number) => Promise<serviceFunctionsResponseShape>;
    getUserTweetsById: (userId: number) => Promise<serviceFunctionsResponseShape>;
    likeNewTweet: (userId: number, tweetId: number) => Promise<serviceFunctionsResponseShape>
    filterLikedTweets: (userId: number) => Promise<serviceFunctionsResponseShape>
}
