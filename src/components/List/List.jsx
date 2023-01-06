import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';
import styles from './List.module.css';

export const List = () => {
  const phraseList = useSelector(state => state.wordList);
  const filter = useSelector(state => state.filterSourceArrayByWord);
  const objectValue = Object.keys(phraseList[0]);
  
  return (
    <table>
      <thead>
        <tr>
          <td className={styles.cell1}>
            <b>{[objectValue[0]]}</b>
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
          .map(string => {
            return (
              <tr key={nanoid()}>
                <td>
                  <button
                    className={styles.copyBtn}
                    onClick={(e) => {navigator.clipboard.writeText(e.currentTarget.firstChild.data)}}
                    // onClick={e => {
                    //   copyText(e.currentTarget.firstChild.data);
                    // }}
                  >
                    {string[objectValue[0]]}
                  <span className={styles.copyBtnTip}>Копировать</span>
                  </button>
                </td>
                <td>{string[objectValue[1]]}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
