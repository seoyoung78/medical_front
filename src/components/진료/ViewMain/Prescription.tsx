import { useEffect } from "react";
import { GridFitStyle } from "realgrid";
import { useRecoilValue } from "recoil";
import { patientState } from "../../../atoms/Recoils_진료";
import { prescriptionList } from "../../../grids/Settings_진료";
import { getAll } from "../../../utils/api/ApiService_진료";
import { useGrid, GridInst, Grid } from "../../../utils/hooks/useGrid"

export default function Prescription() {
  const prescriptionGrid = useGrid();
  const patient = useRecoilValue(patientState);

  const gridSetting = async ({ grid, view, provider } : GridInst) => {    
    let result = [];   
    if (patient.pid !== "") {
      result = await getAll(); 
    }
    // grid에 데이터 연결
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

  useEffect(() => {
    prescriptionGrid.handler(gridSetting);
  }, [patient])

  return (
    <div className="box">
      <div className=""> 
        <img src="./imgs/order.png" alt=""></img>
        <span>처방</span>
        <button>
          <img src="./imgs/setting.png" alt=""></img>
        </button>
      </div>
      <div style={{height: 200}}>
        <Grid ref={prescriptionGrid.gridRef} gridSetting={prescriptionList}/>
      </div>
    </div>
  )
}