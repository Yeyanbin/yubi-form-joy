
// `test
// girl
// boy`
import pinyin from 'pinyin';

const chReg = /[\u4E00-\u9FFF]+/;

interface ILifeCycle {
  update: (texts: ITextLine[]) => void;
  finish?: (totalTime: number) => void;
}

export interface ITextLine {
  words: string[];
  inputs: string[];
  pre: string[];
}

const defaultOptions = {
  wordStep: 600,
  letterStep: 150,
  lineStep: 500,
};

const defaultSpecChar = {
  ' ': 400,
  ',': 500,
  '，': 500,
  '?': 500,
  '!': 500,
  '？': 500,
  '！': 500,
};

const textLoading = (text: string, lifeCycle: ILifeCycle, options = defaultOptions) => {
  const textLines = text.split('\n');
  // const totalTime = 
  console.log('textLines', textLines);
  const now = Date.now();
  let line = 0, index = 0, last = now, time, total = 0;

  const texts: ITextLine[] = [{ words: [], inputs: [], pre: []}];
  const specChar = {
    ...defaultSpecChar,
  };


  const loop = () => {
    requestAnimationFrame(() => {
      // time = Date.now() - last;
      if (last > Date.now()) {
        // console.log('time', last - Date.now())
        loop();
        return;
      }
      
      // console.log('text', texts[line])
      if (texts[line].pre.length > 0) {
        texts[line].inputs.push(texts[line].pre.pop());
        lifeCycle.update(texts);
        last = Date.now() + options.letterStep;
        // console.log('done')

        if (texts[line].pre.length === 0) {
          texts[line].words.push(textLines[line][index]);
          last = Date.now() + options.wordStep;
          texts[line].inputs = [];
          ++index;
          lifeCycle.update(texts);
        }
        // console.log('func end')
      } else if (line < textLines.length) {
        if (index < textLines[line].length) {
          ++total;

          const word = textLines[line][index];
          
          // 判断是不是中文，如果是的话那就用pinyin库
          if (chReg.test(word)) {
            const wordPinYin = `${pinyin(word)[0]}__`;
            console.log('word pinyin', wordPinYin);

            texts[line].pre = wordPinYin.split('').reverse();

            // last = Date.now() + options.letterStep;
            // ++index;
          } else {
            console.log('word not pinyin', word);

            let spendTime;
            if (spendTime = specChar[textLines[line][index]]) {
              last = Date.now() + spendTime;
            } else {
              last = Date.now() + options.letterStep;
            }
            texts[line].words.push(textLines[line][index]);
            lifeCycle.update(texts);

            ++index;
          }

        } else {
          texts.push({ words: [], inputs: [], pre: []});

          ++line;
          index = 0;
        }


      } else {
        // console.log(JSON.stringify(texts));
        lifeCycle.finish && lifeCycle.finish(total)
        return;
      }
      loop();
    });
  }

  loop();
};

export default textLoading;
