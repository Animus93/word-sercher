import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';
import styles from './List.module.css';

export const List = () => {
  const phraseList = useSelector(state => state.wordList);
  const filter = useSelector(state => state.filterSourceArrayByWord);
  const objectValue = Object.keys(phraseList[0]);

  const copyAll = () => {
    const test = phraseList.filter(string => {
      if (string[objectValue[0]].indexOf(filter) >= 0) {
        return true;
      } else {
        return false;
      }
    })
    .sort((a,b)=> b[objectValue[1]]-a[objectValue[1]])
    .map(string => {
    return (
        `${string[objectValue[0]]}\r\n`
    )
    });
    navigator.clipboard.writeText(test)
  }
  
  return (
    <table>
      <thead>
        <tr>
          <td className={styles.cell1}>
            <b>{[objectValue[0]]}</b>
            <button 
            onClick={copyAll}
            className={styles.copyAllBtn}>Копировать всё</button>
          </td>
          <td>
            <b>{[objectValue[1]]}</b>
          </td>
        </tr>
      </thead>
      <tbody>
        {phraseList
          .filter(string => {
            if (string[objectValue[0]].indexOf(filter) >= 0) {
              return true;
            } else {
              return false;
            }
          })
          .sort((a,b)=> b[objectValue[1]]-a[objectValue[1]])
          .map(string => {
            return (
              <tr key={nanoid()}>
                <td>
                  <button
                    className={styles.copyBtn}
                    onClick={(e) => {navigator.clipboard.writeText(e.currentTarget.firstChild.data)}}
                    >
                    {string[objectValue[0]]}
                  <span className={styles.copyBtnTip}>Копировать</span>
                  </button>
                </td>
                <td>{string[objectValue[1]]}</td>
              </tr>
            );
          })
          }
      </tbody>
    </table>
  );
};
