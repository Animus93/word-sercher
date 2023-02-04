import { useDispatch, useSelector } from 'react-redux';
import { filterArrayOfWords } from 'Redux/filterArrayOfWordsSlice';
import { filterParsedListArray } from 'Redux/filterParsedListArraySlice';
import { filterSourceArrayByWord } from 'Redux/filterSourceArrayByWordSlice';
import { addArray } from 'Redux/wordListSlice';
import * as XLSX from 'xlsx/xlsx.mjs';
import { List } from '../List/List';
import { WordsList } from '../WordsList/WordsList';
import styles from './App.module.css';

export const App = () => {
  const wordList = useSelector(state => state.wordList);
  const filtredList = useSelector(state => state.filterSourceArrayByWord);
  const dispatch = useDispatch();
  const inputListFilter = useSelector(state => state.filterParsedListArray)
  const inputWordsFilter = useSelector(state => state.filterArrayOfWords)
  async function handleFile(e) {
    const files = e.target.files;
    const f = files[0];
    const reader = new FileReader();
    reader.readAsBinaryString(f);
    reader.onload = e => {
      const data = e.target.result;
      const list = XLSX.read(data, { type: 'binary' });
      const sourceArray = XLSX.utils.sheet_to_row_object_array(
        list.Sheets['Лист1']
      );
      dispatch(addArray(sourceArray));
    };
  }

  return (
    <div className={styles.container}>
      {wordList.length <= 0 ? (
        <>
          <input
            type="file"
            id="fileUploader"
            name="fileUploader"
            accept=".xls, .xlsx"
            onChange={handleFile}
          />
          <h1>Heт Данных загрузите файл формата xlsx или xls</h1>
        </>
      ) : (
        <>
          <div className={styles.buttons}>
            {/* <button className={styles.phrasesBtn} >
              {' '}
              ✓ фразы
            </button> */}
          </div>
          <div className={styles.head}>
            <form>
              <input
                type="text"
                value={inputWordsFilter}
                onChange={e => {
                  dispatch(filterArrayOfWords(e.currentTarget.value));
                }}
                placeholder="Фильтр"
              />
            </form>
            <input
              type="text"
              id="Listfilter"
              value={inputListFilter}
              className={styles.input}
              name="Listfilter"
              onChange={e => {
                dispatch(filterParsedListArray(e.currentTarget.value));
              }}
            />
            <button
              className={styles.closeBtn}
              onClick={() => {
                dispatch(addArray(''));
                dispatch(filterArrayOfWords(''));
                dispatch(filterSourceArrayByWord(''));
                dispatch(filterParsedListArray(''));
              }}
            >
              {' '}
              Закрыть
            </button>
          </div>
          <div className={styles.content}>
            <div className={styles.WordsList}>
              <WordsList />
            </div>
            {filtredList.length > 0 && (
              <div className={styles.listContent}>
                <List />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
