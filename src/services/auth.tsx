import {authorize as oauthAuthorize} from 'react-native-app-auth';

import FHIR from 'services/fhir';
import {store} from 'store';
import * as authActions from 'store/slices/auth';

import {encode} from 'utils/codec';

import {FHIR_BASE_URL, FHIR_CLIENT_ID} from '@env';

const {dispatch} = store;

const DEFAULT_LAUNCH_PARAMS = {
  launch_type: 'provider-ehr',
  patient: '',
  provider: '',
  encounter: 'AUTO',
  skip_login: false,
  skip_auth: false,
  sim_ehr: false,
  scope:
    'patient/*.* user/*.* launch launch/patient launch/encounter openid fhirUser profile offline_access',
  redirect_uris: '',
  client_id: 'whatever',
  client_secret: '',
  client_type: 'public',
  pkce: 'auto',
};

const initialConfig = {
  issuer: FHIR_BASE_URL,
  clientId: FHIR_CLIENT_ID,
  redirectUrl: 'com.nepware.fhr://oauth',
  scopes: ['user/*.*', 'openid', 'profile', 'fhirUser', 'offline_access'],
  serviceConfiguration: {
    authorizationEndpoint: `${FHIR_BASE_URL}/auth/authorize`,
    tokenEndpoint: `${FHIR_BASE_URL}/auth/token`,
  },
};

export async function authorize(launchType: string = 'provider-ehr') {
  const launchParams = {
    ...DEFAULT_LAUNCH_PARAMS,
    launch_type: launchType,
  };
  const encodedLaunchParams = encode(launchParams);
  const config = {
    ...initialConfig,
    additionalParameters: {
      responseType: 'code',
      launch: encodedLaunchParams,
      aud: `${FHIR_BASE_URL}/fhir`,
    },
  };
  return await oauthAuthorize(config);
}

interface OAuthResult {
  accessToken: string;
  accessTokenExpirationDate?: string;
  idToken?: string;
  refreshToken: string;
}

export function appLogin(authResult: OAuthResult) {
  const {accessToken, accessTokenExpirationDate, refreshToken, idToken} =
    authResult;
  dispatch(authActions.setToken(accessToken));
  dispatch(authActions.setTokenExpirationDate(accessTokenExpirationDate));
  dispatch(authActions.setRefreshToken(refreshToken));
  dispatch(authActions.setIdToken(idToken));
  dispatch(authActions.setLogin());
  FHIR.getUserInfo();
}

interface TokenRefreshResult {
  access_token: string;
  refresh_token: string;
  id_token: string;
  expires_in?: number;
}

export function setNewAppTokens(authResult: TokenRefreshResult) {
  dispatch(authActions.setToken(authResult.access_token));
  dispatch(authActions.setIdToken(authResult.id_token));
  if (authResult.expires_in) {
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + authResult.expires_in);
    dispatch(authActions.setTokenExpirationDate(expiresAt.toString()));
  }
}
