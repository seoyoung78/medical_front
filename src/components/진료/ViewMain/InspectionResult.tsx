import { OBTListGrid } from "luna-orbit";
import { useEffect, useState } from "react";
import { GridFitStyle } from "realgrid";
import { useRecoilValue } from "recoil";
import { patientState } from "../../../atoms/Recoils_진료";
import { inspectionColumns } from "../../../data/column";
import { resultList } from "../../../grids/Settings_진료";
import { getExmList } from "../../../utils/api/ApiService_진료";
import { initializeGrid } from "../../../utils/hooks/orbitListGrid";
import { Grid, GridInst, useGrid } from "../../../utils/hooks/useGrid"

export default function InspectionResult() {
  const iResultGrid = useGrid();
  const patient = useRecoilValue(patientState);

  let result = [];
  const options = {checkable: true};
  
  const [grid, setGrid] : any = useState(() => initializeGrid(options, inspectionColumns, result));

  const gridSetting = async ({grid, view, provider} : GridInst) => {
    if(patient.pid !== "") {
      result = await getExmList(patient.pid);
    }    
    grid.bindData(result);
    // 순번 제거
    view.setRowIndicator({visible: false});
    // 풋터 제거
    view.setFooters({visible: false});
    // 상태바 제거
    view.setStateBar({visible: false});
    // 화면 가득 채우기
    view.setOptions({
      display: {
        fitStyle: GridFitStyle.EVEN_FILL,
        rowHeight: 20,
      },
    })
  };

  const setting = async () => {
    try {
      if (patient.pid !== '') {
        result = await getExmList(patient.pid);;

        // setGrid(() => initializeGrid(options, inspectionColumns, result)); -> 초기화되었으면 변경되지 않음

        // provider를 별도로 지정해줘야 함
        grid.setProvider({
          read: () => {
            return new Promise((resolve) => {
              resolve(result);
            });
          },
          readPage: () => {
            return new Promise((resolve) => {
              resolve(result);
            })
          }
        })
      } else {
        grid.setProvider({
          read: () => {
            return new Promise((resolve) => {
              resolve(null);
            });
          },
          readPage: () => {
            return new Promise((resolve) => {
              resolve(null);
            })
          }
        })
      }
      grid.readData();
    } catch (error) {
      console.log(error);
    }
  }  
  
  const handleChange = () => {
    
  };

  useEffect(() => {
    iResultGrid.handler(gridSetting);
    setting();
    // console.log(grid);
  }, [patient]);

  return (
    <div className="section">
      <div className="panel shadow fx1">
        <div>
          <img src="./imgs/lab.png" alt=""/>
          <span>검사결과</span>
          <button><img src="./imgs/setting.png" alt=""></img></button>
        </div>
        <div style={{height: 300}}>
          {/* <Grid ref={iResultGrid.gridRef} gridSetting={resultList}/> */}
          <OBTListGrid interface={grid} onChange={handleChange} />
        </div>
      </div>
    </div>
  )
}