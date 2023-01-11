import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import styles from './WordsList.module.css';
import { filterSourceArrayByWord } from 'Redux/filterSourceArrayByWordSlice';
import {listEqual} from 'api/listParser';
import { filterParsedListArray } from 'Redux/filterParsedListArraySlice';

export const WordsList = () => {
  const dispatch = useDispatch();
  const phraseList = useSelector(state => state.wordList);
  const filter = useSelector(state => state.filterArrayOfWords);

  const parse = () => {
    const wordsPrase = Object.entries(
      phraseList
        .map(string => Object.values(string)[0])
        .join(' ')
        .split(' ')
        .reduce((acc, word) => {
          if (acc[word]) {
            return acc;
          } else {
            acc[word] = frequency(word);
          }
          return acc;
        }, {})
    );
    return removeRepetitions(wordsPrase);
  };

  const frequency = word => {
    if (Object.keys(phraseList[0])[1]) {
      return listEqual(phraseList, word)
        .map(string => string[Object.keys(phraseList[0])[1]])
        .reduce((acc, value) => {
          return (acc += value);
        }, 0);
    }
    return 0;
  };

  const removeRepetitions = wordsPrase => {
    let result = [wordsPrase[0]];

    for (let i = 0; i < wordsPrase.length; i += 1) {
      for (let j = 0; j < result.length || 1; j += 1) {
        if (
          wordsPrase[i][0] === result[j][0] ||
          (wordsPrase[i][0].length > 4 &&
            result[j][0].length > 4 &&
            wordsPrase[i][0].substring(0, 4) === result[j][0].substring(0, 4))
        ) {
          console.log(result[j][0], '+', wordsPrase[i][1]);
          result[j][1] += wordsPrase[i][1];
          break;
        } else if (
          (j === result.length - 1 && wordsPrase[i][0] !== result[j][0]) ||
          (j === result.length - 1 &&
            wordsPrase[i][0].length > 4 &&
            result[j][0].length > 4 &&
            wordsPrase[i][0].substring(0, 4) !== result[j][0].substring(0, 4))
        ) {
          console.log('push', wordsPrase[i]);
          result.push(wordsPrase[i]);
          break;
        }
      }
    }
    return render(result);
  };

  const render = result => {
    return result
      .sort((a, b) => b[1] - a[1])
      .map(item => {
        if (item[0].includes(filter.toLocaleLowerCase())) {
          return (
            <tr
              onClick={() => {
                item[0].length > 4
                  ? dispatch(filterParsedListArray('')) &&
                    dispatch(filterSourceArrayByWord(item[0].substring(0, 4)))
                  : dispatch(filterParsedListArray('')) &&
                    dispatch(filterSourceArrayByWord(item[0]));
              }}
              className={styles.tableStr}
              key={nanoid()}
            >
              <td className={styles.tableСell1}>{item[0]}</td>
              <td className={styles.tableСell2}>{item[1]}</td>
            </tr>
          );
        }
        return <></>
      });
  };

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <td className={styles.tableСell1}>
              <b>Слово</b>
            </td>
            <td className={styles.tableСell2}>
              <b>Частота</b>
            </td>
          </tr>
        </thead>
        <tbody>{parse()}</tbody>
      </table>
    </div>
  );
};
