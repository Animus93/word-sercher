import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterParsedListArray } from 'Redux/filterParsedListArraySlice';
import styles from './List.module.css';

export const List = () => {
  const dispatch = useDispatch();
  const [filtredPhrase, setFilredPhrase] = useState([]);
  const list = useSelector(state => state.wordList);
  const keyWords = useSelector(state => state.filterSourceArrayByWord);
  const inputFilter = useSelector(state => state.filterParsedListArray);
  const objectValue = Object.keys(list[0]);

  const copyAll = () => {
    const parsedList = filtredPhrase.map(string => {
      return `${string[objectValue[0]]}\r\n`;
    });
    navigator.clipboard.writeText(parsedList);
  };

  useEffect(() => {
    const result = keyWords.map(word => {
      return list.filter(string => {
        let strToObj = new Set(
          string[objectValue[0]].split(/[^\u0400-\u04ff]+/)
        );
        if (
          Boolean(
            strToObj.has(word) ||
              string[objectValue[0]].match(new RegExp(`\\b${word}\\b`))
          )
        ) {
          return string[objectValue[0]];
        }
        return
      });
    }).flat().sort((a,b)=> b[objectValue[1]] - a[objectValue[1]])
    setFilredPhrase(result);
  }, [keyWords]);

  return (
    <div className={styles.container}>
      {/* <input
        type="text"
        id="Listfilter"
        value={inputFilter}
        className={styles.input}
        name="Listfilter"
        onChange={e => {
          dispatch(filterParsedListArray(e.currentTarget.value));
        }}
      /> */}
      <table>
        <thead>
          <tr>
            <td className={styles.cell1}>
              <b>{[objectValue[0]]}</b>
              <button onClick={copyAll} className={styles.copyAllBtn}>
                copy all
              </button>
            </td>
            <td>
              <b>{[objectValue[1]]}</b>
            </td>
          </tr>
        </thead>
        <tbody>
          {filtredPhrase.length > 0 &&
            filtredPhrase.map(string => {
              if (
                JSON.stringify(string[objectValue[0]])
                  .toLocaleLowerCase()
                  .includes(inputFilter.toLocaleLowerCase())
              ) {
                return (
                  <tr key={nanoid()}>
                    <td>
                      <button
                        className={styles.copyBtn}
                        onClick={e => {
                          navigator.clipboard.writeText(
                            e.currentTarget.firstChild.data
                          );
                        }}
                      >
                        {string[objectValue[0]]}
                        <span className={styles.copyBtnTip}>copy</span>
                      </button>
                    </td>
                    <td>{string[objectValue[1]]}</td>
                  </tr>
                );
              }
            })}
        </tbody>
      </table>
    </div>
  );
};
