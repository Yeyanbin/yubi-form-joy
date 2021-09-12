
export const handleContent = (content: Array<any>, { toReversePolishNotation, computeReversePolishNotation }) => {
  
  // console.log('content', content);

  const handleNormalObject = (item) => {
    const newItem = {};
    
    Object.keys(item).forEach(key => {
      if (typeof item[key] === 'string') {
        // 发现一个值其是字符串
        newItem[key] = item[key];
      } else if(Array.isArray(item[key])) {
        // 是数组
        newItem[key] = item[key];
      } else {
        // 发现一个值其是对象
        if (item[key].type && item[key].value !== undefined || item[key].expression !== undefined) {
          // 查看是否带有value或者expression属性，是则认为其是值对象
          newItem[key] = handleValueObject(item[key]);
        } else {
          newItem[key] = handleNormalObject(item[key]);
        }
      }
    })
    return newItem;
  }
  
  /**
   * 值对象处理
   * 考虑依赖监听的问题(先搁置)
   * @param valueObject 
   */
  const handleValueObject = (valueObject) => {
    const { type, value, expression } = valueObject;
    let computeValue = undefined;
  
    if (type ==='string') {
      computeValue = `${handleExpression(expression) || value}`;
    } else if (type === 'number') {
      computeValue = +(handleExpression(expression) || value);
    } else if (type === 'array') {
      // computeValue = +(handleExpression(expression) || value);
    } else if (type === 'boolean') {
      computeValue = handleExpression(expression) || value;
      computeValue = computeValue === 'false' ? false : Boolean(computeValue);
    }
    return computeValue;
  }
  
  const handleExpression = (expression) => {
    // console.log(toReversePolishNotation(expression));
    // console.log(computeReversePolishNotation(toReversePolishNotation(expression)));
    return computeReversePolishNotation(toReversePolishNotation(expression));
  }

  const newContent = [];

  content.forEach(item => {
    if (item.show) {
      const show = handleExpression(item.show.expression) || item.show.value; 
      if (show && show !== 'false') {
        newContent.push(handleNormalObject(item));
      }
    } else {
      newContent.push(handleNormalObject(item));
    }
  });
  return newContent;
}


export const getDefaultFormValue = (content, state) => {
  const obj = {};
  content.forEach((item) => {
    obj[item.path] = state[item.path] || '';
  });
  console.log('default Form Value', obj);
  return obj;
}