import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import LUXBoookMark from "luna-rocket/LUXBookMark";
import { patientState, rcpnState } from "../../../../atoms/Recoils_진료";
import CLRS0101Update from "./CLRS0101Update";
import { saveCncnPt } from "../../../../utils/api/ApiService_진료";
import { OBTTooltip } from "luna-orbit";

function CLRS0101() {
  const [ patient, setPatient ] = useRecoilState(patientState);
  const rcpn = useRecoilValue(rcpnState);
  const [open, setOpen] = useState<boolean>(false);

  const handleBookmark = async (e) => {
    if(e === true) {
      setPatient({
        ...patient,
        cncn_pt_yn: 'Y'
      })
      await saveCncnPt(patient.pid, 'Y');
    } else {
      setPatient({
        ...patient,
        cncn_pt_yn: 'N'
      })
      await saveCncnPt(patient.pid, 'N');
    };
  }

  useEffect(() => {
    if (!isNaN(dayjs(new Date()).get('year') - dayjs(patient.dobr).get('year'))) {
      return setPatient({
        ...patient,
        age: dayjs(new Date()).get('year') - dayjs(patient.dobr).get('year')
      })
    }
  }, []);

  return (
    <div className="section">
      <div className="panel shadow fx1" style={{height: 250}}>
        <div>
          <img src="./imgs/patient_empty.png" alt=""></img>
          <span>환자 정보</span>
          <button onClick={() => setOpen(true)}>
            <img src="./imgs/setting.png" alt=""></img>
          </button>
          <CLRS0101Update open={open} setOpen={setOpen}/>
        </div>
        <hr/>

        {patient.pid === '' ?
          <div>
            <div>no.</div>
            <div>선택된 환자가 없습니다.</div>
          </div>
        :
          <div>
            <div>
              <div>
                no.{patient.pid}        
                <div>
                  {patient.priv_pt_yn === 'Y' ? 
                    <OBTTooltip labelText='사생활보호 환자 입니다.' theme={OBTTooltip.Theme.black} position={OBTTooltip.Position.bottom}>
                      <img src='./imgs/privacy.png' alt=''/>
                    </OBTTooltip>
                    :
                    <></>
                  }
                  {patient.vip_pt_yn === 'Y' ?
                    <OBTTooltip labelText='VIP 환자 입니다.'>
                      <img src='./imgs/vip.png' alt=''/>
                    </OBTTooltip>
                    :
                    <></>
                  } 
                  <OBTTooltip labelText={patient.cncn_pt_yn === 'Y' ? '관심 환자 입니다.' : '관심 환자 표시 영역입니다.'}>
                    <LUXBoookMark id='bookmark1' switchOn={patient.cncn_pt_yn === 'Y' ? true : false} onBookMark={handleBookmark}/>
                  </OBTTooltip>
                </div>
              </div>
              <div>{patient.pt_nm} {patient.sex_cd} / {dayjs(new Date()).get('year') - dayjs(patient.dobr).get('year')} {dayjs(patient.dobr).format('YYYY-MM-DD')}</div>
            </div>
            <hr/>
            <div>
              <div className='col'>
                <div>
                  <div>보험 구분</div>
                  <div>{rcpn.insn_tycd}</div>
                </div>
                <div>
                  <div>접수 구분</div>
                  <div>초진</div>
                </div>
                <div>
                  <div>보조유형</div>
                  <div>{rcpn.type_asst_cd}</div>
                </div>
                <div>
                  <div>외래경로</div>
                  <div>포탈검색</div>
                </div>
                <div>
                  <div>내원일</div>
                  <div>{dayjs(rcpn.mdcr_date).format('YY/MM/DD')}</div>
                </div>
              </div>
              <div>
              </div>
            </div>
          </div>
        }
          
      </div>
    </div>
  ) 
}

export default CLRS0101;