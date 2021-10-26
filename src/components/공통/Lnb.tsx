import { useState } from "react";
import { Link } from "react-router-dom";

export default function Lnb() {
  const [open, setOpen] = useState<Boolean>(false);

  return (
    <div className="lnb">
      <div className="menu-block">
        <button type="button" className="menu-btn" onClick={() => setOpen(!open)}>진료</button>
        <div className={open? "menu-block on" : "menu-list"}>
          <li className="menu-link"><Link to="/">진료메인</Link></li>
          <li className="menu-link">상용구</li>
          <li className="menu-link"><Link to='/CLRM0300'>약속처방</Link></li>
          <li className="menu-link"><Link to='/CLRM0400'>환경설정</Link></li>
        </div>
      </div>
    </div>
  )
}