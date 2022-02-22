import { environment } from '../environments/environment';

export const appName = environment.firebaseAppName;

export const appUrl = `https://${appName}.firebasedatabase.app`;
const accountsApiUrl = 'https://identitytoolkit.googleapis.com/v1/accounts';

export const signUpUrl = `${accountsApiUrl}:signUp`;
export const signInUrl = `${accountsApiUrl}:signInWithPassword`;

export const key = environment.firebaseAPIKey;

