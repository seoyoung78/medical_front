import { OBTButton, OBTSnackbar } from "luna-orbit";
import { useState } from "react";
import CommonLine from "../../공통/CommonLine";
import SubHeader from "../../공통/SubHeader";
import CLRP0003 from "../CLRP0003_진료기록조회";
import CLRS0101 from "./CLRS0101_환자정보";
import CLRS0102 from "./CLRS0102_진료메모";
import CLRS0103 from "./CLRS0103_접수메모";
import CLRS0108 from "./CLRS0108_진단";
import InspectionResult from "./InspectionResult";
import PhysicalReview from "./PhysicalReview";
import CLRS0110 from "./CLRS0110_처방";
import PrescriptionInquiry from "./PrescriptionInquiry";
import ProgressNote from "./ProgressNote";

export default function ViewMain() {
  // 처방조회 Dialog 상태
  const [open, setOpen] = useState<boolean>(false)
  // 완료 버튼 클릭 시 진료 저장 + Snackbar 사용 상태
  const [save, setSave] = useState<boolean>(false);

  return(
    <>
      <SubHeader title='진료_진료메인'/>
      <CommonLine/>
      <div className="his-content">
        <div className="section-wrap">
          <div className="col">
            <div className="fr4">
              {/* 환자정보, 진료메모, 접수메모, 신체사정 */}
              <CLRS0101/>
              <div className="col pd0 fx1">
                <CLRS0102/>
                <CLRS0103/>
              </div>
              <PhysicalReview/>
            </div>
            <div className="fr4">
              {/* 검사결과, 처방조회 */}
              <InspectionResult/>
              <PrescriptionInquiry/>
            </div>
            <div className="box fr4">
              {/* 경과기록, 진단, 처방, 보류/완료 버튼 */}
              <ProgressNote/>
              <CLRS0108 save={save}/>
              <CLRS0110/>
              <div>
                <OBTButton labelText='처방조회' onClick={() => setOpen(true)}/>
                <CLRP0003 open={open} setOpen={setOpen}/>

                {/* <LUXDialog onRequestClose={true}
                            handleOnReqeustClose={() => setDialog(false)}
                            handleOnEscClose={() => setDialog(false)}
                            dialogOpen={() => setDialog(true)}>
                  <CLRP0003/>
                </LUXDialog>z */}
                {/* <OBTDialog open={dialog} title='확인' buttons={OBTDialog.Buttons.}>
                  <CLRP003/>  
                <OBTDialog/> */}
                <OBTButton labelText='보류'/>
                <OBTButton labelText='완료' theme={OBTButton.Theme.blue} onClick={() => setSave(true)}/>
                <OBTSnackbar labelText='처방이 완료되었습니다.' type={OBTSnackbar.Type.success} open={save} onChange={()=>setSave(false)}/>
              </div>
            </div>
          </div>            
        </div>
      </div>
    </>
  )
}