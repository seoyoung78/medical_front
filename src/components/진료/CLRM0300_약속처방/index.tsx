import { OBTButton, OBTTextField, OBTTreeView } from "luna-orbit";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { naviState } from "../../../atoms/Recoils_진료";
import { getSetLists } from "../../../utils/api/ApiService_진료";
import CommonLine from "../../공통/CommonLine";
import SubHeader from "../../공통/SubHeader";
import CLRM0300Form from "./CLRM0300Form";
import search from "../../../images/search.svg"

export default function CLRM0300() {
  // Lnb 상태 설정
  const setNavi = useSetRecoilState<boolean>(naviState);

  // 약속처방 상태
  const [listState, setListState] = useState(0);
  const [idState, setIdState] = useState('');
  // 약속처방 목록
  const [list, setList] = useState<any[]>([]);
  // 선택한 약속처방
  const [selectSet, setSelectSet] = useState({});
  // 약속처방 검색 상태
  const [keyword, setKeyword] = useState('');
  // 약속처방 검색 목록
  const [searchList, setSearchList] : any[] = useState({});
  
  // 약속처방 목록 불러오기
  const getSetList = async () => {
    let list = await getSetLists('doctor1', '');
    setList(list);
  }

  // treeView로 변환
  const onMapItem = (e) => {
    let list = e.list;
    e.item = {
      key: list.set_cd,
      parentKey: list.set_clsf_cd,
      labelText: list.set_nm
    }
  };

  // 약속처방 검색
  const handleChange = (e) => {
    // console.log(e);
    setKeyword(e.value);
  };
  const handleSearch = async () => {
    setListState(1);
    let list = await getSetLists('doctor1', keyword);
    console.log(list);
    setSearchList(list);
  };

  // 항목 선택 시
  const handleSelect = (e) => {
    if(e.item.set_cd !== '1') {
      setListState(0);
      setIdState(e.item.set_cd);
      let item = list.filter(list => list.set_cd === e.item.set_cd);
      setSelectSet(item[0]);
    }
  };

  useEffect(() => {
    setNavi(false);
    getSetList();
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
                <OBTButton labelText='새 약속처방 추가' theme={OBTButton.Theme.blue} onClick={()=>setIdState('0')}/>
              </div>
              <span>약속처방 목록</span>
              <div className="border">
                <div className="col">
                  <OBTTextField placeHolder='약속처방을 검색하세요' value={keyword} onChange={handleChange} width='100%'
                                // type={OBTTextField.Type.codePicker} 
                                codePickerIcon={search} onCodePickerClick={handleSearch}
                                />
                  <button className='material-icons' onClick={handleSearch}>search</button>
                </div>
                <div>
                  {listState === 0 ?
                    // 약속처방 조회 화면
                    <OBTTreeView list={list} width='100%' height='650px'
                                 onMapItem={onMapItem}
                                 type={OBTTreeView.Type.folder} 
                                 childCount={true}
                                 selectedItem={idState}
                                 onAfterSelectChange={handleSelect}
                                //  editLabelText={true}
                                //  editLabelTextButtonsVisible={true}
                                // onMouseEnter={(e)=>{}}
                                />
                  :
                    // 약속처방 검색 화면
                    <div>
                      <OBTButton labelText='돌아가기' onClick={()=>{setListState(0); setKeyword('')}}/>
                      {/* {searchList.map((list, index) => {
                        return (
                          <div key={list.set_cd} onClick={()=>setIdState(list.set_cd)}>{list.set_nm}</div>
                        )
                      })} */}
                    </div>
                  }
                </div>
              </div>
            </div>
            <div className='fr9'>              
              {idState === '' ?
                <span>처방내용 비어있음</span>
              :
                <CLRM0300Form id={idState} setId={setIdState} list={list} set={selectSet} getSetList={getSetList}/>
              }              
            </div>
          </div>          
        </div>
      </div>
    </>
  )
}