import deleteImg from "../images/delete.png";

// 진단 OBTComplete 컬럼
export const clrs0108Columns = {
  columnWidths: ['10%', '20%', '70%'],
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
export const clrs0108Grid = [
  {name: 'dgns_cd', header: '진단코드', type: 'text', width: 20, visible: true, sortable: false},
  {name: 'dgns_hnm', header: '진단명', type: 'text', width: 60, visible: true, sortable: false, editable: true, tooltip: true,
  style: {
    textWrap: "ellipse" // 말줄임 사용
  }},
  {name: 'dvsn', header: '형태', type: 'dropDown', width: 30, visible: true, sortable: false, editable: true, 
    dropDownDataItems: [
      {text: '주상병'},
      {text: '부상병'},
      {text: '배제된 상병'},
    ],
    dropDownCodeProperty: 'text', //dropDownDataItems에서 사용할 코드 값의 프로퍼티
    dropDownTextProperty: 'text', //dropDownDataItems에서 사용할 텍스트 값의 프로퍼티
    buttonVisibility: 'always',
    showButtonOnlyEditable: true
  },
  {name: 'rlot', header: 'R/O', type: 'check', width: 10, visible: true, sortable: false, editable: true},
  {name: 'site', header: '부위', type: 'dropDown', width: 20, visible: true, sortable: false, editable: true,
    dropDownDataItems: [
      {text: '-'},
      {text: 'Rt'},
      {text: 'Lt'},
      {text: 'Both'},
    ], 
    dropDownCodeProperty: 'text', //dropDownDataItems에서 사용할 코드 값의 프로퍼티
    dropDownTextProperty: 'text', //dropDownDataItems에서 사용할 텍스트 값의 프로퍼티
    buttonVisibility: 'always',
    showButtonOnlyEditable: true    
  },
  {name: 'group', header: '특정 기호', type: 'group', width: 30, hideChildHeaders: true, visible: true, sortable: false, alignment: "center",
    columns: [
      {
        name: 'spcf_rgno', type: 'text', width: 150
      },
      {
        name: 'img', type: 'button', buttonVisibility: "mouseOver",
        imageButtons: {
          images: [{
            name: 'del', up: deleteImg, hover: deleteImg, down: deleteImg, cusor: 'pointer'
          }]
        }
      }
    ]
  },
]

// 진단 환경설정 List 컬럼
export const clrs0108Setting = [
  {name: 'header', header: '전체', type: 'text', with:100, sortable: false},
]