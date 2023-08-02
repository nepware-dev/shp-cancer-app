import {store} from 'store';
import {FHIR_BASE_URL} from '@env';

import RequestBuilder from '@rna/services/request';

import * as authActions from 'store/slices/auth';

const {dispatch} = store;

const TokenInterceptor = (req: Request) => {
  let {
    auth: {token},
  } = store.getState();
  if (token) {
    // @ts-expect-error React native header object is slightly different from the web one.
    req.headers.map.Authorization = `Bearer ${token}`;
  }
};

const request = new RequestBuilder(FHIR_BASE_URL)
  .setRequestInterceptors([TokenInterceptor, console.log])
  .setResponseInterceptors([console.log])
  .setRetryConfig({backoffFactor: 0, maxRetries: 1})
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
      const user = await this.get('/auth/userinfo');
      dispatch(authActions.setUser(user));
    } catch (error) {
      console.log(error);
    }
  }
}

export default new FHIRService();
