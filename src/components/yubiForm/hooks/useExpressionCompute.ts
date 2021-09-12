

export default (state, formData) => {
  const operaLevelMap = {
    '=': 0,
    '>': 0,
    '<': 0,
    '&': 0,
    '|': 0,
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '^': 3,
  };
  
  const operaCompute = {
    '=': (num1, num2) => {
      return num1 === num2? 1: 0;
    },
    '>': (num1, num2) => {
      return num1>num2? 1: 0;
    },
    '<': (num1, num2) => {
      return num1<num2? 1: 0;
    },
    '&': (num1, num2) => {
      return num1&num2? 1: 0;
    },
    '|': (num1, num2) => {
      return num1|num2? 1: 0;
    },
    '+': (num1, num2) => {
      return num1+num2;
    },
    '-': (num1, num2) => {
      return num1 - num2;
    },
    '*': (num1, num2) => {
      return num1*num2;
    },
    '/': (num1, num2) => {
      return num1/num2;
    },
    '^': (num1, num2) => {
      return Math.pow(num1, num2);
    }
  }
  
  const handleElement = (expression, i) => {
    if (expression[i] !== '{') {
      return getNumber(expression, i);
    } else {
      return getState(expression, i);
    }
  }
  
  const getState = (expression, i) => {
    i += 1;
    const key = [];
    while(expression[i] !== '}') {
      key.push(expression[i]);
      ++i;
    }
    // console.log('getState', state[key.join('')], formData[key.join('')]  , [state[key.join('') || formData[key.join('')]], i]);
    let value = state[key.join('')];
    value === undefined && (value = formData[key.join('')]);
    return [value , i];
  }
  
  const getNumber = (expression, i) => {
    const nums = [];
    while(Number.isInteger(+expression[i]) || expression[i] === '.') {
      nums.push(expression[i]);
      ++i;
    }
    return [+nums.join(''), i-1];
  };
  
  const handleCompute = (num2, num1, sign) => {
    // console.log(sign, num1, num2);
    return operaCompute[sign](num1, num2)
  };
  /**
   * 中缀表达式转换逆波兰表达式
   * @param {string} expression 
   */
  const toReversePolishNotation = (expression) => {
    const elementStack = [];
    const operationStack = [];
  
    for(let i = 0, len = expression.length ; i<len ; ++i) {
      if (operaLevelMap[expression[i]] !== undefined) {
        // 是运算符
        if (operationStack.length > 0) {
          const topOpera = operationStack.pop();
          if (operaLevelMap[expression[i]] > operaLevelMap[topOpera] || topOpera === '(') {
            operationStack.push(topOpera, expression[i]);
          } else {
            elementStack.push(topOpera);
            operationStack.push(expression[i]);
          }
        } else {
          operationStack.push(expression[i]);
        }
      
      } else if (expression[i] === '(') {
        // 是 (
        operationStack.push('(')
      } else if (expression[i] === ')') {
        // 是 )，往elementStack里塞运算符
        let opera = '';
        while((opera = operationStack.pop()) !== '(') {
          elementStack.push(opera);
        }
      // 忽略
      } else if (expression[i] === ' ') {
        // continue;
      } else {
        // 是 element
        let num = 0;
        [num, i] = handleElement(expression, i);
        elementStack.push(num);
      }
      // console.log('elementStack', elementStack, 'operationStack', operationStack);
    }
    while(operationStack.length > 0) {
      elementStack.push(operationStack.pop());
    }
    return elementStack;
  }
  
  /**
   * 
   * @param {Array} reversePolishNotation 上面的elementStack
   */
  const computeReversePolishNotation = (reversePolishNotation) => {
    if(reversePolishNotation.includes(undefined)) {
      return undefined;
    }

    if (reversePolishNotation.length > 1) {
      const numberStack = [];
  
      reversePolishNotation.forEach((element) => {
        if (!operaCompute[element]) {
          numberStack.push(element);
        } else {
          numberStack.push(handleCompute(numberStack.pop(), numberStack.pop(), element));
        }
      })
      return numberStack.pop();
    } else {
      return reversePolishNotation.pop();
    }
  }
  
  return {
    toReversePolishNotation,
    computeReversePolishNotation,
  }
};

