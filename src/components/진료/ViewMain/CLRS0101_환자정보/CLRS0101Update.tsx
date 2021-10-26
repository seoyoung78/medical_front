import { OBTButton, OBTCheckBox, OBTDatePicker, OBTDialog, OBTDropDownList2, OBTSnackbar, OBTTextField } from "luna-orbit";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { patientState, rcpnState } from "../../../../atoms/Recoils_진료";
import { getCommonList, updatePatient } from "../../../../utils/api/ApiService_진료";
import PostCode from "../../../공통/PostCode";

const list1 = [
  {value: '선택하세요.', text: '선택하세요.'},
  {value: '진료', text: '진료'},
  {value: '상담(광고)', text: '상담(광고)'},
  {value: '진료기록부 발급', text: '진료기록부 발급'},
  {value: '직접입력', text: '직접입력'},
]
const list2 = [
  {value: '선택하세요.', text:'선택하세요.'},
  {value: '온라인', text:'온라인'},
  {value: '간판(광고)', text:'간판(광고)'},
  {value: '판촉', text:'판촉'},
  {value: '지인소개', text:'지인소개'},
  {value: '직접입력', text:'직접입력'},
]

export default function CLRS0101Update(props) {
  // 환자 상태 불러오기
  const [patient, setPatient] = useRecoilState(patientState);
  // 환자 접수정보 상태
  const [rcpn, setRcpn] = useRecoilState(rcpnState);
  // 수정된 환자 정보 & 접수정보 상태
  const [changeP, setChangeP] = useState<any>({});
  const [changeR, setChangeR] = useState<any>({});
  // 주소검색                                          
  const [post, setPost] = useState<boolean>(false);
  // 스낵바 상태
  const [openSnack, setOpenSnack] = useState<boolean>(false);

  // 외래경로, 내원목적 상태 - 추후 테이블 칼럼으로 수정(아직 DB 컬럼 존재x)
  const [state, setState] = useState({
    list1: '선택하세요.',
    list2: '선택하세요.',
    clist1: '1',
    content1: '',
    content2: ''
  });
  // 산정특례, 만성질환 관리제 상태 - DB에서 가져온 것으로 변경 필요
  const [value, setValue] = useState({
    cfsc : false,
    cfsc_period: {
      from: new Date(),
      to: ''
    },
    chrn_dsse : false,
    chrn_period: {
      from: '',
      to: ''
    }
  });

  // VIP 환자 유무
  const handleVIP = (e) => {
    if(e.value) {
      setChangeP({
        ...changeP,
        vip_pt_yn : 'Y'
      })      
    } else {
      setChangeP({
        ...changeP,
        vip_pt_yn : 'N'
      })
    }
  };

  // 사생활 환자 유무
  const handlePrivate = (e) => {
    if(e.value === true) {
      setChangeP({
        ...changeP,
        priv_pt_yn: 'Y'
      })
    } else {
      setChangeP({
        ...changeP,
        priv_pt_yn: 'N'
      })
    }
  };

  // 상세주소 변경
  const handleDetailAddress = (e) => {
    setChangeP({
      ...changeP,
      detl_addr: e.value
    })
  };

  // 저장버튼 클린 시 발생 이벤트
  const handleSave = async() => {
    await updatePatient(changeP, changeR);
    setPatient(changeP);
    setRcpn(changeR);
    props.setOpen(false);
    setOpenSnack(true);
  };

  // 접수구분 목록
  const getClist1 = async() => {
    let list =  await getCommonList('CLB101');
    let newList : any = []
    list.map((list) => {
      return newList.push({value: list.cmcd_id, text: list.cmcd_nm});
    });
    // console.log(newList);
    // return 되면서 Promise로 변환 -> 별도 변수에 저장되어야 할 듯
    return newList;
  };

  useEffect(() => {
    if(patient.pid !== '') {
      setChangeP(patient);
    };    
  }, [patient.pid]);

  useEffect(() => {
    if(patient.pid !== '') {
      setChangeR(rcpn);
    };   
  }, [rcpn])

  return (
    <>
      <OBTDialog title='접수정보 수정' open={props.open} width='700px' height='600px'
                buttons={OBTDialog.Buttons.SaveAndClose(handleSave, () => {props.setOpen(false); setChangeP(patient); setChangeR(rcpn);})}>
        <div className='his'>
          환자정보<hr/>
          <div className='section-wrap'>
            <div className='section'>
              <div>등록번호 {patient.pid}</div>
              <div>환자성명 {patient.pt_nm}</div>
              <div>성별 {patient.sex_cd}</div>
              <div>나이 {patient.age}</div>
              <div>VIP
                <OBTCheckBox value={changeP.vip_pt_yn === 'Y' ? true : false} onChange={handleVIP}/>
              </div>
              <div>사생활 보호
                <OBTCheckBox value={changeP.priv_pt_yn === 'Y' ? true : false} onChange={handlePrivate} />
              </div>
            </div>
            <div className='section'>
              <div>주민등록번호 {patient.pt_frrn}-{patient.pt_srrn}</div>
              <div>전화번호
                <OBTTextField value={changeP.cntc_tel} onChange={(e)=>setChangeP({...changeP, cntc_tel: e.value})} width='120px'/>
              </div>
              <div>핸드폰번호
                <OBTTextField value={changeP.clph_no} onChange={(e)=>setChangeP({...changeP, clph_no: e.value})} width='120px'/>
              </div>
            </div>
            <div className='section'>
              <div>우편번호
                <OBTTextField value={changeP.pstl_no} onChange={()=>{}} readonly width='25%'/>
                <OBTButton labelText='주소 검색' onClick={()=>setPost(true)}/>
                <PostCode state={post} setState={setPost} setPostCode={(data1, data2)=>setChangeP({...changeP, pstl_no: data1, basc_addr: data2})}/>
              </div>
            </div>            
            <div className='section'>
              <div style={{width: '100%'}}>주소
                <OBTTextField value={changeP.basc_addr} onChange={()=>{}} readonly width='60%'/>
                <OBTTextField value={changeP.detl_addr} placeHolder='상세주소를 입력해주세요.' onChange={handleDetailAddress} width='30%'/>
              </div>
            </div>
            <div className='section'>
              <div className='section' style={{width: '35%'}}>외래경로
                {
                  state.list1 === '직접입력' ? 
                  <OBTTextField value={state.content1} placeHolder='직접입력해주세요.' width='60%' onChange={(e)=>setState({...state, content1:e.value})}/>
                  :                  
                  <OBTDropDownList2 displayType={OBTDropDownList2.DisplayType.text}
                                    list={list1} value={state.list1} width='60%'
                                    onChange={(e)=>setState({...state, list1:e.value})} />
                }
              </div>
              <div className='section' style={{width: '35%'}}>내원목적
                {
                  state.list2 === '직접입력'?
                  <OBTTextField value={state.content2} placeHolder='직접입력해주세요.' width='60%' onChange={(e)=>setState({...state, content2:e.value})} />
                  :
                  <OBTDropDownList2 displayType={OBTDropDownList2.DisplayType.text}
                                  list={list2} value={state.list2} width='60%'
                                  onChange={(e)=>setState({...state, list2:e.value})}/>
                }                
              </div>
            </div>
          </div>
        </div>

        <div className='his'>
          접수정보<hr/>
          <div className='section-wrap'>
            <div className='section'>
              <div>보험 구분
                {changeR.insn_tycd}
              </div>
              <div>접수 구분
                {/* <OBTDropDownList2 displayType={OBTDropDownList2.DisplayType.text}
                                  list={getClist1} value={state.clist1}
                                  onChange={(e)=>setState({...state, clist1: e.value})}/> */}
              </div>
              <div>진료과
                {changeR.mddp_cd}
              </div>
            </div>
            <div className='section'>
              <div>진료 일자 
                <OBTDatePicker value={changeR.mdcr_date} format={OBTDatePicker.Format.YYYYMMDD} onChange={(e)=>setChangeR({...changeP, mdcr_date: e.value})} inputStyle={{ width: '75px' }}/>
              </div>
              <div>진료 시간 {rcpn.mdcr_hm}</div>
              <div>진료의 {rcpn.mdcr_dr_id}</div>
            </div>
            <div className='section'>
              <div>산정특레
                <OBTCheckBox value={value.cfsc} onChange={(e)=>setValue({...value, cfsc: e.value})}/>
              </div>
              <div>적용기간
                <OBTDatePicker value={value.cfsc_period}
                               format={OBTDatePicker.Format.YYYYMMDD} 
                               type={OBTDatePicker.Type.period}
                               disabled={!value.cfsc} required
                               onChange={(e)=>setValue({...value, cfsc_period: e.value})}
                               inputStyle={{ width: '75px' }}/>
              </div>
            </div>
            <div className='section'>
              <div>의원급 만성질환 관리제
                <OBTCheckBox value={value.chrn_dsse} onChange={(e)=>setValue({...value, chrn_dsse: e.value})} />
              </div>
              <div>적용기간
                <OBTDatePicker value={value.chrn_period}
                               format={OBTDatePicker.Format.YYYYMMDD}
                               type={OBTDatePicker.Type.period}
                               disabled={!value.chrn_dsse} required
                               onChange={(e)=>setValue({...value, chrn_period: e.value})} 
                               inputStyle={{ width: '75px' }}/> 
              </div>
            </div>
          </div>
        </div>        
      </OBTDialog>
      <OBTSnackbar labelText='환자 접수정보가 수정되었습니다.' type={OBTSnackbar.Type.success} open={openSnack} onChange={() => setOpenSnack(false)}/>
    </>
  )
}