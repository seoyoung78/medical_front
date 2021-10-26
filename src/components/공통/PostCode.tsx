import { OBTDialog } from "luna-orbit";
import DaumPostcode from 'react-daum-postcode';

export default function PostCode(props) {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = ''; 
    
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }

    // console.log(data);
    // console.log(fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'

    props.setPostCode(data.zonecode, fullAddress);
    props.setState(false);
  };

  return (
    <OBTDialog title='우편번호 검색' open={props.state} width='400px' height='530px'
               buttons={[OBTDialog.Button.Close(()=>props.setState(false))]}>
      <DaumPostcode onComplete={handleComplete}/>
    </OBTDialog>
  )
}