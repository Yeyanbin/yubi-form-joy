type ValueType = string | number | boolean | any[];

interface IExpression<T extends ValueType> {
  expression: string;
  value?: T;
}

interface ISchemaItem {
  label?: string | IExpression<string>,
  layout?: {
    span: number | IExpression<number>;
    offset?: number | IExpression<number>;
  },
  path?: string | IExpression<string>;
  component: string,
  [key: string]: any | IExpression<ValueType>;
}

