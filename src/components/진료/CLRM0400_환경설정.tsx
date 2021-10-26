import { OBTButton, OBTFormPanel, OBTRadioButton, OBTRadioButtonGroup, OBTTab, OBTTabs } from "luna-orbit";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { naviState } from "../../atoms/Recoils_진료";
import CommonLine from "../공통/CommonLine";
import SubHeader from "../공통/SubHeader";

export default function CLRM0400() {
  // 좌측 Lnb 상태
  const setNavi = useSetRecoilState<boolean>(naviState);

  // Tab 상태
  const [tab, setTab] = useState('1');
  
  // 환경설정 설정값 상태
  const [value, setValue] = useState('1')
  const handleChange = (e) => {
    // console.log(e);
    setValue(e.value)
  }

  useEffect(() => {
    setNavi(false);
  },[])

  return (
    <>
      <SubHeader title='진료_환경설정'/>
      <CommonLine />
      <div className="his-content">
        <div className="section-wrap">
          <OBTTabs value={tab} onChange={(e) => setTab(e.value)}>
            <OBTTab labelText='환경설정1' value='1'>
              환경설정1
              <OBTFormPanel disabled={false}>
                <colgroup>
                  <col typeof='label'/>
                  <col width='300px'/>
                  <col typeof='label'/>
                  <col width='300px'/>
                </colgroup>
                <tbody>
                  <tr>
                    <th>경과기록 설정</th>
                    <td>
                      <OBTRadioButtonGroup value={value} onChange={(e)=>handleChange(e)}>
                        <OBTRadioButton value='1' labelText='기본' onChange={()=>{}}/>
                        <OBTRadioButton value='2' labelText='SOAP' onChange={()=>{}}/>
                      </OBTRadioButtonGroup>
                    </td>
                    <th>환경설정1 항목2</th>
                    <td>기본</td>
                  </tr>
                  <tr>
                    <th>환경설정1 항목3</th>
                    <td>test</td>
                    <th>환경설정1 항목4</th>
                    <td>test</td>
                  </tr>
                  <tr>
                    <th>환경설정1 항목5</th>
                    <td>test</td>
                    <th>환경설정1 항목6</th>
                    <td>test</td>
                  </tr>
                  <tr>
                    <th>환경설정1 항목7</th>
                    <td>test</td>
                    <th>환경설정1 항목8</th>
                    <td>test</td>
                  </tr>
                </tbody>
              </OBTFormPanel>
              <div>
                <OBTButton labelText='취소'/>
                <OBTButton labelText='저장' theme={OBTButton.Theme.blue}/>
              </div>
            </OBTTab>
            <OBTTab labelText='환경설정2' value='2'>
              환경설정2
              <div>
                <OBTButton labelText='취소'/>
                <OBTButton labelText='저장' theme={OBTButton.Theme.blue}/>
              </div>
            </OBTTab>
            <OBTTab labelText='환경설정3' value='3'>
              환경설정3
              <div>
                <OBTButton labelText='취소'/>
                <OBTButton labelText='저장' theme={OBTButton.Theme.blue}/>
              </div>
            </OBTTab>
          </OBTTabs>
        </div>
      </div>
    </>
  )
}