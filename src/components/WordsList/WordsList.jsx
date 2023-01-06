import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import styles from './WordsList.module.css';
import { filterSource } from 'Redux/filterSourceArrayByWordSlice';

export const WordsList = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const phraseList = useSelector(state => state.wordList);
  const filter = useSelector(state => state.filterArrayOfWords);

  useEffect(() => {
    const reduceWords = phraseList
      .map(string => Object.values(string)[0])
      .join(' ')
      .split(' ')
      .reduce((acc, elem) => {
        if (acc[elem]) {
          acc[elem] += 1;
        } else {
          acc[elem] = 1;
        }
        return acc;
      }, {});

      // const frequency = () => {

      // }

    const reducedWordsToArray = Object.entries(reduceWords);
    let result = [reducedWordsToArray[0]];
    for (let i = 1; i < reducedWordsToArray.length; i += 1) {
      for (let j = 0; j < result.length; j += 1) {
        if (
          reducedWordsToArray[i][0] === result[j][0] ||
          (reducedWordsToArray[i][0].length > 4 &&
            result[j][0].length > 4 &&
            reducedWordsToArray[i][0].substring(0, 4) ===
              result[j][0].substring(0, 4))
        ) {
          result[j][1] += reducedWordsToArray[i][1];
          break;
        } else if (
          (j === result.length - 1 &&
            reducedWordsToArray[i][0] !== result[j][0]) ||
          (j === result.length - 1 &&
            reducedWordsToArray[i][0].length > 4 &&
            result[j][0].length > 4 &&
            reducedWordsToArray[i][0].substring(0, 4) !==
              result[j][0].substring(0, 4))
        ) {
          result.push(reducedWordsToArray[i]);
          break;
        }
      }
    }
    setData(result);
  }, [phraseList]);

  return (
    <>
      {typeof data !== 'undefined' ? (
        <>
          <table>
            <thead>
              <tr>
                <td className={styles.tableСell1}>
                  <b>Слово</b>
                </td>
                <td className={styles.tableСell2}>
                  <b>Повторений</b>
                </td>
                <td className={styles.tableСell2}>
                  <b>Частота</b>
                </td>
              </tr>
            </thead>
            <tbody>
              {data
                .sort((a, b) => b[1] - a[1])
                .map(item => {
                  if (item[0].includes(filter.toLocaleLowerCase())){
                    return (
                      <tr
                        onClick={() => {
                          dispatch(filterSource(item[0]));
                        }}
                        className={styles.tableStr}
                        key={nanoid()}
                      >
                        <td className={styles.tableСell1}>{item[0]}</td>
                        <td className={styles.tableСell2}>{item[1]}</td>
                        <td className={styles.tableСell2}>-</td>
                      </tr>
                    )}
                    return <></>;
                })}
            </tbody>
          </table>
        </>
      ) : (
        <p>Загрузите файл</p>
      )}
    </>
  );
};
