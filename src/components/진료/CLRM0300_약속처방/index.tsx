import { OBTButton, OBTTextField, OBTTreeView } from "luna-orbit";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { naviState } from "../../../atoms/Recoils_진료";
import { setList } from "../../../data/data";
import CommonLine from "../../공통/CommonLine";
import SubHeader from "../../공통/SubHeader";
import CLRM0300Form from "./CLRM0300Form";

export default function CLRM0300() {
  // Lnb 상태 설정
  const setNavi = useSetRecoilState<boolean>(naviState);

  // 약속 처방 검색 상태
  const [keyword, setKeyword] = useState('');

  // 약속 처방 상태
  const [id, setId] = useState('0')

  

  const handleChange = (e) => {
    setKeyword(e.value);
  };

  useEffect(() => {
    setNavi(false);
  },[])

  return (
    <>
      <SubHeader title='진료_약속처방'/>
      <CommonLine/>
      <div className="his-content">
        <div className="section-wrap">
          <div className="col">
            <div className="fr3">
              <div style={{width: '100%'}}>
                <OBTButton labelText='새 약속처방 추가' theme={OBTButton.Theme.blue} onClick={()=>setId('1')}/>
              </div>
              <span>약속처방 목록</span>
              <div className="border">
                <div>
                  <OBTTextField placeHolder='약속처방을 검색하세요' value={keyword} onChange={handleChange} width='100%'/>
                  <button className='material-icons'>search</button>
                </div>
                <div>
                  <OBTTreeView list={setList} width='100%' height='650px'
                              //  type={OBTTreeView.Type.folder} 
                              //  selectedItem='1000'
                               childCount={true}
                              //  editLabelText={true}
                               editLabelTextButtonsVisible={true}
                                onMouseEnter={()=>{}}
                               onAfterSelectChange={(e)=>setId(e.item)}
                               />
                </div>
              </div>
            </div>
            <div className='fr9'>              
              {id === '0'?
                <span>처방내용 비어있음</span>
              :
                <CLRM0300Form setId={setId}/>
              }              
            </div>
          </div>          
        </div>
      </div>
    </>
  )
}