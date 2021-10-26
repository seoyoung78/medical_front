import { OBTCardList, OBTCardListInterface } from "luna-orbit"
import { useEffect, useState } from "react";
import { progressData } from "../../../data/data"
import { initCardGrid } from "../../../utils/hooks/orbitCardGrid";

export default function ProgressNote() {
  // const [grid, setGrid] = useState(() => {initCardGrid(progressData)});
  const [grid, setGrid] = useState(() => new OBTCardListInterface({
    dataAdapter: {
      read: (e) => {
        console.log("card read: ", e);
        return new Promise((resolve) => {
          resolve(progressData);
        })
      },
      readTotalCount: () => {
        return new Promise((resolve) => {
          resolve(progressData.length);
        })
      },
      store: (e) => {
        return new Promise((resolve) => {
          resolve(progressData);
        })
      }
    },
    cardListTemplate: {
      template: OBTCardListInterface.Template.default,
      main: "date",
      subLeft: "statu",
      subRight: "comment"
    }
  }));

  useEffect(() => {
    // grid.readData();
  }, [])

  return (
    <div className="box">
      <div>
        <img src="./imgs/memo.png" alt=">"></img>
        <span>경과기록</span>
        <button>
          <img src="./imgs/setting.png" alt=""></img>
        </button>
      </div>
      <div>
        <div style={{height:200}}>
          <OBTCardList interface={grid}/>
        </div>
      </div>
    </div>
  )
}