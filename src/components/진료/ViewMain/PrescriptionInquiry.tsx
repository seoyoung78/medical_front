import { OBTAccordion, OBTAccordionGroup, OBTTab, OBTTabs } from "luna-orbit";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { patientState } from "../../../atoms/Recoils_진료";
import { prescriptionHis } from "../../../data/data";
import { getSlip } from "../../../utils/api/ApiService_진료";
import SetPrescription from "./SetPrescription";

export default function PrescriptionInquiry() {
  const [state, setState] = useState({
    value: '1'
  });
  const patient = useRecoilValue(patientState);
  const [list, setList] : any[] = useState([]);

  const handleClick = async () => {
    if(patient.pid !== "") {
      let slist = await getSlip();
      setList(slist);
    } else {
      setList([]);
    }
  };

  useEffect(() => {
    handleClick();
  }, [patient]);

  return (
    <div className="section" style={{height: 400}}>
      <div className="panel shadow fx1">
        <div>
          <img src="./imgs/order.png" alt=""></img>
          <span>처방조회</span>
          <button><img src="./imgs/setting.png" alt=""></img></button>
        </div>
        <div>
          <OBTTabs value={state.value} onChange={(e) => setState({value: e.value})}>
            <OBTTab labelText="과거기록" value="1">
              <OBTAccordionGroup>     
                {patient.pid !== '' ? prescriptionHis.map((his, index) => 
                  <OBTAccordion key={index} labelText={his.date + " " + his.doctor}
                                state={{
                                  labelText: '재진',
                                  color: '#46a3f0'
                                }}>{his.comment + index}</OBTAccordion>
                ) 
                : 
                <div>처방데이터가 없습니다.</div>}           
              </OBTAccordionGroup>
            </OBTTab>
            <OBTTab labelText="약속처방" value="2">
              <SetPrescription />
            </OBTTab>
            <OBTTab labelText="슬립" value="3" onActivate={handleClick}>   
              <OBTAccordionGroup>
                {patient.pid !=='' ? list.map((slist, index) => 
                  {
                    return (
                      <OBTAccordion key={index} labelText={slist.slip_cd + " " + slist.slip_nm}>
                        <div>
                          <p>슬립코드: {slist.slip_cd + " " + slist.slip_dspl_seq + " " + slist.prsc_clsf_cd}</p>  
                          <p>슬립명: {slist.slip_nm}</p>  
                        </div></OBTAccordion>)
                  }
                )
                :
                  <div>처방데이터가 없습니다.</div>
                }
              </OBTAccordionGroup>              
            </OBTTab>
          </OBTTabs>
        </div>
      </div>
    </div>
  )
}