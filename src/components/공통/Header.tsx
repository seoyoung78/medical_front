export default function Header() {
  //이미지 경로는 url 에 매핑됨. 현재 주소/imgs/~
  return (
    <div>
      <header>
        <div className="left">
          <img src="./imgs/header.png" alt="" />
        </div>
        <div className="right">
          <img src="./imgs/header_02.png" alt="" />
        </div>
      </header>
      
    </div>
  );
}