import CyrillicToTranslit from 'cyrillic-to-translit-js';


export const listParser = (phraseList, word) => {
  const objectValue = Object.keys(phraseList[0]);
  const cyrillicToTranslit = new CyrillicToTranslit();

    return phraseList
    .filter(string => {
      if(word){
        if (word.length === 1 && cyrillicToTranslit.transform(string[objectValue[0]]).match(new RegExp(`\\b${cyrillicToTranslit.transform(word)}\\b`)) ||
        word.length > 1 && cyrillicToTranslit.transform(string[objectValue[0]]).match(new RegExp(`\\b${cyrillicToTranslit.transform(word)}`))) {
          // if (cyrillicToTranslit.transform(string[objectValue[0]]).match(new RegExp(`\\b${cyrillicToTranslit.transform(word)}\\b`))) {
          return true;
        }
          return false;
      } else {
        return true
      }
          })
          .sort((a,b)=> b[objectValue[1]]-a[objectValue[1]])

};

export const listEqual = (phraseList, word) => {
  const objectValue = Object.keys(phraseList[0]);
  const cyrillicToTranslit = new CyrillicToTranslit();

    return phraseList
    .filter(string => {
      if(word){
          if (cyrillicToTranslit.transform(string[objectValue[0]]).match(new RegExp(`\\b${cyrillicToTranslit.transform(word)}\\b`))) {
          return true;
        }
          return false;
      } else {
        return true
      }
          })
          .sort((a,b)=> b[objectValue[1]]-a[objectValue[1]])
}



