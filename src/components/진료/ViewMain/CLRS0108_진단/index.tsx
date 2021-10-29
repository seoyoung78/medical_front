import '../../../../init';
import { useEffect, useState } from "react";
import { getDList, saveDList, saveDSetting, searchDList } from '../../../../utils/api/ApiService_진료';
import { useRecoilValue } from 'recoil';
import { patientState, rcpnState } from '../../../../atoms/Recoils_진료';
import { OBTComplete, OBTConfirm, OBTListGrid, OBTSnackbar } from 'luna-orbit';
import { clrs0108Columns, clrs0108Grid } from '../../../../data/CLRS0108Column';
import { initializeGrid } from '../../../../utils/hooks/orbitListGrid';
import CLRS0108Settings from './CLRS0108Settings';

export default function CLRS0108(props) {
  // 환자 상태
  const patient = useRecoilValue(patientState);
  // 접수 상태
  const rcpn = useRecoilValue(rcpnState);

  // 진단 검색
  const [keyword, setKeyword] = useState('');
  const options = {
    editable: true,
    appendable: true,
    useServerSort: false,
    columnMovable: true,
    rowMovable: true,
    rowMovableColumnWidth: 7
  }
  // 진단 ListGrid
  const [list, setList] = useState<any[]>([]);
  const [grid, setGrid] = useState(() => initializeGrid(options, clrs0108Grid, list))
  // 삭제 확인 Dialog
  const [delDialog, setDelDialog] = useState<boolean>(false);
  // 삭제 Snackbar
  const [delSnack, setDelSnack] = useState<boolean>(false);
  // rowIndex 기억
  const [row, setRow] = useState({
    index: -1,
    value: ''
  });

  // 진단 환경설정
  // Dialog 오픈 상태
  const [openset, setOpenset] = useState<boolean>(false);
  // 설정 저장 시 컬럼 visible 설정
  const handleSetting = async (list) => {
    list.map((list, index) =>  grid.setColumnVisible(list.name, list.state));
    await saveDSetting(list);
  };

  // 검색한 키워드에 맞는 진단 목록 불러오기
  const searchList = async() => {
    let list = await searchDList(keyword);
    return list;
  };

  // 선택한 진단 리스트에 추가
  const clickList = (e) => {
    if(e.Source !== null) {
      let newList = list.concat(e.Source);

      // 형태, 부위 값 지정
      if (newList.length === 1) {
        newList[0].dvsn = '주상병';
        newList[0].site = '-';
      } else {
        for(var i = 0; i < newList.length; i++) {
          if((newList[i].dvsn === '' || newList[i].dvsn === undefined) && newList[i].dvsn !== '주상병') {
            newList[i].dvsn = '부상병';
          }
          if(newList[i].site === '' || newList[i].site === undefined) {
            newList[i].site = '-';
          }
        }
      }
      setList(newList);
      // console.log(newList);

      grid.setProvider({
        read: () => {
          return new Promise((resolve) => {
            resolve(newList);
          });
        },
        readPage: (e) => {
          return new Promise((resolve) => {
            resolve(newList)
          })
        }
      });
      setKeyword('')
    }
    grid.readData();  
  }
  
  // 마우스 오버 시
  grid.onMouseHover.set((e) : any => {
    if(e.isEllipse) {
      e.tooltipText = e.dataRow[e.columnName];
    }
  });

  // list dropdown 값 변경 시
  grid.onEditCommit.set((e)=>{
    // console.log(e);
    let newList = list.concat();
    switch (e.columnName) {
      case 'dgns_hnm':
        newList[e.rowIndex].dgns_hnm = e.newValue;
        break;
      case 'dvsn':
        newList[e.rowIndex].dvsn = e.newValue;
        break;
      case 'rlot':
        if(e.newValue === 'True') {
          newList[e.rowIndex].rlot = 'Y'
        } else if(e.newValue === 'False') {
          newList[e.rowIndex].rlot = 'N'
        };
        break;        
      case 'site':
        newList[e.rowIndex].site = e.newValue;
        break;
    };
    setList(newList);
    // console.log(newList);
  });

  // row 이동 시
  // grid.onAfterSelectChange.set((e) => {
  //   // console.log("change: ", e);
  //   if(e.isRowChanged) {
  //     let oldList = list;
  //     console.log(list);
  //   }
  // });

  // list 버튼 클릭 시
  grid.onImageButtonClicked.set((e)=> {
    // 삭제 버튼 클릭 시
    if(e.name === 'del') {
      setRow({
        index: e.rowIndex,
        value: e.values.dgns_cd
      });
      setDelDialog(true);
    }
    // 이동 버튼 클릭 시
    else if(e.name === '이동버튼') {
      let newList = list.filter(list => list.dgns_cd !== e.values.dgns_cd);
      let oldrow = list.filter(list => list.dgns_cd === e.values.dgns_cd)[0];
      // console.log(oldrow);
      newList.splice(e.rowIndex, 0, oldrow);
      
      for(let i = 0; i < newList.length; i++) {
        if(i === 0 && newList[i].dvsn !== '주상병') {
          newList[0].dvsn = '주상병';
        } else if(i !== 0 && newList[i].dvsn === '주상병') {
          newList[i].dvsn = '부상병';
        }
      };
      setList(newList);

      grid.setProvider({
        read:() => {
          return new Promise((resolve) => {
            resolve(newList);
          })
        },
        readPage: () => {
          return new Promise((resolve) => {
            resolve(newList);
          })
        }
      });
      grid.readData();
    }
  });

  // 삭제 Confirm 확인 버튼 클릭 시
  const handleConfirm = (e) => {
    setDelSnack(true);
    setDelDialog(false);
    let newList = list.filter(list => list.dgns_cd !== row.value);
    if (row.index === 0 && newList.length > 0) {
      newList[0].dvsn = '주상병';
    }
    setList(newList);
    grid.setProvider({
      read: () => {
        return new Promise((resolve)=>{
          resolve(newList);
        });
      },
      readPage: () => {
        return new Promise((resolve) => {
          resolve(newList);
        });
      }
    });
    grid.readData();
    setRow({
      index: -1,
      value: ''
    });
  };

  // 진단 저장
  const saveDigList = async () => {
    await saveDList(patient.pid, rcpn, list);
    setList([]);
    grid.setProvider({
      read: () => {
        return new Promise((resolve) => {
          resolve([]);
        });
      },
      readPage: () => {
        return new Promise((resolve) => {
          resolve([]);
        });
      }
    });
  };

  useEffect(() => {

  }, [patient])

  useEffect(() => {
    if(props.save) {
      saveDigList();
    };
  }, [props.save])
  
  return (
    <div className="box">
      <div>
          <img src="./imgs/lab.png" alt=""></img>
          <span>진단</span>
          <button onClick={() => setOpenset(true)}>
            <img src="./imgs/setting.png" alt=""></img>
          </button>
          <CLRS0108Settings open={openset} setOpen={setOpenset} grid={grid} setVisible={grid.setColumnVisible} handleSetting={handleSetting}/>
        <div style={{height: 200}}>
          <OBTListGrid interface={grid}  onChange={()=>{}}/>
          {delDialog? 
          <OBTConfirm type={OBTConfirm.Type.success} title='진단 삭제' labelText='선택한 진단을 삭제하시겠습니까?' onCancel={()=>setDelDialog(false)} onConfirm={handleConfirm}/>
          :<></>}
          <OBTSnackbar labelText='삭제되었습니다.' type={OBTSnackbar.Type.success} open={delSnack} onChange={()=>setDelSnack(false)}/>
          <OBTComplete placeHolder="진단코드, 진단명으로 검색하세요."
                       value={keyword} onChange={(e) => {setKeyword(e.value); clickList(e)}}
                       onSearch={searchList}
                       dataInfo={clrs0108Columns}
                       width={'100%'}/>
        </div>
      </div>
    </div>
  )
}