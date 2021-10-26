import { OBTCardListInterface } from "luna-orbit"

export const initCardGrid = (gridData) => {
  console.log(gridData);
  const grid : OBTCardListInterface = new OBTCardListInterface({
    dataAdapter: {
      read: (e) => {
        console.log("card read: ", e);
        return new Promise((resolve) => {
          resolve(gridData);
        })
      },
      readTotalCount: () => {
        return new Promise((resolve)=> {
          resolve(gridData.length);
        })
      },
      store: (e) => {
        console.log("card store: ", e);
        return new Promise((resolve) => {
          resolve(gridData);
        })
      }
    },
    cardListTemplate: {
      template: OBTCardListInterface.Template.default,
      main: "date"
    }
  })

  return grid;
}