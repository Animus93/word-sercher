import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';
import styles from './List.module.css';

export const List = () => {
  const list = useSelector(state => state.wordList);
  const listofPhrasesIncludeWord = useSelector(
    state => state.listofPhrasesIncludeWord
  );
  const inputFilter = useSelector(state => state.filterParsedListArray);
  const objectValue = Object.keys(list[0]);


  const copyAll = () => {
    const phrases = listofPhrasesIncludeWord.filter(string => {
     return JSON.stringify(string[objectValue[0]])
        .toLocaleLowerCase()
        .includes(inputFilter.toLocaleLowerCase())
    }).map(string => `${string[objectValue[0]]}\r\n`);
    navigator.clipboard.writeText(phrases);
  };

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <td className={styles.cell1}>
              <b>{[objectValue[0]]}</b>
              <button onClick={copyAll} className={styles.copyAllBtn}>
                copy all
              </button>
            </td>
            <td className={styles.headCell}>
              {objectValue[1] && <b>{[objectValue[1]]}</b>}
            </td>
            <td className={styles.headCell}>
              {objectValue[2] && <b>{[objectValue[2]]}</b>}
            </td>
            <td className={styles.headCell}>
              {objectValue[3] && <b>{[objectValue[3]]}</b>}
            </td>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {listofPhrasesIncludeWord.length > 0 &&
            listofPhrasesIncludeWord.map(string => {
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
                    {!isNaN(string[objectValue[1]]) && (
                      <td>{string[objectValue[1]]}</td>
                    )}
                    {!isNaN(string[objectValue[2]]) && (
                      <td>{string[objectValue[2]]}</td>
                    )}
                    {!isNaN(string[objectValue[3]]) && (
                      <td>{string[objectValue[3]]}</td>
                    )}
                  </tr>
                );
              }
              return;
            })}
        </tbody>
      </table>
    </div>
  );
};
