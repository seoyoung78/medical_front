import { OBTListGrid } from "luna-orbit";
import { useEffect, useState } from "react";
import { GridFitStyle } from "realgrid";
import { useRecoilValue } from "recoil";
import { patientState } from "../../../atoms/Recoils_진료";
import { physicalColumns } from "../../../data/column";
import { physicalReviewData } from "../../../data/data";
import { physicalReviewList } from "../../../grids/Settings_진료";
import { initializeGrid } from "../../../utils/hooks/orbitListGrid";
import { Grid, GridInst, useGrid } from "../../../utils/hooks/useGrid"

export default function PhysicalReview() {
  const physicalReveiwGrid = useGrid();
  const patient = useRecoilValue(patientState);

  // UFOLuxGrid 적용
  const gridSetting = ({ grid, view, provider } : GridInst) => {
    if(patient.pid !== "") {
      grid.bindData(physicalReviewData);
    }
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
      }
    })
  };

  // OrbitListGrid 적용
  const options = null;
  const [grid, setGrid] = useState(() => initializeGrid(options, physicalColumns, physicalReviewData));
  
  useEffect(() => {
    // physicalReveiwGrid.handler(gridSetting);
    if (patient.pid !== '') {
      grid.readData();      
    } else {
      grid.clearData();
    }
  }, [patient])
  
  return (
    <div className="section">
      <div className=" panel shadow fx1">
        <div className="col">
          <div className="left">
            <img src="./imgs/vital.png" alt=""/>
            <span>신체사정</span>
          </div>
          <div className="right">
            <button><img src="./imgs/graph.png" alt=""/></button>
            <button><img src="./imgs/setting.png" alt=""/></button>
          </div>
        </div>
        <div style={{height: 250}}>
          {/* <Grid ref={physicalReveiwGrid.gridRef} gridSetting={physicalReviewList}/> */}
          <OBTListGrid interface={grid} onChange={()=>{}}/>
        </div>
      </div>
    </div>    
  )
}