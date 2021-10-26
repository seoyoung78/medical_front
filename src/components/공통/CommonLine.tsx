import { OBTComplete } from "luna-orbit";
import { useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil";
import { patientState, rcpnState } from "../../atoms/Recoils_진료";
import { getPatientRcpn, getSearchPatient } from "../../utils/api/ApiService_진료";

export default function CommonLine() {
  const [keyword, setKeyword] = useState('');
  const [patient, setPatient] = useRecoilState(patientState);
  const setRcpn = useSetRecoilState(rcpnState);

  let pList = [];

  // Complete 컴포넌트에 보여질 항목 설정
  const getDataInfo = () => {
    return {
      columnWidths: ["25%", "25%", "25", "25%"],
      itemInfo: [
        {
          key: "pid",
          column: 0
        },
        {
          key: "pt_nm",
          column: 1,
          isKeyValue: true
        },
        {
          key: "sex_cd",
          column: 2
        },
        {
          key: "dobr",
          column: 3
        }
      ]
    }
  }

  // 키워드에 맞는 환자 목록 가져오기
  const searchPatient = async () => {
    pList = await getSearchPatient(keyword);
    return pList;
  };

  // 환자 선택 시 Recoil에 저장
  const clickPatient = async (e) => {
    if (e.target.data !== undefined) {
      setPatient(e.target.data);
      let data = await getPatientRcpn(e.target.data.pid);
      setRcpn(data);
    }
  };

  // 초기화 버튼 클릭 시 발생 이벤트
  const handleReset = () => {
    setPatient({
      pid: '',
      pt_nm: '',
      sex_cd: '',
      dobr: ''
    });
    setKeyword('');
  };
  
  return (
    <div className="common-line">
      <div className="left">
        {/* <OBTTextField className="info" placeHolder="환자 조회" value={keyword} onChange={(e) => setKeyword(e.value)}/> */}
        <OBTComplete className="" 
                     placeHolder="환자 조회" 
                     value={keyword} onChange={(e) => {setKeyword(e.value); clickPatient(e)}} 
                     onSearch={searchPatient} 
                     dataInfo={getDataInfo()}
                     width={"200px"} />
        {/* <OBTButton labelText="찾기" onClick={searchPatient}/> */}
        {patient.pid !== ''? 
          <div className="info">
            <img src="./imgs/patient.png" alt=""/>
            <p>{patient.pt_nm}</p>
            <div>
              <span>no.{patient.pid}</span>
              <span>({patient.sex_cd}/세) {patient.dobr}</span>
            </div>
          </div>
          :
          <></>
        }
      </div>
      <div className="right">
        <button type="button"><img src="./imgs/reset.png" alt="" onClick={handleReset}></img>초기화</button>
        <span>|</span>
        <button type="button"><img src="./imgs/patientList.png" alt=""></img>환자 현황</button>
      </div>
    </div>
  )
}