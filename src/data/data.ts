// 신체사정 기록 데이터
export const physicalReviewData = [
  {regdate: '21-06-15 09:57', max:121, min: 79, pulse: 84, respiration: 23, tempurature: 36.8, bloodSugar: 202, height: 156},
  {regdate: '21-05-17 13:48', max:115, min: 77, pulse: 79, respiration: 19, tempurature: 37.2, bloodSugar: 198, height: 156.2},
  {regdate: '21-04-19 11:32', max:122, min: 91, pulse: 75, respiration: 21, tempurature: 36.2, bloodSugar: 181, height: 155.8},
  {regdate: '21-03-15 11:29', max:116, min: 77, pulse: 81, respiration: 1189, tempurature: 36.7, bloodSugar: 193, height: 156.3},
]

// 진단
export const diagnosisData = [
  {id: 'E11.9', name: '합병증을 동반하지 않은 2형 당뇨병', form: '주상병', part: '-', mark: '-'},
  {id: 'J00', name: '감기', form: '주상병', part: '-', mark: '-'}
]

// 처방
export const prescriptionData = [
  {Id: 'C3710', Name: '당검사', Dose: 1, Count: 1, Date: 1, Method: '-', Insurace: '급여', Side: 'Y'},
  {Id: 'C3825', Name: '헤모글로빈AIC', Dose: 1, Count: 1, Date: 1, Method: 'PO', Insurace: '급여', Side: 'Y'},
  {Id: '643307460', Name: '씨라클정 250mg', Dose: 1, Count: 3, Date: 3, Method: 'PO', Insurace: '급여', Side: 'Y'},
  {Id: '642200800', Name: '부관아젭틴정', Dose: 1, Count: 2, Date: 3, Method: 'PO', Insurace: '급여', Side: 'Y'},
  {Id: '642200090', Name: '네오메디코푸정', Dose: 1, Count: 3, Date: 3, Method: 'PO', Insurace: '급여', Side: 'Y'},
  {Id: '645700960', Name: '슈다펜정', Dose: 0.5, Count: 3, Date: 3, Method: 'PO', Insurace: '급여', Side: 'Y'},
  {Id: 'MM303', Name: '상기도 중기흡기', Dose: 1, Count: 3, Date: 3, IMethod: 'PO', nsurace: '급여', Side: 'Y'},
]

// 검사결과
export const result = [
  {date: '21-06-15', status: '완료', code: 'B0510G', name: 'HbA1C', result: 7.2, ref: '4-6%'},
  {date: '21-03-15', status: '완료', code: 'B0510G', name: 'HbA1C', result: 7.2, ref: '4-6%'},
  {date: '20-12-21', status: '완료', code: 'B0510G', name: 'HbA1C', result: 6.9, ref: '4-6%'},
  {date: '20-09-27', status: '완료', code: 'B0510G', name: 'HbA1C', result: 6.73, ref: '4-6%'},
]

// 경과기록
export const progressData = [
  {statu: '재진', date: '21-05-17', comment: '초콜릿이나 당이 많은 음식을 자주 섭취하신다고, 평소에 뇨의를 자주 느끼신다고 말씀하심'},
  {statu: '재진', date: '21-04-19', comment: '초콜릿이나 당이 많은 음식을 자주 섭취하신다고, 평소에 뇨의를 자주 느끼신다고 말씀하심'},
  {statu: '재진', date: '21-03-15', comment: '초콜릿이나 당이 많은 음식을 자주 섭취하신다고, 평소에 뇨의를 자주 느끼신다고 말씀하심'},
]

// 처방조회 - 과거기록
export const prescriptionHis = [
  {date: '21-05-07', doctor: '김의사', statu: '재진', comment: '초콜릿이나 당이 많은 음식을 자주 섭취하신다고, 평소에 뇨의를 자주 느끼신다고 말씀하심'},
  {date: '21-04-19', doctor: '김의사', statu: '재진', comment: '초콜릿이나 당이 많은 음식을 자주 섭취하신다고, 평소에 뇨의를 자주 느끼신다고 말씀하심'},
  {date: '21-03-15', doctor: '김의사', statu: '재진', comment: '초콜릿이나 당이 많은 음식을 자주 섭취하신다고, 평소에 뇨의를 자주 느끼신다고 말씀하심'},
  {date: '21-02-19', doctor: '김의사', statu: '재진', comment: '초콜릿이나 당이 많은 음식을 자주 섭취하신다고, 평소에 뇨의를 자주 느끼신다고 말씀하심'},
  {date: '21-01-20', doctor: '김의사', statu: '재진', comment: '초콜릿이나 당이 많은 음식을 자주 섭취하신다고, 평소에 뇨의를 자주 느끼신다고 말씀하심'},
  {date: '20-12-21', doctor: '김의사', statu: '재진', comment: '초콜릿이나 당이 많은 음식을 자주 섭취하신다고, 평소에 뇨의를 자주 느끼신다고 말씀하심'},
  {date: '20-09-27', doctor: '김의사', statu: '재진', comment: '초콜릿이나 당이 많은 음식을 자주 섭취하신다고, 평소에 뇨의를 자주 느끼신다고 말씀하심'},
]

// 약속처방 트리
export const setList = [
  {key: '1000', labelText: '약속처방'},
  {key: '1001', labelText: '두통', parentKey: '1000'},
  {key: '1002', labelText: '고혈압', parentKey: '1000'},
  {key: '1003', labelText: '당뇨', parentKey: '1000'},
  {key: '1004', labelText: '감기', parentKey: '1000'},
  {key: '1005', labelText: '소아감기', parentKey: '1004'},
  {key: '1006', labelText: '6세미만 소아', parentKey: '1005'},
  {key: '1007', labelText: '성인감기', parentKey: '1004'},
  {key: '1008', labelText: '노인감기', parentKey: '1004'},
  {key: '1009', labelText: '복통', parentKey: '1000'}
]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      