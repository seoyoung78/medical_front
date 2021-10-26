import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/공통/Header';
import Gnb from './components/공통/Gnb';
import './init';
import Lnb from './components/공통/Lnb';
import { useRecoilState } from 'recoil';
import { naviState } from './atoms/Recoils_진료';
import CLRM0300 from './components/진료/CLRM0300_약속처방';
import CLRM0400 from './components/진료/CLRM0400_환경설정';
import ViewMain from './components/진료/ViewMain';

function App(props) {
  const [navi, setNavi] = useRecoilState<boolean>(naviState);
  // const [dialog, setDialog] = useRecoilState<boolean>(dialogState);

  return (
    <div className="his">
      <Gnb/>
      <Header/>

      <div className={navi ?  "container open-lnb" : "container"}>
        <Lnb/>

        <Switch>
          {/* 진료메인 */}
          <Route path={`/`} exact component={ViewMain}/>
          {/* 약속처방 */}
          <Route path={`/CLRM0300`} exact component={CLRM0300}/>
          {/* 환경설정 */}
          <Route path={`/CLRM0400`} exact component={CLRM0400}/>
          <Redirect to='/'/>
        </Switch> 

        <div className="dimmed" onClick={() => setNavi(false)}></div>
      </div>
    </div>
  );
}

export default App;