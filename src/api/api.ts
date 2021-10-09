export default {
  user: {
    login: 'user/login',
    updatePwd: 'user/updatePwd'
  },
  file: {
    upload: 'upload/upload'
  },
  authorizationManagement: {
    //授权管理
    list: 'license-record/queryAuthorizationList',
    add: 'license-record/addAuthorization',
    update: 'license-record/updateAuthorization',
    detail: 'license-record/queryAuthorizationDetail',
    delete: 'license-record/deleteLicenseRecord',
    deviceCount: 'license-record/selectCount',

    //授权管理 - 设备
    deviceList: 'license-record-equipment/queryEquipmentList',
    addDevice: 'license-record-equipment/insertEquipment',
    updateDeviceStatus: 'license-record-equipment/updateEquipmentStatus',
    importDevice: 'license-record-equipment/importLicense',
    deleteDevice: 'license-record-equipment/deleteEquipment'
  }
}
