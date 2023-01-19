import { IConstraintBase } from 'types/Constraint';
import { IDistributionBase } from 'types/Distribution';
import { IFlagBase } from 'types/Flag';
import { IRuleBase } from 'types/Rule';
import { ISegmentBase } from 'types/Segment';
import { IVariantBase } from 'types/Variant';

const apiURL = '/api/v1';
const authURL = '/auth/v1';
const metaURL = '/meta';

export class APIError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

//
// base methods
async function request(method: string, uri: string, body?: any) {
  const res = await fetch(uri, {
    credentials: 'include',
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new APIError(err.message, res.status);
  }

  return res.json();
}

async function get(uri: string, base = apiURL) {
  return request('GET', base + uri);
}

async function post<T>(uri: string, values: T, base = apiURL) {
  return request('POST', base + uri, values);
}

async function put<T>(uri: string, values: T, base = apiURL) {
  return request('PUT', base + uri, values);
}

async function del(uri: string, base = apiURL) {
  return request('DELETE', base + uri);
}

//
// auth
export async function listAuthMethods() {
  return get('/method', authURL);
}

export async function getAuthSelf() {
  return get('/self', authURL);
}

export async function expireAuthSelf() {
  return put('/self/expire', {}, authURL);
}

//
// flags
export async function listFlags() {
  return get('/flags');
}

export async function getFlag(key: string) {
  return get(`/flags/${key}`);
}

export async function createFlag(values: IFlagBase) {
  return post('/flags', values);
}

export async function updateFlag(key: string, values: IFlagBase) {
  return put(`/flags/${key}`, values);
}

export async function deleteFlag(key: string) {
  return del(`/flags/${key}`);
}

//
// rules
export async function listRules(flagKey: string) {
  return get(`/flags/${flagKey}/rules`);
}

export async function createRule(flagKey: string, values: IRuleBase) {
  return post(`/flags/${flagKey}/rules`, values);
}

export async function deleteRule(flagKey: string, ruleId: string) {
  return del(`/flags/${flagKey}/rules/${ruleId}`);
}

export async function orderRules(flagKey: string, ruleIds: string[]) {
  const res = await fetch(`${apiURL}/flags/${flagKey}/rules/order`, {
    credentials: 'include',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ruleIds
    })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.ok;
}

export async function createDistribution(
  flagKey: string,
  ruleId: string,
  values: IDistributionBase
) {
  return post(`/flags/${flagKey}/rules/${ruleId}/distributions`, values);
}

export async function updateDistribution(
  flagKey: string,
  ruleId: string,
  distributionId: string,
  values: IDistributionBase
) {
  return put(
    `/flags/${flagKey}/rules/${ruleId}/distributions/${distributionId}`,
    values
  );
}

//
// variants
export async function createVariant(flagKey: string, values: IVariantBase) {
  return post(`/flags/${flagKey}/variants`, values);
}

export async function updateVariant(
  flagKey: string,
  variantId: string,
  values: IVariantBase
) {
  return put(`/flags/${flagKey}/variants/${variantId}`, values);
}

export async function deleteVariant(flagKey: string, variantId: string) {
  return del(`/flags/${flagKey}/variants/${variantId}`);
}

//
// segments
export async function listSegments() {
  return get('/segments');
}

export async function getSegment(key: string) {
  return get(`/segments/${key}`);
}

export async function createSegment(values: ISegmentBase) {
  return post('/segments', values);
}

export async function updateSegment(key: string, values: ISegmentBase) {
  return put(`/segments/${key}`, values);
}

export async function deleteSegment(key: string) {
  return del(`/segments/${key}`);
}

//
// constraints
export async function createConstraint(
  segmentKey: string,
  values: IConstraintBase
) {
  return post(`/segments/${segmentKey}/constraints`, values);
}

export async function updateConstraint(
  segmentKey: string,
  constraintId: string,
  values: IConstraintBase
) {
  return put(`/segments/${segmentKey}/constraints/${constraintId}`, values);
}

export async function deleteConstraint(
  segmentKey: string,
  constraintId: string
) {
  return del(`/segments/${segmentKey}/constraints/${constraintId}`);
}

//
// evaluate
export async function evaluate(flagKey: string, values: any) {
  const res = await fetch(`${apiURL}/evaluate`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      flagKey,
      ...values
    })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}

//
// meta
export async function getInfo() {
  return get('/info', metaURL);
}
