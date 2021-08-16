export interface IPimDataReq {
  action: 'getTestStructure'
  groupid: string
}
export interface IFiosDataReq {
  action: 'getFiosList'
  groupid: string
}

export interface IItem {
  checked: boolean
  deid: string
  dename: string
  setid: string
  setsoltime: string
  title: string
  weight: string
}

export interface ITopic extends IItem {
  label: number
}
export interface IModule {
  checked: boolean
  label: number
  module_no: number
  title: string
  weight: number
}

export interface ICase extends IItem {
  label: string
}

export interface ITopicBlock {
  block_weight: number
  header: string
  items: Array<ITopic>
  sets: string[]
  task_count: number
}

export interface IModuleBlock {
  block_weight: number
  header: string
  modules: {
    [id: string]: IModule
  }
  modulesCount: number
  sets: string[]
  task_count: number
}
export interface ICasesBlock {
  block_weight: number
  header: string
  items: Array<ICase>
  sets: string[]
  countCases: number
  task_count: number
}

export interface IPimDataRes {
  crit1: string
  crit2: string
  label: string
  labelforselectively: string
  ntasks: number
  soltime: string
  1: ITopicBlock
  2: IModuleBlock
  3: ICasesBlock
}

export type ControlType = 'y' | 'n'

export interface ITestPlan {
  groupid: string
  groupname: string
  contingent: string
  fioscont: string
  pgmode: 'a' | 'b' | 'r'
  soltime: string
  pg_created: string
  testdate: string
  pgcomment: string
  subj_id: string
  subj: string
  specid: string
  speckod: string
  spec: string
  oopkodes: string
  rgid: null
  chair: string
  teacherName: string
  svuserid: string
}