import deleteImg from "../images/delete.png";

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
  {name: 'mix', header: 'MIX', type: 'check', width: 10, visible: true, sortable: false},
  {name: 'prsc_cd', header: '처방코드', type: 'text', width: 20, visible: true, sortable: false},
  {name: 'prsc_nm', header: '처방명', type: 'text', width: 80, visible: true, sortable: false, useTooltip: true,
  style: {
    textWrap: "ellipse" // 말줄임 사용
  }},
  {name: 'ontm_vol', header: '1회량', type: 'text', width: 20, visible: true, sortable: false},
  {name: 'notm', header: '횟수', type: 'text', width: 20, visible: true, sortable: false},
  {name: 'nody', header: '일수', type: 'text', width: 20, visible: true, sortable: false},
  {name: 'totm_cd', header: '용법', type: 'text', width: 20, visible: true, sortable: false},
  {name: 'insr', header: '급여', type: 'dropDown', width: 20, visible: true, sortable: false,
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
  {name: 'hsin_hsot_dvcd', header: '원외', type: 'dropDown', width: 20, visible: true, sortable: false,
    dropDownDataItems: [
      {text: '-'},
      {text: '원외'},
      {text: '원내'},
    ], 
    dropDownCodeProperty: 'text', //dropDownDataItems에서 사용할 코드 값의 프로퍼티
    dropDownTextProperty: 'text', //dropDownDataItems에서 사용할 텍스트 값의 프로퍼티
    buttonVisibility: 'always',
    showButtonOnlyEditable: true
  },
  {name: 'iotm_cd', header: '예외', type: 'text', width: 20, visible: true, sortable: false},
  {name: 'cmpt', header: '산정', type: 'dropDown', width: 20, visible: true, sortable: false,
    dropDownDataItems: [
      {text: '산정'},
      {text: '무산정'}
    ],
    dropDownCodeProperty: 'text', //dropDownDataItems에서 사용할 코드 값의 프로퍼티
    dropDownTextProperty: 'text', //dropDownDataItems에서 사용할 텍스트 값의 프로퍼티
    buttonVisibility: 'always',
    showButtonOnlyEditable: true
  },
  {name: 'group ', header: '검체', type: 'group', width: 20, hideChildHeaders: true, sortable: false,
  columns: [
    {
      name: 'spcm_cd_1', type: 'text', width: 150,
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