import { OBTMultiLineTextField } from "luna-orbit";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { patientState } from "../../../atoms/Recoils_진료";
import { saveMdcrMemo } from "../../../utils/api/ApiService_진료";
import Memo from "../../공통/Memo";

function CLRS0102 () {
  // const [content, setContent] = useState('');
  const [patient, setPatient] = useRecoilState(patientState);

  // 진료메모 저장
  const handleSave = async (memo) => {
    if (memo !== patient.mdcr_memo) {
      await saveMdcrMemo(patient.pid, memo);
      setPatient({
        ...patient, 
        mdcr_memo: memo
      });
    };
  };

  useEffect(() => {
    if(patient.pid !== '') {
      // setContent(patient.mdcr_memo);
    };
  }, [patient]);

  return(
    <div className="section">
      <div className="panel shadow fx1">
        <div>
          <img src="./imgs/memo.png" alt=""/>
          <span>진료메모</span>      
        </div>
        <div>
          {/* <OBTMultiLineTextField value={patient.pid === '' ? '' : content} 
                                 onChange={(e) => setContent(e.value)} 
                                 fixed={true} 
                                 disabled={patient.pid === '' ? true : false}
                                 placeHolder="진료메모를 입력하세요."
                                 onBlur={handleSave}/> */}
          <Memo memo={patient.mdcr_memo} placeHolder='진료메모를 입력하세요.' save={(memo) => handleSave(memo)}/>
        </div>
      </div>
    </div>
  )
}

export default CLRS0102;