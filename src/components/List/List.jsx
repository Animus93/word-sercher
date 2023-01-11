import {listParser} from 'api/listParser';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterParsedListArray } from 'Redux/filterParsedListArraySlice';
import styles from './List.module.css';

export const List = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const phraseList = useSelector(state => state.wordList);
  const filter = useSelector(state => state.filterSourceArrayByWord);
  const baseArray = listParser(phraseList, filter)
  const inputFilter = useSelector(state => state.filterParsedListArray)
  const objectValue = Object.keys(phraseList[0]);

  const copyAll = () => {
    const parsedList = listParser(phraseList, filter)
    .map(string => {
    return (
        `${string[objectValue[0]]}\r\n`
    );
    });
    navigator.clipboard.writeText(parsedList)
  };
  
  return (
    <div className={styles.container}>
    <input
        type="text"
        id="Listfilter"
        value={inputFilter}
        className={styles.input}
        name="Listfilter"
        onChange={(e)=> {dispatch(filterParsedListArray(e.currentTarget.value))}}
      />
    <table>
      <thead>
        <tr>
          <td className={styles.cell1}>
            <b>{[objectValue[0]]}</b>
            <button 
            onClick={copyAll}
            className={styles.copyAllBtn}>copy all</button>
          </td>
          <td>
            <b>{[objectValue[1]]}</b>
          </td>
        </tr>
      </thead>
      <tbody>
        {listParser(baseArray, inputFilter).length > 0
        ?
        listParser(baseArray, inputFilter)
        .map(string => {
            return (
              <tr key={nanoid()}>
                <td>
                  <button
                    className={styles.copyBtn}
                    onClick={(e) => {navigator.clipboard.writeText(e.currentTarget.firstChild.data)}}
                    >
                    {string[objectValue[0]]}
                  <span className={styles.copyBtnTip}>copy</span>
                  </button>
                </td>
                <td>{string[objectValue[1]]}</td>
              </tr>
            );
          })
          :
          <h1>нет совпадений</h1>
          }
      </tbody>
    </table>
    </div>
  );
};