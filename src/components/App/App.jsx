import { useDispatch, useSelector } from 'react-redux';
import { filterArrayOfWords } from 'Redux/filterArrayOfWordsSlice';
import { addArray } from 'Redux/wordListSlice';
import * as XLSX from 'xlsx/xlsx.mjs';
import { List } from '../List/List';
import { WordsList } from '../WordsList/WordsList';
import styles from './App.module.css'

export const App = () => {
  const wordList = useSelector(state => state.wordList);
  const filtredList = useSelector(state => state.filterSourceArrayByWord);
  const dispatch = useDispatch();

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
      <input
        type="file"
        id="fileUploader"
        name="fileUploader"
        accept=".xls, .xlsx"
        onChange={handleFile}
      />
      {wordList.length <= 0 ? (
        <>
          <h1>Heт Данных загрузите файл формата xlsx или xls</h1>
        </>
      ) : (
        <>
        <form>
        <input 
        type="text"
        onChange={(e)=>{dispatch(filterArrayOfWords(e.currentTarget.value))}}
        placeholder='Фильтр' />
      </form>
        <div className={styles.content}>
          <div className={styles.WordsList}><WordsList/></div>
          {filtredList.length > 0 && <List/>}
        </div>
        </>
      )}
    </div>
  );
};
