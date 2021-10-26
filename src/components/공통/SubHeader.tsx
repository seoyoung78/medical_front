import { useRecoilState } from "recoil";
import { naviState } from "../../atoms/Recoils_진료";

function SubHeader(props) {
  const [navi, setNavi] = useRecoilState<boolean>(naviState);

  return (
    <div className="sub-header">
      <div className="left">
        <button type="button" className="btn-menu" onClick={() => setNavi(!navi)}>
          <span className="material-icons">menu</span>
          <span className="blind">메뉴</span>
        </button>
        <a href="./index.html" className="svg-title">
          <h2>{props.title}</h2>
        </a>
      </div>
      <div className="right">

      </div>
    </div>
  )
}

export default SubHeader;