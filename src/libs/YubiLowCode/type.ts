

export interface RemarkValue {
  type: 'number' | 'array' | 'boolean' | 'string' | 'object' | 'function';
  name: string;
  remark: string;
};

export interface ComponentDto {
  childrens: ComponentDto[];
  inlineStyle: string;
  className: string;
  innerHTML: string;
  otherAttrs: {
    [key: string]: any | RemarkValue;
  };
  events: {
    [key: string]: RemarkValue;
  }, // 对接dom的事件
}

export interface Material {
  author: string;
  version: string;
  content: ComponentDto;
}
