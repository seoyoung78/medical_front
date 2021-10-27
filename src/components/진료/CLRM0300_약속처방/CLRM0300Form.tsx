import { OBTButton, OBTComplete, OBTConfirm, OBTDropDownList2, OBTListGrid, OBTSnackbar, OBTTextField } from "luna-orbit";
import { useEffect, useState } from "react";
import { getAllSetClsf, getPrsList, SaveSetList, searchDList } from "../../../utils/api/ApiService_진료";
import { initializeGrid } from "../../../utils/hooks/orbitListGrid";
import { digComplete, digList, prsComplete, prsList } from "../../../data/CLRM0300Column";

export default function CLRM0300Form (props) {
  const { list, id, set, getSetList } = props;

  // 저장 Confirm 상태
  const [open, setOpen] = useState<boolean>(false);
  // snackbar 상태
  const [snack, setSnack] = useState<boolean>(false);

  // 약속처방 상태
  const [newSet, setNewSet] = useState<any>({});
  // 약속처방 분류
  const [clsfList, setClsfList] = useState<any[]>([{}]);

  // 진단 상세
  const [digKeyword, setDigKeyword] = useState('');
  const digOptions = {
    editable: true,
    appendable: true,
    columnMovable: true,
    rowMovable: true,
    rowMovableColumnWidth: 3
  };
  const [dList, setDLsit] = useState([]);
  const [digGrid, setDigGrid] = useState(() => initializeGrid(digOptions, digList, dList));

  // 처방 상세
  const [prsKeyword, setPrsKeyword] = useState('');
  const prsOptions = {
    editable: true,
    appendable: true,
    columnMovable: true,
    rowMovable: true,
    rowMovableColumnWidth: 3
  };
  const [pList, setPList] = useState([]);
  const [prsGrid, setPrsGrid] = useState(() => initializeGrid(prsOptions, prsList, pList));

  // 처방 초기화

  // 진단 검색
  const searchDigList = async () => {
    let list = await searchDList(digKeyword);
    return list
  }

  // 선택한 진단 리스트에 추가
  const clickDig = (e) => {
    if(e.target.data !== undefined) {
      let newList = dList.concat(e.target.data);
      setDLsit(newList);
      digGrid.setProvider({
        read:() => {
          return new Promise((resolve) => {
            resolve(newList);
          });
        },
        readPage:() => {
          return new Promise((resolve) => {
            resolve(newList);
          })
        }
      })
      setDigKeyword('');
    }
    digGrid.readData();
  }

  // 처방 검색
  const searchPList = async () => {
    let list = await getPrsList(prsKeyword);
    return list;
  }

  // 선택한 처방 리스트에 추가
  const clickPrs = (e) => {
    if(e.target.data !== undefined) {
      let newList = pList.concat(e.target.data);
      setPList(newList);
      prsGrid.setProvider({
        read: () => {
          return new Promise((resolve) => {
            resolve(newList);
          });
        },
        readPage: () => {
          return new Promise((resolve) => {
            resolve(newList);
          })
        }
      })
      setPrsKeyword('');
    }
    prsGrid.readData();
  };

  // 취소버튼 클릭 시 발생 이벤트
  const handleCancle = () => {
    // 분류, 명칭 초기화
    if(id === '0') {
      setNewSet({
        set_clsf : '약속처방',
        set_clsf_cd : '1'
      });
    } else {
      setNewSet(set);
    }
    // listGrid 초기화
    setDLsit([]);
    setPList([]);
    digGrid.setProvider({
      read: () => {
        return new Promise((resolve)=> {
          resolve([]);
        });
      },
      readPage: () => {
        return new Promise((resolve) => {
          resolve([]);
        })
      }
    });
    digGrid.readData();
    prsGrid.setProvider({
      read: () => {
        return new Promise((resolve)=> {
          resolve([]);
        });
      },
      readPage: () => {
        return new Promise((resolve) => {
          resolve([]);
        })
      }
    });
    prsGrid.readData();
  }
  // 저장 버튼 클릭 시 발생 이벤트
  const handleSave = () => {
    setOpen(true);

    if(id === '0') {
      getSetList();
    };
  }
  // 확인 버튼 클릭 시 발생 이벤트
  const handleConfirm = async () => {
    console.log('진단 리스트: ', dList);
    console.log('처방 리스트: ', pList);
    setSnack(true);
    setOpen(false);

    await SaveSetList(newSet, dList, pList);
    // handleCancle();
  };

  useEffect(() => {
    let clsf : any = [];
    list.map((list) => {
      clsf.push({value: list.set_cd, text: list.set_nm})
    });
    setClsfList(clsf);

    if(id === '0') {
      setNewSet({
        set_clsf : '약속처방',
        set_clsf_cd : '1'
      });
    } else {
      setNewSet(set);
    }
  }, [id])

  return(
    <div>
      <div>약속처방관리</div>
      <div className='col fr12'>
        <div className='fr6'>
          <div>약속처방 분류</div>
          <OBTDropDownList2 value={newSet.set_clsf_cd} list={clsfList}  width='90%'
                            displayType={OBTDropDownList2.DisplayType.text}
                            onChange={(e) => setNewSet({...newSet, set_clsf_cd : e.value, set_clsf : e.Source[0].text})} 
          />
        </div>
        <div className='fr6'>
          <div>약속 명칭</div>
          <OBTTextField value={newSet.set_nm} placeHolder='약속처방 명칭을 입력하세요' width='90%' onChange={(e) => setNewSet({...newSet, set_nm: e.value})} />
        </div>
      </div>
      <div>
        약속처방
        <div>
          진단
          <div style={{height:200}}>
            <OBTListGrid interface={digGrid} onChange={()=>{}} />
          </div>
          <div>
            <OBTComplete placeHolder='진단코드, 진단명으로 검색하세요.'
                         value={digKeyword} onChange={(e)=>{setDigKeyword(e.value); clickDig(e)}}
                         onSearch={searchDigList}
                         dataInfo={digComplete}
                         width={'100%'}/>
          </div>
        </div>
        <div>
          처방
          <div style={{height:200}}>
            <OBTListGrid interface={prsGrid} onChange={()=>{}} />
          </div>
          <div>
            <OBTComplete placeHolder='처방코드, 처방명으로 검색하세요.'
                         value={prsKeyword} onChange={(e)=>{setPrsKeyword(e.value); clickPrs(e)}}
                         onSearch={searchPList}
                         dataInfo={prsComplete}
                         width={'100%'}/>                         
          </div>
        </div>
      </div>
      <div>
        <div></div>
        <OBTButton labelText='취소' onClick={handleCancle}/>
        <OBTButton labelText='저장' theme={OBTButton.Theme.blue} onClick={handleSave}/>
        {open? 
        <OBTConfirm title='약속처방 저장' labelText='약속처방을 저장하시겠습니까?' type={OBTConfirm.Type.success} onCancel={()=>setOpen(false)} onConfirm={handleConfirm} />
        :''}
        <OBTSnackbar labelText='저장되었습니다.' type={OBTSnackbar.Type.success} open={snack} onChange={()=>setSnack(false)}/>
      </div>
    </div>
  )
}