type ValueType = "string" | "number" | "boolean" | "array" | unknown;

interface IExpression<T extends ValueType = unknown> {
  expression?: string;
  type: T;
  value?: string;
}

interface ISchemaItem {
  label?: string | IExpression<"string">,
  layout?: {
    span: number | IExpression<"number">;
  },
  path?: string | IExpression<"string">;
  component: string,
  [key: string]: ValueType | IExpression;
}

