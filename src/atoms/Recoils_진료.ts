import { atom } from "recoil";
import { clrs0108Grid } from "../data/CLRS0108Column";

// lnb 상태
export const naviState = atom<boolean>({
  key: "naviState",
  default: false
});

// 환자 정보
export const patientState = atom<any> ({
  key: "patientState",
  default: {
    pid: '',
    pt_nm: '',
    sex_cd: '',
    dobr: '',
    age: 0
  }
});

// 접수 정보
export const rcpnState = atom<any> ({
  key: 'rcpnState',
  default: {
    rcpn_sqno : 0,
    mdcr_date : '',
    mdcr_hm : '',
    mddp_cd : '',
    mdcr_dr_id : '',
    fvnr_dvcd : '',
    insn_tycd: ''
  }
});

// 진단 설정
export const clrs0108GridState = atom<any[]> ({
  key: "clrs0108GridState",
  default: clrs0108Grid
})