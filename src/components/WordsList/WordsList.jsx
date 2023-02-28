import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import styles from './WordsList.module.css';
import { listofPhrasesIncludeWord } from 'Redux/listofPhrasesIncludeWordSlice';
import Snowball from 'snowball';
import { useState } from 'react';
import { useEffect } from 'react';

export const WordsList = () => {
  const [resultArrayOfWords, setResultArrayOfWords] = useState([]);
  const dispatch = useDispatch();
  const list = useSelector(state => state.wordList);
  const objectValue = Object.keys(list[0]);
  const filter = useSelector(state => state.filterArrayOfWords);
  const stremmer = new Snowball('Russian');

  //Перебирается полученный массив объектов из XLSX файла, добавляется поле root (корень слова получается
  //при помощи библиотеки "snowball", добавляется id, изменяется тип первых полей объектов из String в Array
  // (необходимо для дальнейших манипуляций) )

  useEffect(()=>{
    const wordsWithRootAsKeyNEW = list
      .map(obj => {
        const string = Object.values(obj)[0];
        const words = string.split(' ');
        const result = words.map(word => {
          stremmer.setCurrent(word);
          stremmer.stem();
          const root = stremmer.getCurrent();
          return Object.assign({}, obj, {
            id: nanoid(),
            root,
            [objectValue[0]]: [word],
            phrases: [],
          });
        });
        return result;
      })
      .flat();
  
    //Сбрасываются показания всех полей с числовым показателем "Частота вхождения" если таковые есть
    wordsWithRootAsKeyNEW.forEach(object => {
      return (
        object[objectValue[1]] ? (object[objectValue[1]] = 0) : null,
        object[objectValue[2]] ? (object[objectValue[2]] = 0) : null,
        object[objectValue[3]] ? (object[objectValue[3]] = 0) : null
      );
    });
  
    const uniqueWordsNEW = [];
  // добволяются солова соответствующие корню в массив root
    for (let obj of wordsWithRootAsKeyNEW) {
      const foundObj = uniqueWordsNEW.find(o => o.root === obj.root);
      foundObj
        ? foundObj[objectValue[0]].push(...obj[objectValue[0]])
        : uniqueWordsNEW.push(obj);
    }
  //удаляются дубли слов из массива root
    uniqueWordsNEW.forEach(obj => {
      obj[objectValue[0]] = [...new Set(obj[objectValue[0]])].sort(
        (a, b) => a.length - b.length
      );
    });
  // добавляются фразы в массив в которые входит текущее слово 
    uniqueWordsNEW.forEach(uniqueWordsNEWItem => {
      return uniqueWordsNEWItem[objectValue[0]].forEach(word => {
        list.forEach(listItem => {
          let strToObj = new Set(
            listItem[objectValue[0]].split(' ')
            // listItem[objectValue[0]].split(/[^\u0400-\u04ff]+/)
            );
          if (
            Boolean(
              strToObj.has(word) ||
                listItem[objectValue[0]].match(new RegExp(`\\b${word}\\bgi`))
            )
          ) {
           return uniqueWordsNEWItem.phrases.push(listItem);
          }
        });
      });
    });
  
  // удаляются дубликаты из массива фраз
  
    uniqueWordsNEW.forEach(obj => {
      obj.phrases = [...new Set(obj.phrases)];
    });
    
  // суммируется частота фраз к словам который входият в эти фразы
    uniqueWordsNEW.forEach(obj => {
      obj.phrases.forEach(phraseObj => {
        obj[objectValue[1]] += phraseObj[objectValue[1]];
        obj[objectValue[2]] += phraseObj[objectValue[2]];
        obj[objectValue[3]] += phraseObj[objectValue[3]];
      })
    })
    setResultArrayOfWords(uniqueWordsNEW)
    // eslint-disable-next-line
  },[list])
  //

  const render = () => {
    return resultArrayOfWords.map(item => {
      if (
        JSON.stringify(item[objectValue[0]])
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase())
      ) {
        return (
          <tr
            key={item.id}
            className={styles.tableStr}
            // ОТПРАВИТЬ МАССИВ ФРАЗ
            onClick={() => {
              dispatch(listofPhrasesIncludeWord(item.phrases));
            }}
          >
            <td className={styles.tableСell0}>
              <input
                className={styles.chekBox}
                type="checkbox"
                onChange={console.log}
              />
            </td>
            <td className={styles.tableСell1}>{item[objectValue[0]][0]}</td>
            {!isNaN(item[objectValue[1]]) && <td className={styles.tableСell2}>{item[objectValue[1]]}</td>}
            {!isNaN(item[objectValue[2]]) && <td className={styles.tableСell2}>{item[objectValue[2]]}</td>}
            {!isNaN(item[objectValue[3]]) && <td className={styles.tableСell2}>{item[objectValue[3]]}</td>}
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
                <b>{objectValue[0]}</b>
              </td>
              {objectValue[0] && <td className={styles.tableСell2}>
                <b>{objectValue[1]}</b>
              </td>}
              {objectValue[2] && <td className={styles.tableСell2}>
                <b>{objectValue[2]}</b>
              </td>}
              {objectValue[3] && <td className={styles.tableСell2}>
                <b>{objectValue[3]}</b>
              </td>}
            </tr>
          </thead>
          {resultArrayOfWords.length > 0 && <tbody>{render()}</tbody>}
        </table>
      </div>
    </>
  );
};
