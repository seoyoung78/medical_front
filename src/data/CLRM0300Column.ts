import deleteImg from "../images/delete.png";

// 진단 OBTComplete 컬럼
export const digComplete = {
  columnWidths: ['10%', '40%', '45%'],
  itemInfo: [
    {
      key: "dgns_cd",
      column: 0,
      isKeyValue: true
    },
    {
      key: "dgns_hnm",
      column: 1
    },
    {
      key: "dgns_enm",
      column: 2
    }
  ]
}

// 진단 OBTListGrid 컬럼
export const digList = [
  {name: 'dgns_cd', header: '진단코드', type: 'text', width: 10, visible: true, sortable: false},
  {name: 'group', header: '진단명', type: 'group', width: 90, hideChildHeaders: true, visible: true, sortable: false, editable: true, 
    columns: [
      {
        name: 'dgns_hnm', type: 'text', width: 800, editable: true
      },
      {
        name: 'img', type: 'button', buttonBisibility: "mouseOver",
        imageButtons: {
          images: [{
            name: 'del', up: deleteImg, hover: deleteImg, down: deleteImg, cusor: 'pointer'
          }]
        }
      }
    ]
  }
]

// 처방 OBTComplete 컬럼
export const prsComplete = {
  columnWidths: ['20%', '80%'],
  itemInfo: [
    {
      key: "prsc_cd",
      column: 0,
      isKeyValue: true
    },
    {
      key: "prsc_nm",
      column: 1
    },
    // 영문컬럼 추가 되면 넣기
    // {
    //   key: "",
    //   column: 2
    // }
  ]
}

// 처방 OBTListGrid 컬럼
export const prsList = [
  {name: 'mix', header: 'MIX', type: 'text', width: 10, visible: true, sortable: false, editable: true},
  {name: 'prsc_cd', header: '처방코드', type: 'text', width: 20, visible: true, sortable: false},
  {name: 'prsc_nm', header: '처방명', type: 'text', width: 80, visible: true, sortable: false, useTooltip: true,
  style: {
    textWrap: "ellipse" // 말줄임 사용
  }},
  {name: 'ontm_vol', header: '1회량', type: 'text', width: 20, visible: true, sortable: false, editable: true},
  {name: 'notm', header: '횟수', type: 'text', width: 20, visible: true, sortable: false, editable: true},
  {name: 'nody', header: '일수', type: 'text', width: 20, visible: true, sortable: false, editable: true},
  {name: '2', header: '용법', type: 'text', width: 20, visible: true, sortable: false, editable: true},
  {name: '3', header: '급여', type: 'dropDown', width: 20, visible: true, sortable: false, editable: true,
    dropDownDataItems: [
      {text: '급여'},
      {text: '비급여'},
      {text: '100/100'},
      {text: '100/50'},
      {text: '100/80'},
      {text: '100/30'},
      {text: '100/90'},
    ], 
    dropDownCodeProperty: 'text', //dropDownDataItems에서 사용할 코드 값의 프로퍼티
    dropDownTextProperty: 'text', //dropDownDataItems에서 사용할 텍스트 값의 프로퍼티
    buttonVisibility: 'always',
    showButtonOnlyEditable: true
  },
  {name: 'hsin_hsot_dvcd', header: '원외', type: 'dropDown', width: 20, visible: true, sortable: false, editable: true,
    dropDownDataItems: [
      {text: '-'},
      {text: '원외'},
      {text: '원내'},
    ], 
    dropDownCodeProperty: 'text', //dropDownDataItems에서 사용할 코드 값의 프로퍼티
    dropDownTextProperty: 'text', //dropDownDataItems에서 사용할 텍스트 값의 프로퍼티
    buttonVisibility: 'always',
    showButtonOnlyEditable: true,
  },
  {name: 'hsin_prsc_resn_cd', header: '예외', type: 'text', width: 20, visible: true, sortable: false, editable: true},
  {name: 'group', header: '예외', type: 'group', width: 20, hideChildHeaders: true, sortable: false, 
    columns: [
      {
        name: 'hsin_prsc_resn_cd', type: 'text', width: 150,
      },
      {
        name: 'img', type: 'button', buttonVisibility: 'mouseOver',
        imageButtons: {
          images: [{
            name: 'del', up: deleteImg, hover: deleteImg, down: deleteImg, cusor: 'pointer'
          }]
        }
      }
    ]
  }
]