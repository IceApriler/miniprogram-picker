Page({
  /**
   * 页面的初始数据
   */
  data: {
    result_1: [],
    result_2: [],
    sourceData_1: [
      {
        id: '01',
        name: '1',
        sonValue: [
          {
            id: '011',
            name: '1.1',
            sonValue: [
              {
                id: '0111',
                name: '1.1.1',
              },
              {
                id: '0112',
                name: '1.1.2',
              }
            ]
          },
          {
            id: '012',
            name: '1.2',
            sonValue: [
              {
                id: '0121',
                name: '1.2.1',
              },
              {
                id: '0122',
                name: '1.2.2',
              }
            ]
          }
        ]
      },
      {
        id: '02',
        name: '2',
        sonValue: [
          {
            id: '021',
            name: '2.1',
            sonValue: [
              {
                id: '0211',
                name: '2.1.1',
              },
              {
                id: '0212',
                name: '2.1.2'
              }
            ]
          },
          {
            id: '022',
            name: '2.2',
            sonValue: [
              {
                id: '0221',
                name: '2.2.1'
              },
              {
                id: '0222',
                name: '2.2.2'
              }
            ]
          }
        ]
      }
    ],
    sourceData_2: [
      { name: '河北', code: '0311', nextLevel: [{ name: '石家庄', code: '031101' }, { name: '保定', code: '031102' }]},
      { name: '北京', code: '0110', nextLevel: [{ name: '朝阳', code: '011001' }, { name: '海淀', code: '011002' }]},
    ]
  },
  /**
   * Picker的确认回调函数
   *
   * @param {Object} e.detail.selectedIndex 用户选择的数据在数组中所在的下标
   * @param {Object} e.detail.selectedArray 用户选择的数据
   */
  pickerChange_1(e) {
    const { selectedIndex, selectedArray } = e.detail
    console.log('多级联动结果:', selectedIndex, selectedArray)
    this.setData({
      result_1: selectedArray
    })
  },
  /**
   * Picker的确认回调函数
   *
   * @param {Object} e.detail.selectedIndex 用户选择的数据在数组中所在的下标
   * @param {Object} e.detail.selectedArray 用户选择的数据
   */
  pickerChange_2(e) {
    const { selectedIndex, selectedArray } = e.detail
    console.log('多级联动结果:', selectedIndex, selectedArray)
    this.setData({
      result_2: selectedArray
    })
  }
})