/* eslint-disable no-unused-vars */
export type serviceFunctionsResponseShape = {
    status: number,
    data: any
  }

export interface serviceShape {
    editName: (userId: number, name: string) => Promise<serviceFunctionsResponseShape>;
    excludeAccount: (accountId: number) => Promise<serviceFunctionsResponseShape>;
    loginUserAccount: (body: any) => Promise<serviceFunctionsResponseShape>;
    postUser: (body: any) => Promise<serviceFunctionsResponseShape>;
  }
