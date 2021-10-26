import { OBTMultiLineTextField } from "luna-orbit";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { patientState } from "../../../atoms/Recoils_진료";
import { saveRcpnMemo } from "../../../utils/api/ApiService_진료";
import Memo from "../../공통/Memo";

function CLRS0103 () {
  const [content, setContent] = useState('');
  const [patient, setPatient] = useRecoilState(patientState);

  // 접수메모 저장
  const handleSave = async (memo) => {
    if (content !== patient.rcpn_memo) {
      await saveRcpnMemo(patient.pid , content);
      setPatient({
        ...patient,
        rcpn_memo: content
      });
    };
    // if (memo !== patient.rcpn_memo) {
    //   await saveRcpnMemo(patient.pid , memo);
    //   setPatient({
    //     ...patient,
    //     rcpn_memo: memo
    //   });
    // };
  };

  useEffect(() => {
    if(patient.pid !== '') {
      setContent(patient.rcpn_memo);
    };
  }, [patient]);
  
  return(
    <div className="section">
      <div className="panel shadow fx1">
        <div>
          <img src="./imgs/memo.png" alt=""/>
          <span>접수메모</span>
        </div>
        <div>
          <OBTMultiLineTextField value={patient.pid === '' ? '' : content} 
                                onChange={(e) => setContent(e.value)}
                                fixed={true} 
                                disabled={patient.pid === '' ? true : false}
                                placeHolder='접수메모를 입력하세요.'
                                onBlur={handleSave}/>
          {/* <Memo memo={patient.rcpn_memo} placeHolder='접수메모를 입력하세요.' save={(memo) => handleSave(memo)}/> */}
        </div>
      </div>
    </div>    
  )
}

export default CLRS0103;