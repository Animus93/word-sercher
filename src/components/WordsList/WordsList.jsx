import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import styles from './WordsList.module.css';
import { filterSourceArrayByWord } from 'Redux/filterSourceArrayByWordSlice';
import Snowball from 'snowball';
import { useState } from 'react';
import { useEffect } from 'react';

export const WordsList = () => {
  const [resultArrayOfWords, setResultArrayOfWords] = useState([]);
  const dispatch = useDispatch();
  const list = useSelector(state => state.wordList);
  const objectValue = Object.keys(list[0]);
  const filter = useSelector(state => state.filterArrayOfWords);

  useEffect(() => {
    const wordsWithoutFrequency = list
      .map(string => Object.values(string)[0])
      .join(' ')
      .split(' ');

    const wordsWithRootAsKey = wordsWithoutFrequency.map(word => {
      const stremmer = new Snowball('Russian');
      stremmer.setCurrent(word);
      stremmer.stem();
      const root = stremmer.getCurrent();
      return { id: nanoid(), root, words: [word], frequency: 0 };
    });

    const uniqueWords = [];

    for (let obj of wordsWithRootAsKey) {
      const foundObj = uniqueWords.find(o => o.root === obj.root);
      if (foundObj) {
        foundObj.words.push(...obj.words);
      } else {
        uniqueWords.push(obj);
      }
    }

    uniqueWords.forEach(obj => {
      obj.words = [...new Set(obj.words)].sort((a, b) => a.length - b.length);
    });

    uniqueWords.forEach(obj => {
      return obj.words.forEach(word => {
        list.forEach(string => {
          let strToObj = new Set(
            string[objectValue[0]].split(/[^\u0400-\u04ff]+/)
          );
          if (
            Boolean(
              strToObj.has(word) ||
                string[objectValue[0]].match(new RegExp(`\\b${word}\\b`))
            )
          ) {
            return (obj.frequency += string[objectValue[1]]);
          }
        });
      });
    });

    uniqueWords.sort((a, b) => b.frequency - a.frequency);

    return setResultArrayOfWords(uniqueWords);
    // eslint-disable-next-line
  }, [list]);

  const render = () => {
    return resultArrayOfWords.map(item => {
      if (
        JSON.stringify(item.words)
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase())
      ) {
        return (
          <tr
            key={item.id}
            className={styles.tableStr}
            onClick={() => {
              dispatch(filterSourceArrayByWord(item.words));
            }}
          >
            <td className={styles.tableСell0}>
              <input
                className={styles.chekBox}
                type="checkbox"
                onChange={console.log}
              />
            </td>
            <td className={styles.tableСell1}>{item.words[0]}</td>
            <td className={styles.tableСell2}>{item.frequency}</td>
          </tr>
        );
      }
      return <></>;
    });
  };

  return (
    <>
      <div className={styles.container}>
        <table>
          <thead>
            <tr>
              <td className={styles.tableСell0}>
                <b>✓</b>
              </td>
              <td className={styles.tableСell1}>
                <b>Слово</b>
              </td>
              <td className={styles.tableСell2}>
                <b>Частота</b>
              </td>
            </tr>
          </thead>
          {resultArrayOfWords.length > 0 && <tbody>{render()}</tbody>}
        </table>
      </div>
    </>
  );
};
