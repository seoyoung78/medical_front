import { OBTAccordion, OBTAccordionGroup, OBTComplete, OBTDatePicker, OBTDialog } from "luna-orbit";
import { useState } from "react";
import { getSearchPatient } from "../../utils/api/ApiService_진료";

export default function CLRP0003(props) {

  // 조회기간 설정
  const [dateValue, setDateValue] = useState({
    from : '',
    to: ''
  });

  // 환자 검색
  const [keyword, setKeyword] = useState('');
  const [patient, setPatient] = useState({});

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
    let pList = await getSearchPatient(keyword);
    return pList;
  };

  const clickPatient = (e) => {
    if (e.target.data !== undefined) {
      setPatient(e.target.data);
    }
  }

  return (
    <OBTDialog title='처방조회' open={props.open} width='700px' height='600px'
               buttons={[OBTDialog.Button.Close(() => props.setOpen(false))]}>
        <div>
          조회기간
          <OBTDatePicker value={dateValue}
                         type={OBTDatePicker.Type.period}
                         onChange={(e) => setDateValue(e.value)}
                         inputStyle={{ width: '75px' }}/>
          <OBTComplete className=""
                    placeHolder="환자 조회"
                    value={keyword} onChange={(e) => {setKeyword(e.value); clickPatient(e)}}
                    onSearch={searchPatient} 
                    dataInfo={getDataInfo()}
                    width={"200px"}     
                    />
        </div>
        <div>
          {/* <OBTScrollbar width='100%' height='100%'> */}
            <OBTAccordionGroup>
              <OBTAccordion labelText='test1'>test1</OBTAccordion>
              <OBTAccordion labelText='test2'>test2</OBTAccordion>
              <OBTAccordion labelText='test3'>test3</OBTAccordion>
              <OBTAccordion labelText='test4'>test4</OBTAccordion>
            </OBTAccordionGroup>
          {/* </OBTScrollbar> */}
        </div>      
    </OBTDialog>

    // <div className="dialog_data" style={{width: 500, height: 500}}>
    //   <div className="dialog_data_tit">
    //     처방조회
    //   </div>
    //   <div>
    //     <OBTButton className="material-icons" labelText="close" onClick={() => setDialog(false)}/>
    //   </div>
    //   <div className="dialog_data_area">
    //     <div>
    //       <div>
    //         <div>조회기간</div>
    //         <div>
    //           <OBTDatePeriodPicker value={dateValue} onChange={(e) => setDateValue(e.value)} />
    //           <OBTDatePicker type={OBTDatePicker.Type.period} value={dateValue} onChange={(e)=> setDateValue(e.value)}/>
    //           {/* <LUXComplexPeriodDatePicker valueFrom={dateFrom} valueTo={dateTo} onChange={changeDate}/> */}
    //         </div>
    //         <div>
    //           <OBTComplete className=""
    //                         placeHolder="환자 조회"
    //                         value={keyword} onChange={(e) => {setKeyword(e.value); clickPatient(e)}}
    //                         onSearch={searchPatient} 
    //                         dataInfo={getDataInfo()}
    //                         width={"200px"}     
    //                         />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}