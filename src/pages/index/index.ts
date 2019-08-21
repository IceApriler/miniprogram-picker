Page({
  /**
   * 页面的初始数据
   */
  data: {
    result1: [],
    result2: [],
    result3: [],
    sourceData1: [
      {
        id: 'id-1',
        name: '1',
        sonValue: [
          {
            id: 'id-11',
            name: '1.1',
            sonValue: [{ id: 'id-111', name: '1.1.1' }, { id: 'id-112', name: '1.1.2' }]
          },
          {
            id: 'id-12',
            name: '1.2',
            sonValue: [{ id: 'id-121', name: '1.2.1' }, { id: 'id-122', name: '1.2.2' }]
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
            sonValue: [{ id: 'id-211', name: '2.1.1' }, { id: 'id-212', name: '2.1.2' }]
          },
          {
            id: 'id-22',
            name: '2.2',
            sonValue: [{ id: 'id-221', name: '2.2.1' }, { id: 'id-222', name: '2.2.2' }]
          }
        ]
      }
    ],
    sourceData2: [
      { name: '河北', code: '0311', nextLevel: [{ name: '石家庄', code: '031101' }, { name: '保定', code: '031102' }] },
      { name: '北京', code: '0110', nextLevel: [{ name: '朝阳', code: '011001' }, { name: '海淀', code: '011002' }] }
    ],
    sourceData3: [
      {
        id: '6cb8bd37-f8ae-4a6b-a236-3bab1b65cd8d',
        parentId: '0',
        name: '整形',
        sonValue: [
          {
            id: 'd4b6d3af-2edb-44a5-9851-c8964cf10d2c',
            parentId: '6cb8bd37-f8ae-4a6b-a236-3bab1b65cd8d',
            name: '眼部整形',
            sonValue: [
              {
                id: 'e531e96f-a081-40a7-a133-091be46983a2',
                parentId: 'd4b6d3af-2edb-44a5-9851-c8964cf10d2c',
                name: '双眼皮',
                sonValue: []
              }
            ]
          },
          {
            id: '403d93d3-5302-4682-a988-6dbfbe7ff563',
            parentId: '6cb8bd37-f8ae-4a6b-a236-3bab1b65cd8d',
            name: '胸部整形',
            sonValue: [
              {
                id: '46afdd93-c830-4d0d-bd5d-c0751a0c087a',
                parentId: '403d93d3-5302-4682-a988-6dbfbe7ff563',
                name: '丰胸',
                sonValue: [
                  {
                    id: '127a3cda-cd91-48b5-997c-6d56a4a02e80',
                    parentId: '46afdd93-c830-4d0d-bd5d-c0751a0c087a',
                    name: '自体脂肪丰胸',
                    sonValue: []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'a4f22a1a-0c49-46cd-bb1f-ca551b1e01cb',
        parentId: '0',
        name: '皮肤',
        sonValue: [
          {
            id: 'dfa5137c-616b-403c-a552-164e05518072',
            parentId: 'a4f22a1a-0c49-46cd-bb1f-ca551b1e01cb',
            name: '脱毛美容',
            sonValue: []
          },
          {
            id: 'bfd1eb85-93c1-489e-acba-ac3e783c83f0',
            parentId: 'a4f22a1a-0c49-46cd-bb1f-ca551b1e01cb',
            name: '艺术纹绣',
            sonValue: []
          }
        ]
      }
    ]
  },
  /**
   * Picker用户点击确认时触发
   *
   * @param {Object} e pickerChange的事件对象
   * @param {Array} e.detail.selectedIndex 用户选择的数据在数组中所在的下标
   * @param {Array} e.detail.selectedArray 用户选择的数据
   */
  pickerChange(e: event.PickerChange<{ selectedIndex: string[]; selectedArray: string[] }>) {
    const { picker } = e.currentTarget.dataset
    const { selectedIndex, selectedArray } = e.detail
    const list: IAnyObject = {
      picker1: 'result1',
      picker2: 'result2',
      picker3: 'result3'
    }
    console.log('多级联动结果:', selectedIndex, selectedArray)
    const change = {} as any
    change[list[picker]] = selectedArray
    this.setData(change)
  },
  /**
   * Picker用户点击取消时触发
   *
   * @param {Object} e  pickerCancel的事件对象
   * @param {Object} e.detail  是原生Picker组件的bindcancel触发时的事件对象e
   */
  pickerCancel(e: event.PickerCancel) {
    console.log(e)
  },
  /**
   * Picker用户滑动某一列的值改变时触发
   *
   * @param {Object} e pickerColumnchange的事件对象
   * @param {Object} e.detail  是原生Picker组件的bindcolumnchange触发时的事件对象e
   */
  pickerColumnchange(e: event.PickerColumnChange) {
    console.log(e)
  }
})
