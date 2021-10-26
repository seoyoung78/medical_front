import { DropDownColumnLableType } from "luna-orbit/OBTDataGrid/IColumn";
import { ValueType } from "realgrid";

// 신체사정
export const physicalReviewList = {
  name: 'physicalReviewList',
  fields: [
    {
      fieldName: 'regdate',
      dataType: ValueType.TEXT
    },
    {
      fieldName: 'max',
      dataType: ValueType.NUMBER
    },
    {
      fieldName: 'min',
      dataType: ValueType.NUMBER
    },
    {
      fieldName: 'pulse',
      dataType: ValueType.NUMBER
    },
    {
      fieldName: 'respiration',
      dataType: ValueType.NUMBER
    },
    {
      fieldName: 'tempurature',
      dataType: ValueType.NUMBER
    },
    {
      fieldName: 'bloodSugar',
      dataType: ValueType.NUMBER
    },
    {
      fieldName: 'height',
      dataType: ValueType.NUMBER
    },
  ],
  columns: [
    {
      fieldName: 'regdate',
      width: '100',
      header: '입력일시',
      edtiable: false
    },
    {
      fieldName: 'max',
      width: '100',
      header: '수축기 혈압',
      edtiable: false
    },
    {
      fieldName: 'min',
      width: '100',
      header: '이완기 혈압',
      edtiable: false
    },
    {
      fieldName: 'pulse',
      width: '100',
      header: '맥박',
      edtiable: false
    },
    {
      fieldName: 'respiration',
      width: '100',
      header: '호흡',
      edtiable: false
    },
    {
      fieldName: 'tempurature',
      width: '100',
      header: '체온',
      edtiable: false
    },
    {
      fieldName: 'bloodSugar',
      width: '100',
      header: '혈당',
      edtiable: false
    },
    {
      fieldName: 'height',
      width: '100',
      header: '신장',
      edtiable: false
    },
  ]
}

// 검사결과
export const resultList = {
  name: 'resultList',
  fields: [
    {
      fieldName: 'prsc_date',
      dataType: ValueType.TEXT
    },
    {
      fieldName: 'prsc_prgr_stat_cd',
      dataType: ValueType.TEXT
    },
    {
      fieldName: 'prsc_cd',
      dataType: ValueType.TEXT
    },
    {
      fieldName: 'prsc_nm',
      dataType: ValueType.TEXT
    },
    {
      fieldName: 'result',
      dataType: ValueType.NUMBER
    },
    {
      fieldName: 'ref',
      dataType: ValueType.TEXT
    }
  ],
  columns: [
    {
      fieldName: 'prsc_date',
      width: '100',
      header: '검사일',
      editable: false
    },
    {
      fieldName: 'prsc_prgr_stat_cd',
      width: '50',
      header: '상태',
      editable: false
    },
    {
      fieldName: 'prsc_cd',
      width: '100',
      header: '검사코드',
      editable: false
    },
    {
      fieldName: 'prsc_nm',
      width: '200',
      header: '검사명',
      editable: false
    },
    {
      fieldName: 'result',
      width: '100',
      header: '검사결과',
      editable: false
    },
    {
      fieldName: 'ref',
      width: '100',
      header: '참고치',
      editable: false
    }
  ]
}

// 진단
export const diagnosisList = {
  name: 'diagnosisList',
  fields: [
    {
      fieldName: 'dgns_cd',
      dataType: ValueType.TEXT
    },
    {
      fieldName: 'dgns_hnm',
      dataType: ValueType.TEXT
    },
    {
      fieldName: 'form',
      dataType: ValueType.TEXT
    },
    {
      fieldName: 'part',
      dataType: ValueType.TEXT
    },
    {
      fieldName: 'mark',
      dataType: ValueType.TEXT
    }
  ],
  columns: [
    {
      fieldName: 'dgns_cd',
      width: '100',
      header: '진단코드',
      editable: false
    },
    {
      fieldName: 'dgns_hnm',
      width: '500',
      header: '진단명',
      editable: false
    },
    {
      fieldName: 'form',
      width: '100',
      header: '형태',
      sortable: false,
      editor: {
        type: 'dropdown',
        dropDownCount: 2,
        domainOnly: true,
        textReadOnly: true,
        values: ['주상병', '부상병']
      }
    },
    {
      width: '100',
      header: '부위',
      editable: false
    },
    {
      fieldName: 'mark',
      width: '100',
      header: '특정 기호',
      editable: false
    },
  ]
}

// 처방
export const prescriptionList = {
  name: 'prescriptionList',
  fields: [
    {
      fieldName: 'prsc_cd',
      dataType: ValueType.TEXT,
    },
    {
      fieldName: 'prsc_nm',
      dataType: ValueType.CHAR,  // length 지정 필수
      length: 300
    },
    {
      fieldName: 'prsc_clsf_cd',
      dataType: ValueType.TEXT
    },
    {
      fieldName: 'iotm_cd',
      dataType: ValueType.TEXT
    },
    {
      fieldName: 'insn_tycd',
      dataType: ValueType.TEXT
    },
    {
      fieldName: 'ctnt',
      dataType: ValueType.TEXT
    },
    {
      fieldName: 'inpy_dvcd',
      dataType: ValueType.TEXT
    },
    {
      fieldName: 'hsot_prsc_yn',
      dataType: ValueType.TEXT
    },
  ],
  columns: [
    {
      width: '30',
      header: 'MIX',
      editable: false
    },
    {
      fieldName: 'prsc_cd',
      width: '100',
      header: '처방코드',
      editable: false
    },
    {
      fieldName: 'prsc_nm',
      width: '100',
      header: '처방명',
      editable: false
    },
    {
      fieldName: 'prsc_clsf_cd',
      width: '30',
      header: '1회량',
      editable: false
    },
    {
      fieldName: 'ctnt',
      width: '30',
      header: '횟수',
      editable: false
    },
    {
      fieldName: 'insn_tycd',
      width: '30',
      header: '일수',
      editable: false
    },
    {
      fieldName: 'iotm_cd',
      width: '40',
      header: '용법',
      editable: false
    },
    {
      fieldName: 'inpy_dvcd',
      width: '50',
      header: '급여',
      sortable: false,
      editor: {
        type: 'dropdown',
        dropDownCount: 2,
        domainOnly: true,
        textReadOnly: true,
        values: ['급여', '비급여']
      }
    },
    {
      fieldName: 'hsot_prsc_yn',
      width: '50',
      header: '원외',
      editable: false
    },
  ]
}