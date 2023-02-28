import { useDispatch, useSelector } from 'react-redux';
import { filterArrayOfWords } from 'Redux/filterArrayOfWordsSlice';
import { filterParsedListArray } from 'Redux/filterParsedListArraySlice';
import { listofPhrasesIncludeWord } from 'Redux/listofPhrasesIncludeWordSlice';
import { addArray } from 'Redux/wordListSlice';
import * as XLSX from 'xlsx/xlsx.mjs';
import { List } from '../List/List';
import { WordsList } from '../WordsList/WordsList';
import styles from './App.module.css';

export const App = () => {
  const dispatch = useDispatch();
  const wordList = useSelector(state => state.wordList);
  const listofPhrases = useSelector(
    state => state.listofPhrasesIncludeWord
  );
  const inputListFilter = useSelector(state => state.filterParsedListArray);
  const inputWordsFilter = useSelector(state => state.filterArrayOfWords);
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
            <button className={styles.phrasesBtn}> ✓ фразы</button>
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
            {/* <input
              type="text"
              id="Listfilter"
              value={inputListFilter}
              className={styles.input}
              name="Listfilter"
              onChange={e => {
                dispatch(filterParsedListArray(e.currentTarget.value));
              }}
            /> */}
            <button
              className={styles.closeBtn}
              onClick={() => {
                dispatch(addArray(''));
                dispatch(filterArrayOfWords(''));
                dispatch(listofPhrasesIncludeWord(''));
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
            {listofPhrases.length && (
              <div className={styles.listContent}>
                 <input
              type="text"
              id="Listfilter"
              value={inputListFilter}
              className={styles.inputList}
              name="Listfilter"
              onChange={e => {
                dispatch(filterParsedListArray(e.currentTarget.value));
              }}
            />
                <List />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
