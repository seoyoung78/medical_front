import { OBTDialog, OBTListGrid } from "luna-orbit";
import { useEffect, useState } from "react";
import { clrs0108Setting } from "../../../../data/CLRS0108Column";
import { initializeGrid } from "../../../../utils/hooks/orbitListGrid";

const list = [
  {header: '진단코드', name: 'dgns_cd'},
  {header: '진단명', name: 'dgns_hnm'}, 
  {header: '형태', name: 'dvsn'}, 
  {header: 'R/O', name: 'rlot'}, 
  {header: '부위', name: 'site'}, 
  {header: '특정기호', name: 'group'}, // 삭제 버튼까지 사라짐
  // {header: '특정기호', name: 'spcf_rgno'}  // 특정기호 셀은 보이지 않으나 헤더는 있음
];

export default function CLRS0108Settings (props) {
  // 설정 
  const [checkList, setCheckList] = useState([]);
  // 바뀐 설정
  const [changeCheck, setChangeCheck] = useState([]);
  const [allCheck, setAllCheck] = useState<boolean>(false);

  // 환경설정 list
  const options = {
    editable: true,
    appendable: true,
    checkable: true
  };
  const [grid, setGrid] = useState(() => initializeGrid(options, clrs0108Setting, list));

  // 그리드 초기 설정
  grid.onAfterRead.set((e)=>{
    if(allCheck) {
      grid.checkAll();
    } else {
      checkList.map((list, index) => {
        if(list === true) {
          grid.setCheck(index, true);
        }
      });
    };
  });

  // 개별 체크 선택 시
  grid.onAfterCheck.set((e) => {
    let newList : any = changeCheck.concat();
    if(e.rowIndex !== undefined) {
      newList[e.rowIndex] = e.checked
    }
    setChangeCheck(newList);
  });

  // 헤더 체크 선택 시
  grid.onAfterHeaderCheck.set((e) => {
    let newList : any = [];
    for (var i = 0; i < checkList.length; i++) {
      newList.push(e.checked);
    };
    setChangeCheck(newList);
  });

  // 저장 버튼 클릭 시
  const handleSave = (e) => {
    let settingList : any = [];
    setCheckList(changeCheck);
    for(var i = 0; i < changeCheck.length; i++) {
      if(changeCheck[i]) {
        settingList.push({name: list[i].name, state: changeCheck[i], type: 'Y'});
      } else {
        settingList.push({name: list[i].name, state: changeCheck[i], type: 'N'});
      }
    };
    props.handleSetting(settingList);
    props.setOpen(false);
  };

  useEffect(() => {
    let check = true;
    let checkList : any = [];

    if(props.open) {
      grid.readData();
      // console.log(props.grid.columns);      
      props.grid.columns.map((list, index) => {
        if(index !== 0) {
          checkList.push(list.visible);
          if(list.visible !== true) {
            check = false;
          };
        };
      });
      setAllCheck(check);
      setCheckList(checkList);
      setChangeCheck(checkList);
    };
  }, [props.open]);
  
  return (    
    <OBTDialog title='설정' open={props.open} width='193px' height='356px'
               buttons={OBTDialog.Buttons.SaveAndClose(handleSave, () => {props.setOpen(false); setChangeCheck(checkList)})}
               >
      {/* <div>
        <OBTCheckBox value={allCheck} labelText="전체" onChange={changeSetting}/>
        {clrsList.map((list, index) => 
          <div key={index}>
            <OBTCheckBox value={list.visible} labelText={list.header} onChange={changeSetting}/>
          </div>
        )}
      </div> */}
      <OBTListGrid interface={grid} onChange={()=>{}}/>
    </OBTDialog>
  )
}