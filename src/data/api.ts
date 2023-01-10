import  useError from '~/data/hooks/errors';
import { IConstraintBase } from "types/Constraint";
import { IDistributionBase } from "types/Distribution";
import { IFlagBase } from "types/Flag";
import { IRuleBase } from "types/Rule";
import { ISegmentBase } from "types/Segment";
import { IVariantBase } from "types/Variant";

const apiURL = (import.meta.env.FLIPT_BASE_URL ?? "") + "/api/v1";
const metaURL = (import.meta.env.FLIPT_BASE_URL ?? "") + "/meta";

//
// base methods
async function get(uri: string) {
  const res = await fetch(apiURL + uri, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return await res.json();
}

async function post<T>(uri: string, values: T) {
  const res = await fetch(apiURL + uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(values),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return await res.json();
}

async function put<T>(uri: string, values: T) {
  const res = await fetch(apiURL + uri, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(values),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return await res.json();
}

//
// flags
export async function listFlags() {
  return await get("/flags");
}

export async function getFlag(key: string) {
  return await get(`/flags/${key}`);
}

export async function createFlag(values: IFlagBase) {
  return await post(`/flags`, values);
}

export async function updateFlag(key: string, values: IFlagBase) {
  return await put(`/flags/${key}`, values);
}

export async function deleteFlag(key: string) {
  const res = await fetch(apiURL + `/flags/${key}`, {
    method: "DELETE",
  });
  return res.ok;
}

//
// rules
export async function listRules(flagKey: string) {
  return await get(`/flags/${flagKey}/rules`);
}

export async function createRule(flagKey: string, values: IRuleBase) {
  return await post(`/flags/${flagKey}/rules`, values);
}

export async function deleteRule(flagKey: string, ruleId: string) {
  const res = await fetch(apiURL + `/flags/${flagKey}/rules/${ruleId}`, {
    method: "DELETE",
  });
  return res.ok;
}

export async function orderRules(flagKey: string, ruleIds: string[]) {
  const res = await fetch(apiURL + `/flags/${flagKey}/rules/order`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ruleIds: ruleIds,
    }),
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
  return await post(`/flags/${flagKey}/rules/${ruleId}/distributions`, values);
}

export async function updateDistribution(
  flagKey: string,
  ruleId: string,
  distributionId: string,
  values: IDistributionBase
) {
  return await put(
    `/flags/${flagKey}/rules/${ruleId}/distributions/${distributionId}`,
    values
  );
}

//
// variants
export async function createVariant(flagKey: string, values: IVariantBase) {
  return await post(`/flags/${flagKey}/variants`, values);
}

export async function updateVariant(
  flagKey: string,
  variantId: string,
  values: IVariantBase
) {
  return await put(`/flags/${flagKey}/variants/${variantId}`, values);
}

export async function deleteVariant(flagKey: string, variantId: string) {
  const res = await fetch(apiURL + `/flags/${flagKey}/variants/${variantId}`, {
    method: "DELETE",
  });
  return res.ok;
}

//
// segments
export async function listSegments() {
  return await get("/segments");
}

export async function getSegment(key: string) {
  return await get(`/segments/${key}`);
}

export async function createSegment(values: ISegmentBase) {
  return await post(`/segments`, values);
}

export async function updateSegment(key: string, values: ISegmentBase) {
  return await put(`/segments/${key}`, values);
}

export async function deleteSegment(key: string) {
  const res = await fetch(apiURL + `/segments/${key}`, {
    method: "DELETE",
  });
  return res.ok;
}

//
// constraints
export async function createConstraint(
  segmentKey: string,
  values: IConstraintBase
) {
  return await post(`/segments/${segmentKey}/constraints`, values);
}

export async function updateConstraint(
  segmentKey: string,
  constraintId: string,
  values: IConstraintBase
) {
  return await put(
    `/segments/${segmentKey}/constraints/${constraintId}`,
    values
  );
}

export async function deleteConstraint(
  segmentKey: string,
  constraintId: string
) {
  const res = await fetch(
    apiURL + `/segments/${segmentKey}/constraints/${constraintId}`,
    {
      method: "DELETE",
    }
  );
  return res.ok;
}

// evaluate
export async function evaluate(flagKey: string, values: any) {
  const res = await fetch(apiURL + `/evaluate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      flagKey: flagKey,
      ...values,
    }),
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
  const res = await fetch(metaURL + "/info", { credentials: 'include' });
  return await res.json();
}
