import { OBTListGridInterface } from "luna-orbit"

//  OrbitListGrid 초기 설정
export const initializeGrid = (options, gridColumns, gridData) => {
  // console.log(gridColumns);
  // console.log("gridData: ", gridData);
  const grid : OBTListGridInterface = new OBTListGridInterface('grid', options)
    .setColumns(gridColumns)
    .setProvider({
      read: (e) => {
        // 데이터를 읽어올 때 옵션 설정 (Promise 리턴)
        // console.log("read: ", e);
        return new Promise((resolve) => {
          resolve(gridData);
        });
      },
      readPage: (e) => {
        // 읽어올 데이터 (Promise 리턴)
        // console.log("readPage: ", e);
        return new Promise((resolve) => {
          resolve(gridData);
        })
      }
    })

  return grid;
}