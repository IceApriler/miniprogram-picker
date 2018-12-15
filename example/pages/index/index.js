//index.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    result_1: [],
    result_2: [],
    sourceData_1: [
      {
        id: 'id-1',
        name: '1',
        sonValue: [
          {
            id: 'id-11',
            name: '1.1',
            sonValue: [
              { id: 'id-111', name: '1.1.1' },
              { id: 'id-112', name: '1.1.2' }
            ]
          },
          {
            id: 'id-12',
            name: '1.2',
            sonValue: [
              { id: 'id-121', name: '1.2.1' },
              { id: 'id-122', name: '1.2.2' }
            ]
          }
        ]
      },
      {
        id: 'id-2',
        name: '2',
        sonValue: [
          {
            id: 'id-21',
            name: '2.1',
            sonValue: [
              { id: 'id-211', name: '2.1.1' },
              { id: 'id-212', name: '2.1.2' }
            ]
          },
          {
            id: 'id-22',
            name: '2.2',
            sonValue: [
              { id: 'id-221', name: '2.2.1' },
              { id: 'id-222', name: '2.2.2' }
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
   * Picker用户点击确认时触发
   *
   * @param {Object} e pickerChange的事件对象
   * @param {Array} e.detail.selectedIndex 用户选择的数据在数组中所在的下标
   * @param {Array} e.detail.selectedArray 用户选择的数据
   */
  pickerChange(e) {
    const { picker } = e.currentTarget.dataset
    const { selectedIndex, selectedArray } = e.detail
    const list = {
      picker_1: 'result_1',
      picker_2: 'result_2',
    }
    console.log('多级联动结果:', selectedIndex, selectedArray)
    const change = {}
    change[list[picker]] = selectedArray
    this.setData(change)
  },
  /**
   * Picker用户点击取消时触发
   *
   * @param {Object} e  pickerCancel的事件对象
   * @param {Object} e.detail  是原生Picker组件的bindcancel触发时的事件对象e
   */
  pickerCancel(e) {
    console.log(e)
  },
  /**
   * Picker用户滑动某一列的值改变时触发
   *
   * @param {Object} e pickerColumnchange的事件对象
   * @param {Object} e.detail  是原生Picker组件的bindcolumnchange触发时的事件对象e
   */
  pickerColumnchange(e) {
    console.log(e)
  },
})