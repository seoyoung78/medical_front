import axios from "axios";

// API_URL 설정
const API_URL = "http://localhost:4000/medical";

// 조회 ------------------------------------------------------
// 처방마스터 기록 가져오기
export const getAll = async () => {
  let list = await axios.get(API_URL + '/prsc');
  return list.data;
};

// 환자 목록
export const getSearchPatient = async (keyword) => {
  let list = await axios.get(API_URL + '/pt' + keyword);
  return list.data;
}

// 환자 접수 정보
export const getPatientRcpn = async (pid) => {
  let info = await axios.get(API_URL + '/pt/rcpn' + pid);
  return info.data;
}

// 진단 ------------------------------------------------------
// 과거 진단 목록
export const getDList = async (pid, rsc) => {
  let list = await axios.get(API_URL + '/d');
  return list.data
}
// 진단 검색 목록
export const searchDList = async (keyword) => {
  let dlist = await axios.get(API_URL + "/d" + keyword);
  return dlist.data
}
// 진단 저장
export const saveDList = async (pid, rcpn, dig) => {
  await axios.post(API_URL + '/d', {pid, rcpn, dig});
}
// 진단 환경 설정
export const saveDSetting = async (settingList) => {
  await axios.patch(API_URL + '/d/setting', settingList);
}

// 정보 수정 -----------------------------------------------------
// 환자 접수정보 수정
export const updatePatient = async (patient, rcpn) => {
  await axios.patch(API_URL + '/pt', {patient, rcpn});
};
// 접수 구분 목록
export const getCommonList = async (id) => {
  let list = await axios.get(API_URL + '/c' + id);
  return list.data;
};
// 관심환자 저장
export const saveCncnPt = async (pid, yn) => {
  let patient = {
    pid: pid,
    cncn_pt_yn: yn
  };
  await axios.patch(API_URL + '/pt/cncn', patient);
};
// 진료메모, 접수메모 저장 
export const saveMdcrMemo = async(pid, memo) => {
  let patient = {
    pid: pid,
    mdcr_memo: memo
  };
  await axios.patch(API_URL + '/pt/mdcr', patient);
};
export const saveRcpnMemo = async(pid, memo) => {
  let patient = {
    pid,
    rcpn_memo: memo
  }
  await axios.patch(API_URL + '/pt/rcpn', patient);
};

// 약속처방 ------------------------------------------------------
// 처방 검색 목록
export const getPrsList = async (keyword) => {
  let list = await axios.get(API_URL + '/prs' + keyword);
  return list.data;
}

// ------------------------------------------------------------------------------------------------------------
// 환자별 검사청방 목록
export const getExmList = async (pid) => {
  let exmList = await axios.get(API_URL + '/e' + pid);
  return exmList.data;
}

// 슬립 목록
export const getSlip = async () => {
  let slipList = await axios.get(API_URL + '/s');
  return slipList.data;
}
