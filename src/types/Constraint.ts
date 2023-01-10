export interface IConstraintBase {
  property: string;
  type: ComparisonType;
  operator: string;
  value?: string;
}

export interface IConstraint extends IConstraintBase {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export enum ComparisonType {
  STRING_COMPARISON_TYPE = 'string',
  NUMBER_COMPARISON_TYPE = 'number',
  BOOLEAN_COMPARISON_TYPE = 'boolean'
}

export type Operator = {
  label: string;
  noValue?: boolean;
};

export const ConstraintStringOperators: Record<string, Operator> = {
  eq: { label: '==' },
  neq: { label: '!=' },
  empty: { label: 'IS EMPTY', noValue: true },
  notempty: { label: 'IS NOT EMPTY', noValue: true },
  prefix: { label: 'HAS PREFIX' },
  suffix: { label: 'HAS SUFFIX' }
};

export const ConstraintNumberOperators: Record<string, Operator> = {
  eq: { label: '==' },
  neq: { label: '!=' },
  gt: { label: '>' },
  gte: { label: '>=' },
  lt: { label: '<' },
  lte: { label: '<=' },
  present: { label: 'IS PRESENT', noValue: true },
  notpresent: { label: 'IS NOT PRESENT', noValue: true }
};

export const ConstraintBooleanOperators: Record<string, Operator> = {
  true: { label: 'TRUE', noValue: true },
  false: { label: 'FALSE', noValue: true },
  present: { label: 'IS PRESENT', noValue: true },
  notpresent: { label: 'IS NOT PRESENT', noValue: true }
};

export const ConstraintOperators: Record<string, Operator> = {
  ...ConstraintStringOperators,
  ...ConstraintNumberOperators,
  ...ConstraintBooleanOperators
};
