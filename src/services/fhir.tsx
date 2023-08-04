import {store} from 'store';
import {FHIR_BASE_URL} from '@env';

import RequestBuilder from '@rna/services/request';

import * as authActions from 'store/slices/auth';

import {setNewAppTokens} from './auth';

const {dispatch} = store;

const RefreshTokenInterceptor = (req: Request, _: AbortController) => {
  let {
    auth: {refreshToken, tokenExpirationDate},
  } = store.getState();
  if (
    !req.url.includes('/v/r4/auth/token/') &&
    tokenExpirationDate &&
    refreshToken
  ) {
    const tokenExpiresAt = new Date(tokenExpirationDate);
    const now = new Date();
    if (+tokenExpiresAt - +now < 0) {
      fhirService.refreshAppToken(refreshToken);
      // controller.abort();
    }
  }
};

const TokenInterceptor = (req: Request) => {
  let {
    auth: {token},
  } = store.getState();
  if (token && !req.url.includes('/v/r4/auth/token/')) {
    // @ts-expect-error React native header object is slightly different from the web one.
    req.headers.map.Authorization = `Bearer ${token}`;
  }
};

const request = new RequestBuilder(FHIR_BASE_URL)
  .setRequestInterceptors([
    RefreshTokenInterceptor,
    TokenInterceptor,
    console.log,
  ])
  .setResponseInterceptors([console.log])
  .setRetryConfig({backoffFactor: 0.5, maxRetries: 2})
  .build();

class FHIRService {
  async get(url: string, options: Record<string, any> = {}) {
    const {error, data, response} = await request(`/v/r4${url}`, options);
    if (error) {
      if (response.status === 500) {
        throw new Error('500 Internal Server Error!');
      }
      console.log(data);
      throw data || 'Network Request Error!';
    }
    return data;
  }

  async getUserInfo() {
    try {
      const user = await this.get('/auth/userinfo/');
      dispatch(authActions.setUser(user));
    } catch (error) {
      console.log(error);
    }
  }

  async refreshAppToken(refreshToken: string) {
    try {
      const body = new URLSearchParams();
      body.append('grant_type', 'refresh_token');
      body.append('refresh_token', refreshToken);
      const {error, data} = await request('/v/r4/auth/token/', {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });
      if (error) {
        throw data || error;
      }
      setNewAppTokens(data);
    } catch (err) {
      dispatch(authActions.setLogout());
      console.log(err);
    }
  }

  getResource = async (resourceType: string) => {
    return await this.get(`/fhir/${resourceType}/`);
  };
}

const fhirService = new FHIRService();
export default fhirService;
