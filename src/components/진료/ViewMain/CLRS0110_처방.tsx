import { OBTButton, OBTComplete, OBTDialog, OBTListGrid } from "luna-orbit";
import { useState } from "react";
import { prsComplete, prsList } from "../../../data/CLRS0110Columns";
import { getPrsList } from "../../../utils/api/ApiService_진료";
import { initializeGrid } from "../../../utils/hooks/orbitListGrid";

export default function CLRS0110() {
  // 처방 상세
  const [prsKeyword, setPrsKeyword] = useState('');
  const prsOptions = {
    editable: true,
    appendable: true,
    columnMovable: true,
    rowMovable: true,
    checkable: true,
    rowMovableColumnWidth: 5
  };
  const [pList, setPList] = useState<any[]>([]);
  const [prsGrid, setsPrsGrid] = useState(() => initializeGrid(prsOptions, prsList, pList));

  // 버튼 상태
  const [dialog, setDialog] = useState({
    suga: false,
    kims: false,
    set: false,
    jx: false,
    memo: false,
    mix: false,
    dc: false
  });

  // 처방 검색
  const searchPList = async () => {
    let list = await getPrsList(prsKeyword);
    return list;
  }

  // 선택한 처방 리스트에 추가
  const clickPrs = (e) => {
    if(e.Source !== null) {
      let newList = pList.concat(e.Source);

      // 급여, 원외, 산정 값 지정
      for(var i = 0; i < newList.length; i++) {
        if(newList[i].insr === undefined) {
          newList[i].insr = '급여';
        }
        if(newList[i].hsin_hsot_dvcd === undefined) {
          newList[i].hsin_hsot_dvcd = '-';
        }
        if(newList[i].cmpt === undefined) {
          newList[i].cmpt = '산정';
        }
      }

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
          });
        }
      });
      setPrsKeyword('');
    }
    prsGrid.readData()
  }

  // 마우스 오버 시
  prsGrid.onMouseHover.set((e) : any => {
    if(e.isEllipse) {
      e.tooltipText = e.dataRow[e.columnName];
    }
  });

  // dropdown 값 변경 시
  prsGrid.onEditCommit.set((e) => {
    let newList = pList.concat();
    switch (e.columnName) {
      case 'mix' :
        if(e.newValue === 'Treu') {
          newList[e.rowIndex].mix = 'Y'
        } else {
          newList[e.rowIndex].mix = 'N'
        };
        break;
      case 'insr':
        newList[e.rowIndex].insr = e.newValue;
        break;
      case 'hsin_hsot_dvcd':
        newList[e.rowIndex].hsin_hsot_dvcd = e.newValue;
        break;
      case 'cmpt':
        newList[e.newValue].cmpt = e.newValue;
        break;
    }
    setPList(newList);
  });

  // list 내 버튼 클릭 시
  prsGrid.onImageButtonClicked.set((e) => {
    let newList;
    // 삭제버튼 클릭 시
    if(e.name === 'del') {
      newList = pList.filter(list => list.prsc_cd !== e.values.prsc_cd);
      setPList(newList);
    } 
    // 이동버튼 클릭 시
    else if (e.name === '이동버튼') {
      let oldrow = pList.filter(list => list.prsc_cd === e.values.prsc_cd)[0];
      newList.splice(e.rowIndex, 0, oldrow);
      setPList(newList);
    }
    prsGrid.setProvider({
      read: () => {
        return new Promise((resolve) => {
          resolve(newList);
        });
      },
      readPage: () => {
        return new Promise((resolve) => {
          resolve(newList);
        });
      }
    });
    prsGrid.readData();
  });

  // realgrid 사용
  // const prescriptionGrid = useGrid();
  // const patient = useRecoilValue(patientState);

  // const gridSetting = async ({ grid, view, provider } : GridInst) => {    
  //   let result = [];   
  //   if (patient.pid !== "") {
  //     result = await getAll(); 
  //   }
  //   // grid에 데이터 연결
  //   grid.bindData(result);
  //   // 순번 제거
  //   view.setRowIndicator({visible: false});
  //   // 풋터 제거
  //   view.setFooters({visible: false});
  //   // 상태바 제거
  //   view.setStateBar({visible: false});
  //   // 화면 가득 채우기
  //   view.setOptions({
  //     display: {
  //       fitStyle: GridFitStyle.EVEN_FILL,
  //       rowHeight: 20,
  //     },
  //   })
  // };

  // useEffect(() => {
  //   prescriptionGrid.handler(gridSetting);
  // }, [patient])

  return (
    <div className="box">
      <div className=""> 
        <img src="./imgs/order.png" alt=""></img>
        <span>처방</span>
        <OBTButton labelText='수가' onClick={()=>setDialog({...dialog, suga: true})}/>
          <OBTDialog title='수가' open={dialog.suga} width='300px' height='300px' buttons={[OBTDialog.Button.Close(() => setDialog({...dialog, suga:false}))]}></OBTDialog>
        <OBTButton labelText='KIMS' onClick={()=>setDialog({...dialog, kims: true})}/>
          <OBTDialog title='KIMS' open={dialog.kims} width='300px' height='300px' buttons={[OBTDialog.Button.Close(() => setDialog({...dialog, kims:false}))]}></OBTDialog>
        <OBTButton labelText='약속' onClick={()=>setDialog({...dialog, set: true})}/>
          <OBTDialog title='약속' open={dialog.set} width='300px' height='300px' buttons={OBTDialog.Buttons.SaveAndClose(()=>{},()=>setDialog({...dialog, set:false}))}></OBTDialog>
        <OBTButton labelText='JX999' onClick={()=>setDialog({...dialog, jx: true})}/>
          <OBTDialog title='줄단위 특정내역(JX999)' open={dialog.jx} width='300px' height='300px' buttons={OBTDialog.Buttons.SaveAndClose(()=>{},()=>setDialog({...dialog, jx:false}))}></OBTDialog>
        <OBTButton labelText='메모' onClick={()=>setDialog({...dialog, memo: true})}/>
          <OBTDialog title='메모' open={dialog.memo} width='300px' height='300px' buttons={OBTDialog.Buttons.SaveAndClose(()=>{},()=>setDialog({...dialog, memo:false}))}></OBTDialog>
        <OBTButton labelText='MIX' onClick={()=>setDialog({...dialog, mix: true})}/>
          <OBTDialog title='MIX' open={dialog.mix} width='300px' height='300px' buttons={OBTDialog.Buttons.SaveAndClose(()=>{},()=>setDialog({...dialog, mix:false}))}></OBTDialog>
        <OBTButton labelText='D/C' onClick={()=>setDialog({...dialog, dc: true})}/>
          <OBTDialog title='D/C 사유' open={dialog.dc} width='300px' height='300px' buttons={OBTDialog.Buttons.SaveAndClose(()=>{},()=>setDialog({...dialog, dc:false}))}></OBTDialog>
        <button>
          <img src="./imgs/setting.png" alt=""></img>
        </button>
      </div>
      <div style={{height: 200}}>
        <OBTListGrid interface={prsGrid} onChange={(e)=>{console.log(e)}}/>
        {/* <Grid ref={prescriptionGrid.gridRef} gridSetting={prescriptionList}/> */}
      </div>
      <div>
        <OBTComplete placeHolder='처방코드, 처방명으로 검색하세요'
                     value={prsKeyword} onChange={(e) => {setPrsKeyword(e.value); clickPrs(e)}}
                     onSearch={searchPList}
                     dataInfo={prsComplete}
                     width={'100%'}/>
      </div>
    </div>
  )
}