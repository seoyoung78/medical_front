export const physicalColumns = [
  // {name: 'regdate', header: '입력일시', width: 80},
  {name: 'regdate', header: '입력일시', width: 80, type: 'text'},
  {name: 'max', header: '수축기혈압', width: 40, type: 'number'},
  {name: 'min', header: '이완기혈압', width: 40, type: 'number'},
  {name: 'pulse', header: '맥박', width: 40, type: 'number'},
  {name: 'respiration', header: '호흡', width: 40, type: 'number'},
  {name: 'tempurature', header: '체온', width: 40, type: 'number'},
  {name: 'bloodSugar', header: '혈당', width: 40, type: 'number'},
  {name: 'height', header: '신장', width: 40, type: 'number'},
]

// 검사결과 OBTListGrid 컬럼
export const inspectionColumns = [
  {name: 'prsc_date', header: '검사일', type: 'text', width: 40},
  {name: 'prsc_prgr_stat_cd', header: '상태', type: 'text', width: 40},
  {name: 'prsc_cd', header: '검사코드', type: 'text', width: 40},
  {name: 'prsc_nm', header: '검사명', type: 'text', width: 80},
  {name: 'result', header: '검사결과', type: 'text', width: 40},
  {name: 'ref', header: '참고치', type: 'text', width: 40},
]