Page({
  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    steps: 3,
    name: 'name',
    subset: 'sonValue',
    otherFields: ['id', 'city'],
    originMultiArray: [
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
    ]
  },
  /**
   * Picker的确认回调函数
   *
   * @param {Object} e.detail.selectedIndex 用户选择的数据在数组中所在的下标
   * @param {Object} e.detail.selectedArray 用户选择的数据
   */
  pickerChange(e) {
    const { selectedIndex, selectedArray } = e.detail
    console.log('多级联动结果:', selectedIndex, selectedArray)
    this.setData({
      result: selectedArray
    })
  }
})