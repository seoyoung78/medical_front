import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil"
import { patientState } from "../../atoms/Recoils_진료"

export default function Memo(props)  {
  const { memo, placeHolder, save } = props
  const patient = useRecoilValue(patientState);
  const [content, setContent] = useState('');
  
  const handleSave = () => {
    save(content);
  };

  useEffect(() => {
    if(patient.pid !== '') {
      setContent(memo);
      // console.log(memo);
    };
  }, [patient]);

  return(
    <>
      <textarea value={patient.pid === '' ? '' : content} placeholder={placeHolder} disabled={patient.pid === '' ? true : false} 
                onChange={(e) => setContent(e.target.value)}
                onBlur={handleSave}
                style={{width: '100%', height: '100px', padding: '10'}} />
    </>
  )
};